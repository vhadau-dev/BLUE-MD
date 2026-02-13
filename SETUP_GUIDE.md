# BLUE-MD Setup Guide

This guide will walk you through setting up BLUE-MD WhatsApp bot step by step.

---

## 📋 Prerequisites

Before you begin, make sure you have:

1. **A computer or VPS** running Linux, macOS, or Windows
2. **Node.js v18 or higher** installed
3. **A WhatsApp account** (separate from your personal account recommended)
4. **Git** installed
5. **OpenAI API Key** (optional, for AI chatbot feature)

---

## 🔧 Step 1: Install Node.js

### On Ubuntu/Debian:
\`\`\`bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
\`\`\`

### On macOS:
\`\`\`bash
brew install node
\`\`\`

### On Windows:
Download and install from [nodejs.org](https://nodejs.org)

### Verify Installation:
\`\`\`bash
node --version  # Should show v18.x or higher
npm --version   # Should show 9.x or higher
\`\`\`

---

## 📥 Step 2: Download BLUE-MD

### Option 1: Using Git (Recommended)
\`\`\`bash
git clone https://github.com/vhadau-dev/BLUE-MD.git
cd BLUE-MD
\`\`\`

### Option 2: Download ZIP
1. Go to https://github.com/vhadau-dev/BLUE-MD
2. Click "Code" → "Download ZIP"
3. Extract the ZIP file
4. Open terminal in the extracted folder

---

## 📦 Step 3: Install Dependencies

\`\`\`bash
npm install
\`\`\`

This will install all required packages. Wait for it to complete.

---

## ⚙️ Step 4: Configure the Bot

### 4.1 Edit config.js

Open \`config.js\` in a text editor and modify these settings:

\`\`\`javascript
export default {
  // Change this to your bot name
  BOT_NAME: "BLUE",
  
  // Change this to your username\n  OWNER_NAME: "vhadau_t",
  
  // Command prefix (you can change this)
  PREFIX: ".",
  
  // IMPORTANT: Add your WhatsApp number here (with country code, no + or spaces)
  OWNER_NUMBER: ["2347012345678"], // Replace with YOUR number
  
  // Add admin numbers (optional)
  ADMIN_NUMBERS: [
    // "2347087654321"
  ],
  
  // Add moderator numbers (optional)
  MOD_NUMBERS: [
    // "2347011111111"
  ],
  
  // AI Chatbot settings
  CHATBOT_ENABLED: false, // Set to true to enable by default
  CHATBOT_MODEL: "gpt-4.1-mini",
  
  // Other settings (you can keep defaults)
  AUTO_READ: true,
  AUTO_REACT: true,
  AUTO_TYPING: true,
  
  // ... rest of config
};
\`\`\`

### 4.2 Set Up Environment Variables (Optional)

If you want to use the AI chatbot, create a \`.env\` file:

\`\`\`bash
cp .env.example .env
\`\`\`

Edit \`.env\` and add your OpenAI API key:

\`\`\`env
OPENAI_API_KEY=sk-your-api-key-here
\`\`\`

**Where to get OpenAI API Key:**
1. Go to https://platform.openai.com
2. Sign up or log in
3. Go to API Keys section
4. Create a new API key
5. Copy and paste it in \`.env\`

---

## 🚀 Step 5: Start the Bot

\`\`\`bash
npm start
\`\`\`

You should see:
\`\`\`
╔══════════════════════════════════════╗
║                                      ║
║         BLUE-MD WhatsApp Bot         ║
║                                      ║
║  Owner: vhadau_t                 ║
║  Version: 1.0.0                      ║
║                                      ║
╚══════════════════════════════════════╝

⚠️  No session found. Starting pairing process...

Enter your WhatsApp number (with country code):
\`\`\`

---

## 📱 Step 6: Pair with WhatsApp

### 6.1 Enter Your Number

When prompted, enter your WhatsApp number with country code (no + or spaces):

Example:
\`\`\`
2347012345678
\`\`\`

### 6.2 Get Pairing Code

The bot will display a pairing code:
\`\`\`
✓ Your pairing code: ABCD-EFGH
\`\`\`

### 6.3 Link Device

1. Open WhatsApp on your phone
2. Go to **Settings** → **Linked Devices**
3. Tap **"Link a Device"**
4. Tap **"Link with phone number instead"**
5. Enter the pairing code shown in terminal
6. Wait for connection...

### 6.4 Success!

Once connected, you'll see:
\`\`\`
✓ BLUE-MD is now online!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Bot Name: BLUE
Prefix: .
Commands: 100
AI Chatbot: Disabled
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
\`\`\`

---

## ✅ Step 7: Test the Bot

### 7.1 Send a Test Message

Send this message to the bot number:
\`\`\`
.ping
\`\`\`

You should get a response:
\`\`\`
🏓 Pong!

⚡ Response Time: 123ms
\`\`\`

### 7.2 Check Menu

\`\`\`
.menu
\`\`\`

You should see the full command menu.

### 7.3 Test AI Chatbot (if enabled)

\`\`\`
.chatbot on
\`\`\`

Then send any message without prefix:
\`\`\`
Hello, how are you?
\`\`\`

Bot should respond with AI-generated message.

---

## 🎯 Step 8: Add Bot to Groups

1. Create a group or use existing group
2. Add the bot number to the group
3. Send \`.menu\` in the group
4. Bot will respond with commands

---

## 🔐 Step 9: Security Setup

### 9.1 Protect Owner Number

Make sure your owner number in \`config.js\` is correct:
\`\`\`javascript
OWNER_NUMBER: ["YOUR_NUMBER_HERE"]
\`\`\`

### 9.2 Add Admins (Optional)

Add trusted users as admins:
\`\`\`javascript
ADMIN_NUMBERS: [
  "2347087654321",
  "2348012345678"
]
\`\`\`

### 9.3 Add Moderators (Optional)

Add moderators for group management:
\`\`\`javascript
MOD_NUMBERS: [
  "2347011111111"
]
\`\`\`

---

## 🛡️ Step 10: Enable Protection Features

### 10.1 Anti-Link

In a group, send:
\`\`\`
.antilink on
\`\`\`

Bot will now delete messages with links and warn users.

### 10.2 Welcome Messages

\`\`\`
.welcome on
\`\`\`

Bot will greet new members.

### 10.3 Goodbye Messages

\`\`\`
.goodbye on
\`\`\`

Bot will say goodbye to leaving members.

---

## 🤖 Step 11: Configure AI Chatbot

### 11.1 Get OpenAI API Key

1. Go to https://platform.openai.com
2. Create account or log in
3. Go to API Keys
4. Create new key
5. Copy the key

### 11.2 Add Key to .env

\`\`\`env
OPENAI_API_KEY=sk-your-key-here
\`\`\`

### 11.3 Enable Chatbot

\`\`\`
.chatbot on
\`\`\`

### 11.4 Test Chatbot

Send any message (without prefix):
\`\`\`
What is the capital of France?
\`\`\`

Bot should respond with AI-generated answer.

---

## 🔄 Step 12: Keep Bot Running

### Option 1: Using PM2 (Recommended for VPS)

Install PM2:
\`\`\`bash
npm install -g pm2
\`\`\`

Start bot with PM2:
\`\`\`bash
pm2 start index.js --name blue-md
\`\`\`

Useful PM2 commands:
\`\`\`bash
pm2 status          # Check status
pm2 logs blue-md    # View logs
pm2 restart blue-md # Restart bot
pm2 stop blue-md    # Stop bot
pm2 startup         # Auto-start on system boot
\`\`\`

### Option 2: Using Screen (Linux)

\`\`\`bash
screen -S blue-md
npm start
# Press Ctrl+A then D to detach
\`\`\`

To reattach:
\`\`\`bash
screen -r blue-md
\`\`\`

### Option 3: Using nohup

\`\`\`bash
nohup npm start > bot.log 2>&1 &
\`\`\`

---

## 🔧 Troubleshooting

### Problem: Bot won't start

**Solution:**
\`\`\`bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
\`\`\`

### Problem: Pairing failed

**Solution:**
1. Delete session folder: \`rm -rf session\`
2. Restart bot: \`npm start\`
3. Try pairing again

### Problem: Commands not working

**Check:**
- Is prefix correct in config.js?
- Is user number in OWNER_NUMBER?
- Check console for errors

### Problem: AI Chatbot not responding

**Check:**
- Is OPENAI_API_KEY set in .env?
- Is chatbot enabled? Send \`.chatbot on\`
- Does API key have credits?

### Problem: Bot disconnects frequently

**Solution:**
- Use stable internet connection
- Use PM2 for auto-restart
- Check WhatsApp for unusual activity

---

## 📊 Monitoring

### View Logs

\`\`\`bash
# If using PM2
pm2 logs blue-md

# If using screen
screen -r blue-md

# If using nohup
tail -f bot.log
\`\`\`

### Check Bot Status

Send to bot:
\`\`\`
.status
\`\`\`

### Check Uptime

\`\`\`
.uptime
\`\`\`

---

## 🔄 Updating the Bot

### Using Update Command (Easiest)

Send to bot:
\`\`\`
.update
\`\`\`

Bot will automatically:
1. Pull latest changes from GitHub
2. Install new dependencies
3. Restart itself

### Manual Update

\`\`\`bash
git pull origin main
npm install
npm start
\`\`\`

---

## 💡 Tips & Best Practices

1. **Use a separate WhatsApp number** for the bot
2. **Keep your owner number private** - don't share it
3. **Backup session folder** regularly
4. **Monitor bot logs** for errors
5. **Update regularly** to get new features
6. **Test commands** before using in large groups
7. **Set up auto-restart** using PM2
8. **Use strong API keys** and keep them secret
9. **Enable only needed features** to save resources
10. **Join support group** for help and updates

---

## 🆘 Getting Help

### Check Documentation
- README.md - Full documentation
- SETUP_GUIDE.md - This guide

### Common Issues
- Check troubleshooting section above
- Search GitHub issues

### Contact Owner
- GitHub: [@vhadau-dev](https://github.com/vhadau-dev)
- Open an issue on GitHub

---

## ✅ Setup Complete!

Congratulations! Your BLUE-MD bot is now fully set up and running.

### Next Steps:
1. Explore all commands using \`.menu\`
2. Add bot to your groups
3. Configure features as needed
4. Enable AI chatbot if desired
5. Invite friends to use the bot

### Enjoy your bot! 🎉

---

<div align="center">

**Owned with ❤️ by vhadau_t**

</div>
