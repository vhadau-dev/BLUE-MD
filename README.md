# BLUE-MD - WhatsApp Multi-Device Bot

<div align="center">

![BLUE-MD](https://img.shields.io/badge/BLUE--MD-v1.0.0-blue)
![WhatsApp](https://img.shields.io/badge/WhatsApp-Multi--Device-green)
![Node.js](https://img.shields.io/badge/Node.js-22.x-brightgreen)
![License](https://img.shields.io/badge/License-MIT-yellow)

**A powerful WhatsApp Multi-Device bot with AI chatbot integration, 100+ commands, and advanced features.**

Owned by **vhadau_t** (vhadau-dev)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Requirements](#-requirements)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Commands](#-commands)
- [AI Chatbot](#-ai-chatbot)
- [Role System](#-role-system)
- [Update System](#-update-system)
- [Support](#-support)

---

## ✨ Features

### Core Features
- ✅ **WhatsApp Multi-Device Support** - Works with latest WhatsApp MD
- ✅ **100+ Working Commands** - Comprehensive command library
- ✅ **AI Chatbot Integration** - Powered by OpenAI (GPT-4, Gemini)
- ✅ **Role-Based Permissions** - Owner, Admin, Moderator, User roles
- ✅ **Session Management** - Secure pairing and authentication
- ✅ **Auto Command Loader** - Automatically loads all commands
- ✅ **Config-Driven** - 15 configuration options
- ✅ **GitHub Auto-Update** - Update bot from repository
- ✅ **Database System** - User data and group settings storage

### Moderation Features
- 🛡️ **Anti-Link Protection** - Block unwanted links
- 🛡️ **Bad Word Filter** - Filter inappropriate content
- 🛡️ **Warning System** - Track and manage user warnings
- 🛡️ **Group Management** - Full group control commands
- 🛡️ **Welcome/Goodbye Messages** - Customizable greetings

### Fun Features
- 🎮 **Games** - Truth/Dare, 8Ball, Dice, Coin Flip
- 🎭 **Entertainment** - Jokes, Quotes, Memes, Facts
- 🐕 **Animal Images** - Random dog, cat, fox, duck images
- 💘 **Social** - Ship calculator, Rate, Roast, Compliment
- 🧠 **Trivia & Riddles** - Test your knowledge

### Utility Features
- 🔧 **Calculator** - Mathematical calculations
- 🌤️ **Weather** - Real-time weather information
- 🌐 **Translator** - Multi-language translation
- 📖 **Dictionary** - Word definitions
- 🔗 **URL Shortener** - Shorten long URLs
- 📱 **QR Code Generator** - Generate QR codes
- 📸 **Screenshot** - Website screenshots
- 🖼️ **Image Search** - Search and download images
- 🎬 **Movie Info** - Get movie details
- 💰 **Crypto Prices** - Cryptocurrency information
- 📰 **News** - Latest news updates

---

## 📦 Requirements

- **Node.js** v18.x or higher
- **npm** or **yarn** package manager
- **WhatsApp Account** for bot pairing
- **OpenAI API Key** (optional, for AI chatbot)

---

## 🚀 Installation

### 1. Clone Repository

\`\`\`bash
git clone https://github.com/vhadau-dev/BLUE-MD.git
cd BLUE-MD
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Configure Bot

Edit \`config.js\` and set your configuration:

\`\`\`javascript
export default {
  BOT_NAME: "BLUE",
  OWNER_NAME: "vhadau_t",
  PREFIX: ".",
  OWNER_NUMBER: ["2347012345678"], // Your number
  // ... more configs
};
\`\`\`

### 4. Set Environment Variables (Optional)

Create \`.env\` file:

\`\`\`env
OPENAI_API_KEY=your_openai_api_key_here
\`\`\`

### 5. Start Bot

\`\`\`bash
npm start
\`\`\`

### 6. Pair with WhatsApp

1. Bot will prompt for your phone number
2. Enter your WhatsApp number with country code (e.g., 2347012345678)
3. Bot will generate a pairing code
4. Open WhatsApp > Linked Devices > Link a Device
5. Enter the pairing code
6. Bot is now connected!

---

## ⚙️ Configuration

### 15 Configuration Options

| Config | Description | Default |
|--------|-------------|---------|
| **BOT_NAME** | Display name of the bot | "BLUE" |
| **OWNER_NAME** | Owner username | "vhadau_t" |
| **PREFIX** | Command prefix | "." |
| **OWNER_NUMBER** | Owner phone number(s) | [] |
| **ADMIN_NUMBERS** | Admin phone numbers | [] |
| **MOD_NUMBERS** | Moderator phone numbers | [] |
| **CHATBOT_ENABLED** | Enable/disable AI chatbot | false |
| **OPENAI_API_KEY** | OpenAI API key | "" |
| **CHATBOT_MODEL** | AI model to use | "gpt-4.1-mini" |
| **AUTO_READ** | Auto-read messages | true |
| **AUTO_REACT** | Auto-react to commands | true |
| **AUTO_TYPING** | Show typing indicator | true |
| **ANTI_LINK** | Anti-link settings | {...} |
| **ANTI_BAD_WORD** | Bad word filter settings | {...} |
| **GITHUB_REPO** | Repository URL | "" |

---

## 📱 Usage

### Basic Commands

\`\`\`
.menu          - Display command menu
.help <cmd>    - Get help for a command
.ping          - Check bot response time
.info          - Get bot information
.stats         - Get bot statistics
\`\`\`

### AI Chatbot

\`\`\`
.chatbot on    - Enable AI chatbot (Owner/Mod)
.chatbot off   - Disable AI chatbot (Owner/Mod)
.ai <message>  - Chat with AI
.clearchat     - Clear your chat history
\`\`\`

When chatbot is enabled, bot will respond to all non-command messages!

---

## 🎯 Commands

### Owner Commands (10)
- \`eval\` - Execute JavaScript code
- \`restart\` - Restart the bot
- \`shutdown\` - Shutdown the bot
- \`update\` - Update from GitHub
- \`broadcast\` - Broadcast to all groups
- \`setprefix\` - Change command prefix
- \`addadmin\` - Add admin user
- \`addmod\` - Add moderator
- \`block\` - Block user
- \`unblock\` - Unblock user
- \`join\` - Join group via link
- \`leave\` - Leave current group

### Admin Commands (15+)
- \`kick\` - Kick user from group
- \`promote\` - Promote to admin
- \`demote\` - Demote from admin
- \`groupinfo\` - Get group information
- \`setname\` - Change group name
- \`setdesc\` - Change group description
- \`lock\` - Lock group (admins only)
- \`unlock\` - Unlock group
- \`antilink\` - Toggle anti-link
- \`antibadword\` - Toggle bad word filter
- \`welcome\` - Toggle welcome messages
- \`goodbye\` - Toggle goodbye messages
- \`add\` - Add user to group
- \`invite\` - Get invite link
- \`revoke\` - Revoke invite link
- \`admins\` - Tag all admins
- \`everyone\` - Tag all members

### Moderator Commands (8)
- \`warn\` - Warn a user
- \`resetwarn\` - Reset user warnings
- \`warnings\` - Check user warnings
- \`delete\` - Delete a message
- \`tagall\` - Tag all members
- \`hidetag\` - Hidden tag message

### General Commands (10)
- \`menu\` - Display menu
- \`help\` - Get command help
- \`ping\` - Check response time
- \`info\` - Bot information
- \`uptime\` - Bot uptime
- \`stats\` - Bot statistics
- \`runtime\` - System runtime

### Fun Commands (20+)
- \`joke\` - Random joke
- \`quote\` - Inspirational quote
- \`fact\` - Random fact
- \`meme\` - Random meme
- \`dice\` - Roll a dice
- \`flip\` - Flip a coin
- \`8ball\` - Magic 8-ball
- \`choose\` - Choose between options
- \`truth\` - Truth question
- \`dare\` - Dare challenge
- \`ship\` - Ship two people
- \`rate\` - Rate something
- \`roast\` - Get roasted
- \`compliment\` - Get a compliment
- \`trivia\` - Trivia question
- \`riddle\` - Riddle puzzle
- \`pickup\` - Pickup line
- \`advice\` - Random advice
- \`insult\` - Random insult
- \`dog\` - Random dog image
- \`cat\` - Random cat image
- \`fox\` - Random fox image
- \`duck\` - Random duck image

### Utility Commands (20+)
- \`calc\` - Calculator
- \`weather\` - Weather info
- \`translate\` - Translate text
- \`define\` - Word definition
- \`shorten\` - Shorten URL
- \`qr\` - Generate QR code
- \`screenshot\` - Website screenshot
- \`time\` - Current time
- \`sticker\` - Create sticker
- \`toimage\` - Sticker to image
- \`tovideo\` - Sticker to video
- \`toaudio\` - Video to audio
- \`image\` - Search images
- \`wallpaper\` - Random wallpaper
- \`google\` - Google search
- \`wiki\` - Wikipedia search
- \`news\` - Latest news
- \`crypto\` - Crypto prices
- \`movie\` - Movie information
- \`lyrics\` - Song lyrics
- \`github\` - GitHub search

### System Commands (7)
- \`profile\` - User profile
- \`status\` - System status
- \`speed\` - Speed test
- \`listgroups\` - List all groups
- \`repo\` - Repository link
- \`owner\` - Owner contact
- \`support\` - Support info

**Total: 100+ Commands!**

---

## 🤖 AI Chatbot

### Features
- Powered by OpenAI (GPT-4.1-mini, GPT-4.1-nano, Gemini-2.5-flash)
- Conversation history tracking
- Context-aware responses
- Can handle all types of topics
- Toggle on/off by owner/mods

### Usage

1. **Enable Chatbot** (Owner/Mod only):
   \`\`\`
   .chatbot on
   \`\`\`

2. **Chat with Bot**:
   - In DM: Just send any message (no prefix needed)
   - In Groups: Mention the bot or use \`.ai <message>\`

3. **Disable Chatbot**:
   \`\`\`
   .chatbot off
   \`\`\`

### Configuration

Set your OpenAI API key in \`.env\`:
\`\`\`env
OPENAI_API_KEY=your_key_here
\`\`\`

Or in \`config.js\`:
\`\`\`javascript
OPENAI_API_KEY: "your_key_here",
CHATBOT_MODEL: "gpt-4.1-mini", // or "gpt-4.1-nano", "gemini-2.5-flash"
\`\`\`

---

## 👥 Role System

### Permission Hierarchy

1. **Owner** (Highest)
   - Full access to all commands
   - Can add admins and mods
   - Can toggle chatbot
   - Can update bot
   - Set in \`config.js\` → \`OWNER_NUMBER\`

2. **Admin** (70% of Owner)
   - Group management
   - Moderation commands
   - Feature toggles
   - Cannot use owner-only commands
   - Set in \`config.js\` → \`ADMIN_NUMBERS\`

3. **Moderator**
   - Basic moderation
   - Warning system
   - Tag commands
   - Can toggle chatbot
   - Set in \`config.js\` → \`MOD_NUMBERS\`

4. **User** (Lowest)
   - General commands
   - Fun commands
   - Utility commands
   - System commands

---

## 🔄 Update System

### Auto-Update from GitHub

Owner and Admins can update the bot directly from GitHub:

\`\`\`
.update
\`\`\`

This will:
1. Fetch latest changes from repository
2. Pull updates
3. Install new dependencies
4. Restart bot automatically

### Manual Update

\`\`\`bash
git pull origin main
npm install
npm start
\`\`\`

---

## 📁 Project Structure

\`\`\`
BLUE-MD/
├── commands/          # Command files
│   ├── owner/        # Owner commands
│   ├── admin/        # Admin commands
│   ├── mods/         # Moderator commands
│   ├── general/      # General commands
│   ├── system/       # System commands
│   ├── fun/          # Fun commands
│   └── utility/      # Utility commands
├── lib/              # Core libraries
│   ├── blue.js       # Command handler
│   ├── loader.js     # Command loader
│   ├── database.js   # Database manager
│   └── chatbot.js    # AI chatbot
├── session/          # Session files (auto-generated)
├── database/         # Database files (auto-generated)
├── config.js         # Bot configuration
├── index.js          # Main bot file
├── package.json      # Dependencies
└── README.md         # Documentation
\`\`\`

---

## 🛠️ Development

### Adding New Commands

1. Create a new file in appropriate category folder:
   \`\`\`javascript
   // commands/general/mycommand.js
   import blue from '../../lib/blue.js';

   blue.bot({
     cmd: "mycommand",
     desc: "My custom command",
     fromMe: "user",
     type: "general",
     handler: async (sock, msg, args) => {
       await sock.sendMessage(msg.key.remoteJid, { 
         text: 'Hello from my command!' 
       });
     }
   });
   \`\`\`

2. Restart bot - command will be loaded automatically!

### Permission Levels
- \`owner\` - Owner only
- \`admin\` - Admin and Owner
- \`mod\` - Moderator, Admin, and Owner
- \`user\` - Everyone

---

## 🐛 Troubleshooting

### Bot won't start
- Check Node.js version: \`node --version\` (should be v18+)
- Delete \`node_modules\` and run \`npm install\` again
- Check for errors in console

### Pairing failed
- Make sure phone number is in international format (no + or spaces)
- Try restarting the bot
- Delete \`session\` folder and try again

### Commands not working
- Check if prefix is correct in \`config.js\`
- Verify user has required permissions
- Check console for errors

### AI Chatbot not responding
- Verify \`OPENAI_API_KEY\` is set correctly
- Check if chatbot is enabled: \`.chatbot on\`
- Verify API key has credits

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Owner

**vhadau_t** (vhadau-dev)

- GitHub: [@vhadau-dev](https://github.com/vhadau-dev)
- Repository: [BLUE-MD](https://github.com/vhadau-dev/BLUE-MD)

---

## 🙏 Credits

- [Baileys](https://github.com/WhiskeySockets/Baileys) - WhatsApp Web API
- [OpenAI](https://openai.com) - AI Chatbot
- All API providers used in commands

---

## ⭐ Support

If you find this project helpful, please give it a ⭐ on GitHub!

For issues and feature requests, please open an issue on GitHub.

---

<div align="center">

**Owned with ❤️ by vhadau_t**

</div>
