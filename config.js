export default {
  // ============================================
  // BOT IDENTITY CONFIGURATION
  // ============================================
  
  // 1. BOT_NAME - The display name of your bot
  BOT_NAME: "BLUE",
  
  // 2. OWNER_NAME - Bot owner username
  OWNER_NAME: "vhadau_t",
  
  // 3. PREFIX - Command prefix (e.g., .menu, !menu)
  PREFIX: ".",
  
  // 4. MENU_IMAGE - URL for the image shown at the top of the menu
  MENU_IMAGE: "https://i.imgur.com/your_image.jpg", // Replace with your image URL
  
  // ============================================
  // ROLE & PERMISSION CONFIGURATION
  // ============================================
  
  // 5. OWNER_NUMBER - Bot owner phone number(s) in international format
  OWNER_NUMBER: ["2347012345678"], // Replace with actual owner number(s)
  
  // 6. ADMIN_NUMBERS - Global admin users (Group admins are recognized automatically)
  ADMIN_NUMBERS: [
    // Add global admin numbers here (optional)
  ],
  
  // 7. MOD_NUMBERS - Moderators with limited moderation access
  MOD_NUMBERS: [
    // Add moderator numbers here
  ],
  
  // ============================================
  // AI CHATBOT CONFIGURATION
  // ============================================
  
  // 8. CHATBOT_ENABLED - Enable/disable AI chatbot (owner/mods can toggle)
  CHATBOT_ENABLED: false,
  
  // 9. OPENAI_API_KEY - OpenAI API key for chatbot functionality
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  
  // 10. CHATBOT_MODEL - AI model to use (gpt-4.1-mini, gpt-4.1-nano, gemini-2.5-flash)
  CHATBOT_MODEL: "gpt-4.1-mini",
  
  // ============================================
  // BOT BEHAVIOR CONFIGURATION
  // ============================================
  
  // 11. AUTO_READ - Automatically mark messages as read
  AUTO_READ: true,
  
  // 12. AUTO_REACT - Automatically react to commands
  AUTO_REACT: true,
  
  // 13. AUTO_TYPING - Show typing indicator when processing
  AUTO_TYPING: true,
  
  // ============================================
  // MODERATION CONFIGURATION
  // ============================================
  
  // 14. ANTI_LINK - Anti-link protection settings
  ANTI_LINK: {
    enabled: false,
    action: "warn", // Options: "warn", "delete", "kick"
    allowedDomains: ["youtube.com", "youtu.be"], // Whitelisted domains
    warnLimit: 3 // Kicks after X warnings
  },
  
  // 15. ANTI_BAD_WORD - Filter inappropriate language
  ANTI_BAD_WORD: {
    enabled: false,
    action: "delete", // Options: "warn", "delete", "kick"
    customWords: [] // Add custom words to filter
  },
  
  // ============================================
  // SYSTEM CONFIGURATION
  // ============================================
  
  // GITHUB_REPO - Repository URL for auto-update feature
  GITHUB_REPO: "https://github.com/vhadau-dev/BLUE-MD",
  
  // Session folder path
  SESSION_FOLDER: "./session",
  
  // Database folder path
  DATABASE_FOLDER: "./database",
  
  // Timezone for bot operations
  TIMEZONE: "Africa/Lagos",
  
  // Command cooldown in seconds
  COMMAND_COOLDOWN: 3,
  
  // Maximum warnings before auto-kick
  MAX_WARNINGS: 5,
  
  // Bot status message
  STATUS_MESSAGE: "BLUE-MD v1.0 | Owned by vhadau_t",
  
  // Welcome message for new group members
  WELCOME_MESSAGE: "👋 Welcome to the group! Type .menu to see available commands.",
  
  // Goodbye message for leaving members
  GOODBYE_MESSAGE: "👋 Goodbye! Thanks for being part of the group."
};
