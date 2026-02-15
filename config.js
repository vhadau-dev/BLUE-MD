import dotenv from 'dotenv';
dotenv.config();

const config = {
  // Bot Information
  BOT_NAME: "BLUE-MD",
  OWNER_NAME: "vhadau_t",
  VERSION: "1.0.0",
  
  // Command Configuration
  PREFIX: ".",
  
  // Owner Configuration
  OWNERS: ["2347012345678"], // Replace with actual owner numbers
  
  // Database Configuration
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/bluemd",
  
  // Session Configuration
  SESSION_ID: process.env.SESSION_ID,
  
  // Currency Configuration
  DEFAULT_CURRENCY: "💎",
  CURRENCY_NAME: "Gems",
  
  // Gambling Configuration
  DAILY_REWARD: 1000,
  WEEKLY_REWARD: 7500,
  DAILY_COOLDOWN: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  WEEKLY_COOLDOWN: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  ROB_COOLDOWN: 60 * 60 * 1000, // 1 hour
  MIN_BET: 10,
  MAX_BET: 10000,
  STARTING_BALANCE: 5000,
  
  // Image Configuration
  BLUE_IMAGE: process.env.BLUE_IMAGE || "https://i.imgur.com/default.jpg",
  
  // Bot Behavior
  AUTO_READ: true,
  AUTO_REACT: true,
  AUTO_TYPING: false,
  
  // Group Settings Defaults
  DEFAULT_GROUP_SETTINGS: {
    antilink: false,
    welcome: false,
    goodbye: false,
    mute: false,
    locked: false
  },
  
  // Timezone
  TIMEZONE: "Africa/Lagos",
  
  // Logging
  LOG_LEVEL: "info"
};

export default config;
