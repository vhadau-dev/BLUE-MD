import mongoose from 'mongoose';
import config from '../config.js';

// User Schema
const userSchema = new mongoose.Schema({
  jid: { type: String, required: true, unique: true },
  balance: { type: Number, default: config.STARTING_BALANCE },
  lastDaily: { type: Date, default: null },
  lastWeekly: { type: Date, default: null },
  lastRob: { type: Date, default: null },
  totalWins: { type: Number, default: 0 },
  totalLosses: { type: Number, default: 0 },
  totalGambled: { type: Number, default: 0 },
  isBanned: { type: Boolean, default: false },
  banReason: { type: String, default: null },
  createdAt: { type: Date, default: Date.now }
});

// Group Schema
const groupSchema = new mongoose.Schema({
  jid: { type: String, required: true, unique: true },
  antilink: { type: Boolean, default: false },
  welcome: { type: Boolean, default: false },
  goodbye: { type: Boolean, default: false },
  welcomeMessage: { type: String, default: "Welcome @user to @group!" },
  goodbyeMessage: { type: String, default: "Goodbye @user!" },
  mute: { type: Boolean, default: false },
  locked: { type: Boolean, default: false },
  rules: { type: String, default: "No rules set yet." },
  createdAt: { type: Date, default: Date.now }
});

// Moderator Schema
const modSchema = new mongoose.Schema({
  jid: { type: String, required: true, unique: true },
  addedBy: { type: String, required: true },
  addedAt: { type: Date, default: Date.now }
});

// Create Models
const User = mongoose.model('User', userSchema);
const Group = mongoose.model('Group', groupSchema);
const Moderator = mongoose.model('Moderator', modSchema);

// Database Connection
async function connectDB() {
  try {
    await mongoose.connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Database connected successfully');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
}

// User Functions
async function getUser(jid) {
  try {
    let user = await User.findOne({ jid });
    if (!user) {
      user = await User.create({ jid });
    }
    return user;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

async function updateUserBalance(jid, amount) {
  try {
    const user = await getUser(jid);
    user.balance += amount;
    await user.save();
    return user;
  } catch (error) {
    console.error('Error updating balance:', error);
    return null;
  }
}

async function setUserBalance(jid, amount) {
  try {
    const user = await getUser(jid);
    user.balance = amount;
    await user.save();
    return user;
  } catch (error) {
    console.error('Error setting balance:', error);
    return null;
  }
}

// Group Functions
async function getGroup(jid) {
  try {
    let group = await Group.findOne({ jid });
    if (!group) {
      group = await Group.create({ jid });
    }
    return group;
  } catch (error) {
    console.error('Error getting group:', error);
    return null;
  }
}

async function updateGroupSettings(jid, settings) {
  try {
    const group = await getGroup(jid);
    Object.assign(group, settings);
    await group.save();
    return group;
  } catch (error) {
    console.error('Error updating group settings:', error);
    return null;
  }
}

// Moderator Functions
async function addModerator(jid, addedBy) {
  try {
    const mod = await Moderator.create({ jid, addedBy });
    return mod;
  } catch (error) {
    if (error.code === 11000) {
      return { error: 'User is already a moderator' };
    }
    console.error('Error adding moderator:', error);
    return null;
  }
}

async function removeModerator(jid) {
  try {
    await Moderator.deleteOne({ jid });
    return true;
  } catch (error) {
    console.error('Error removing moderator:', error);
    return false;
  }
}

async function getModerators() {
  try {
    const mods = await Moderator.find({});
    return mods;
  } catch (error) {
    console.error('Error getting moderators:', error);
    return [];
  }
}

async function isModerator(jid) {
  try {
    const mod = await Moderator.findOne({ jid });
    return !!mod;
  } catch (error) {
    return false;
  }
}

// Leaderboard Function
async function getLeaderboard(limit = 10) {
  try {
    const users = await User.find({ isBanned: false })
      .sort({ balance: -1 })
      .limit(limit);
    return users;
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    return [];
  }
}

// Ban Functions
async function banUser(jid, reason) {
  try {
    const user = await getUser(jid);
    user.isBanned = true;
    user.banReason = reason;
    await user.save();
    return user;
  } catch (error) {
    console.error('Error banning user:', error);
    return null;
  }
}

async function unbanUser(jid) {
  try {
    const user = await getUser(jid);
    user.isBanned = false;
    user.banReason = null;
    await user.save();
    return user;
  } catch (error) {
    console.error('Error unbanning user:', error);
    return null;
  }
}

export default {
  connectDB,
  User,
  Group,
  Moderator,
  getUser,
  updateUserBalance,
  setUserBalance,
  getGroup,
  updateGroupSettings,
  addModerator,
  removeModerator,
  getModerators,
  isModerator,
  getLeaderboard,
  banUser,
  unbanUser
};
