# BLUE-MD Command Reference

Complete list of all 100+ commands available in BLUE-MD.

**Prefix:** `.` (configurable)

---

## 👑 Owner Commands (15)

Commands that only the bot owner can use.

| Command | Description | Usage |
|---------|-------------|-------|
| `eval` | Execute JavaScript code | `.eval <code>` |
| `restart` | Restart the bot | `.restart` |
| `shutdown` | Shutdown the bot | `.shutdown` |
| `update` | Update bot from GitHub | `.update` |
| `broadcast` | Broadcast message to all groups | `.broadcast <message>` |
| `setprefix` | Change command prefix | `.setprefix <new_prefix>` |
| `addadmin` | Add user as admin | `.addadmin @user` |
| `addmod` | Add user as moderator | `.addmod @user` |
| `block` | Block a user | `.block @user` |
| `unblock` | Unblock a user | `.unblock @user` |
| `join` | Join group via invite link | `.join <link>` |
| `leave` | Leave current group | `.leave` |
| `chatbot` | Toggle AI chatbot on/off | `.chatbot on/off` |
| `clearchat` | Clear your AI chat history | `.clearchat` |
| `clearallchats` | Clear all AI chat histories | `.clearallchats` |

---

## ⚙️ Admin Commands (20)

Commands for group admins (70% of owner privileges).

### Group Management

| Command | Description | Usage |
|---------|-------------|-------|
| `kick` | Kick user from group | `.kick @user` |
| `promote` | Promote user to admin | `.promote @user` |
| `demote` | Demote admin to member | `.demote @user` |
| `add` | Add user to group | `.add <number>` |
| `groupinfo` | Get group information | `.groupinfo` |
| `setname` | Change group name | `.setname <name>` |
| `setdesc` | Change group description | `.setdesc <description>` |
| `lock` | Lock group (admins only) | `.lock` |
| `unlock` | Unlock group (all members) | `.unlock` |
| `invite` | Get group invite link | `.invite` |
| `revoke` | Revoke group invite link | `.revoke` |

### Group Features

| Command | Description | Usage |
|---------|-------------|-------|
| `antilink` | Toggle anti-link protection | `.antilink on/off` |
| `antibadword` | Toggle bad word filter | `.antibadword on/off` |
| `welcome` | Toggle welcome messages | `.welcome on/off` |
| `goodbye` | Toggle goodbye messages | `.goodbye on/off` |
| `setwelcome` | Set custom welcome message | `.setwelcome <message>` |
| `setgoodbye` | Set custom goodbye message | `.setgoodbye <message>` |

### Group Utilities

| Command | Description | Usage |
|---------|-------------|-------|
| `admins` | Tag all group admins | `.admins` |
| `everyone` | Tag all group members | `.everyone <message>` |

---

## 🛡️ Moderator Commands (8)

Commands for group moderators.

| Command | Description | Usage |
|---------|-------------|-------|
| `warn` | Warn a user | `.warn @user [reason]` |
| `resetwarn` | Reset user warnings | `.resetwarn @user` |
| `warnings` | Check user warnings | `.warnings @user` |
| `delete` | Delete a message | `.delete (reply to message)` |
| `tagall` | Tag all members | `.tagall <message>` |
| `hidetag` | Send message with hidden tag | `.hidetag <message>` |
| `chatbot` | Toggle AI chatbot | `.chatbot on/off` |

---

## 📱 General Commands (10)

Basic commands available to all users.

| Command | Description | Usage |
|---------|-------------|-------|
| `menu` | Display command menu | `.menu` |
| `help` | Get help for specific command | `.help <command>` |
| `ping` | Check bot response time | `.ping` |
| `info` | Get bot information | `.info` |
| `uptime` | Check bot uptime | `.uptime` |
| `stats` | Get bot statistics | `.stats` |
| `runtime` | Check system runtime | `.runtime` |
| `ai` | Chat with AI | `.ai <message>` |
| `clearchat` | Clear your AI chat history | `.clearchat` |

---

## 🎮 Fun Commands (30)

Entertainment and game commands.

### Games & Challenges

| Command | Description | Usage |
|---------|-------------|-------|
| `dice` | Roll a dice | `.dice` |
| `flip` | Flip a coin | `.flip` |
| `8ball` | Ask magic 8-ball | `.8ball <question>` |
| `choose` | Choose between options | `.choose option1 \| option2 \| option3` |
| `truth` | Get truth question | `.truth` |
| `dare` | Get dare challenge | `.dare` |
| `ship` | Ship two people | `.ship @user1 @user2` |
| `rate` | Rate something | `.rate <thing>` |
| `trivia` | Get trivia question | `.trivia` |
| `riddle` | Get a riddle | `.riddle` |

### Entertainment

| Command | Description | Usage |
|---------|-------------|-------|
| `joke` | Get random joke | `.joke` |
| `quote` | Get inspirational quote | `.quote` |
| `fact` | Get random fact | `.fact` |
| `meme` | Get random meme | `.meme` |
| `roast` | Get roasted | `.roast` |
| `compliment` | Get a compliment | `.compliment` |
| `pickup` | Get pickup line | `.pickup` |
| `advice` | Get random advice | `.advice` |
| `insult` | Get random insult | `.insult` |

### Animal Images

| Command | Description | Usage |
|---------|-------------|-------|
| `dog` | Random dog image | `.dog` |
| `cat` | Random cat image | `.cat` |
| `fox` | Random fox image | `.fox` |
| `duck` | Random duck image | `.duck` |

---

## 🔧 Utility Commands (30)

Useful tools and utilities.

### Conversion & Tools

| Command | Description | Usage |
|---------|-------------|-------|
| `calc` | Calculate math expression | `.calc 2 + 2` |
| `weather` | Get weather information | `.weather <city>` |
| `translate` | Translate text | `.translate <lang> <text>` |
| `define` | Get word definition | `.define <word>` |
| `shorten` | Shorten URL | `.shorten <url>` |
| `qr` | Generate QR code | `.qr <text>` |
| `screenshot` | Take website screenshot | `.screenshot <url>` |
| `time` | Get current time | `.time [timezone]` |

### Media Tools

| Command | Description | Usage |
|---------|-------------|-------|
| `sticker` | Convert image/video to sticker | `.sticker (reply to media)` |
| `toimage` | Convert sticker to image | `.toimage (reply to sticker)` |
| `tovideo` | Convert sticker to video | `.tovideo (reply to sticker)` |
| `toaudio` | Convert video to audio | `.toaudio (reply to video)` |
| `image` | Search for images | `.image <query>` |
| `wallpaper` | Get random wallpaper | `.wallpaper [query]` |

### Search & Information

| Command | Description | Usage |
|---------|-------------|-------|
| `google` | Google search | `.google <query>` |
| `wiki` | Wikipedia search | `.wiki <query>` |
| `news` | Get latest news | `.news [category]` |
| `crypto` | Get crypto price | `.crypto [coin]` |
| `movie` | Get movie information | `.movie <title>` |
| `lyrics` | Get song lyrics | `.lyrics <song>` |
| `github` | Search GitHub repos | `.github <query>` |

---

## 🖥️ System Commands (10)

System and bot information commands.

| Command | Description | Usage |
|---------|-------------|-------|
| `profile` | Get user profile | `.profile` |
| `status` | Get system status | `.status` |
| `speed` | Test response speed | `.speed` |
| `listgroups` | List all bot groups | `.listgroups` |
| `repo` | Get repository link | `.repo` |
| `owner` | Get owner contact | `.owner` |
| `support` | Get support info | `.support` |

---

## 🤖 AI Chatbot Commands

Special commands for AI chatbot feature.

| Command | Description | Usage | Permission |
|---------|-------------|-------|------------|
| `chatbot` | Toggle chatbot on/off | `.chatbot on/off` | Owner/Mod |
| `ai` | Chat with AI | `.ai <message>` | All |
| `clearchat` | Clear your chat history | `.clearchat` | All |
| `clearallchats` | Clear all chat histories | `.clearallchats` | Owner |

### AI Chatbot Behavior

When chatbot is **enabled**:
- **In DM:** Bot responds to all messages (no prefix needed)
- **In Groups:** Bot responds when mentioned or using `.ai` command

When chatbot is **disabled**:
- Bot only responds to commands (with prefix)

---

## 📊 Command Statistics

- **Total Commands:** 100+
- **Owner Commands:** 15
- **Admin Commands:** 20
- **Moderator Commands:** 8
- **General Commands:** 10
- **Fun Commands:** 30
- **Utility Commands:** 30
- **System Commands:** 10

---

## 🎯 Command Categories

### By Permission Level

| Level | Commands | Access |
|-------|----------|--------|
| Owner | 15 | Owner only |
| Admin | 20 | Owner + Admins |
| Moderator | 8 | Owner + Admins + Mods |
| User | 80+ | Everyone |

### By Type

| Category | Commands | Description |
|----------|----------|-------------|
| Owner | 15 | Bot management |
| Admin | 20 | Group management |
| Mods | 8 | Moderation |
| General | 10 | Basic info |
| Fun | 30 | Entertainment |
| Utility | 30 | Tools & utilities |
| System | 10 | System info |

---

## 💡 Usage Tips

### Command Syntax

- **Required parameter:** `<parameter>`
- **Optional parameter:** `[parameter]`
- **Multiple options:** `option1 | option2`
- **Mention user:** `@user`
- **Reply to message:** Reply to a message then use command

### Examples

\`\`\`
.kick @user                    # Kick mentioned user
.warn @user spamming           # Warn with reason
.calc 2 + 2 * 5                # Calculate expression
.weather London                # Get London weather
.choose pizza | burger | sushi # Choose between options
.ai What is AI?                # Ask AI a question
\`\`\`

### Best Practices

1. **Use correct prefix** - Default is `.` but can be changed
2. **Check permissions** - Some commands require specific roles
3. **Read help** - Use `.help <command>` for detailed info
4. **Test first** - Try commands in DM before using in groups
5. **Be responsible** - Don't abuse bot features

---

## 🔐 Permission Requirements

### Owner Only
- eval, restart, shutdown, update
- broadcast, setprefix
- addadmin, addmod
- block, unblock
- clearallchats

### Admin Required
- kick, promote, demote, add
- group settings (name, desc, lock, unlock)
- feature toggles (antilink, welcome, etc.)
- invite, revoke

### Moderator Required
- warn, resetwarn, warnings
- delete, tagall, hidetag
- chatbot toggle

### Everyone Can Use
- All general, fun, utility, and system commands
- ai, clearchat
- menu, help, ping, info

---

## 📝 Notes

- Commands are **case-insensitive** (`.menu` = `.MENU` = `.Menu`)
- Some commands require **replying to a message** (sticker, delete, etc.)
- Some commands require **mentioning users** (kick, warn, ship, etc.)
- **Cooldown:** 3 seconds between commands (configurable)
- **AI Chatbot** requires OpenAI API key to function

---

## 🆕 Adding Custom Commands

Owners can add custom commands by creating new files in the `commands` folder.

Example:
\`\`\`javascript
// commands/general/hello.js
import blue from '../../lib/blue.js';

blue.bot({
  cmd: "hello",
  desc: "Say hello",
  fromMe: "user",
  type: "general",
  handler: async (sock, msg, args) => {
    await sock.sendMessage(msg.key.remoteJid, { 
      text: 'Hello! 👋' 
    });
  }
});
\`\`\`

---

<div align="center">

**For more information, see [README.md](README.md) and [SETUP_GUIDE.md](SETUP_GUIDE.md)**

**Owned with ❤️ by vhadau_t**

</div>
