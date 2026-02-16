import fs from 'fs';
import path from 'path';
import config from '../config.js';

// Root data directory
const dataDir = path.join(process.cwd(), 'data');

// File paths
const usersFile = path.join(dataDir, 'users.js');
const groupsFile = path.join(dataDir, 'groups.js');
const modsFile = path.join(dataDir, 'mods.js');

// Ensure root data directory exists
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

// Initialize files with proper named exports
function initFile(filePath, exportName) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, `export const ${exportName} = {};`);
  }
}

initFile(usersFile, 'users');
initFile(groupsFile, 'groups');
initFile(modsFile, 'mods'); // mods can also be an object {} or array []

// Import in-memory objects
import { users } from './data/users.js';
import { groups } from './data/groups.js';
import { mods } from './data/mods.js';

// Save helper
function saveFile(filePath, varName, data) {
  const content = `export const ${varName} = ${JSON.stringify(data, null, 2)};`;
  fs.writeFileSync(filePath, content);
}

// Helper to extract user ID from JID
function getUserId(jid) {
  return jid.split('@')[0];
}

// -------- DATABASE OBJECT --------
const db = {

  // USERS
  getUser(jid) {
    const id = getUserId(jid);
    if (!users[id]) {
      users[id] = {
        id,
        balance: config.STARTING_BALANCE,
        lastDaily: 0,
        lastWeekly: 0,
        lastRob: 0,
        totalWins: 0,
        totalLosses: 0,
        totalGambled: 0,
        isBanned: false,
        banReason: null,
        createdAt: Date.now()
      };
      saveFile(usersFile, 'users', users);
    }
    return users[id];
  },

  saveUser(jid, data) {
    const id = getUserId(jid);
    users[id] = { ...users[id], ...data };
    saveFile(usersFile, 'users', users);
    return users[id];
  },

  // GROUPS
  getGroup(jid) {
    if (!groups[jid]) {
      groups[jid] = {
        jid,
        antilink: false,
        welcome: false,
        goodbye: false,
        welcomeMessage: 'Welcome @user to @group!',
        goodbyeMessage: 'Goodbye @user!',
        mute: false,
        locked: false,
        rules: 'No rules set yet.',
        createdAt: Date.now()
      };
      saveFile(groupsFile, 'groups', groups);
    }
    return groups[jid];
  },

  updateGroupSettings(jid, settings) {
    const group = db.getGroup(jid);
    Object.assign(group, settings);
    saveFile(groupsFile, 'groups', groups);
    return group;
  },

  // MODS
  getModerators() {
    return mods.map(jid => ({ jid }));
  },

  isModerator(jid) {
    return mods.includes(jid);
  },

  addModerator(jid) {
    if (!mods.includes(jid)) {
      mods.push(jid);
      saveFile(modsFile, 'mods', mods);
      return true;
    }
    return false;
  },

  removeModerator(jid) {
    const index = mods.indexOf(jid);
    if (index !== -1) {
      mods.splice(index, 1);
      saveFile(modsFile, 'mods', mods);
      return true;
    }
    return false;
  }
};

export default db;  addedAt: { type: Date, default: Date.now }
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
