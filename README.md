# BLUE-MD - WhatsApp Multi-Device Bot

A powerful WhatsApp Multi-Device bot built with Baileys, featuring a comprehensive command system, database integration, and a focus on stability and ease of use.

**Owned by:** vhadau_t (vhadau-dev)

---

## ✨ Features

- **Stable Session Management:** Relies on a `SESSION_ID` for persistent sessions, with clear error messages for invalid or missing sessions.
- **MongoDB Integration:** Manages user data, gambling stats, group settings, and permissions.
- **Modular Command System:** Commands are organized into categories, making it easy to add, remove, or modify them.
- **Role-Based Permissions:** Owner, Moderator, and User roles with distinct command access.
- **Comprehensive Command Suite:** Includes categories for Gambling, Fun, Owner, and Group management.
- **Customizable Configuration:** Easily configure the bot via `config.js` and `.env` files.

---

## 📋 Requirements

- **Node.js:** v18.x or higher
- **npm/pnpm:** Latest version
- **MongoDB:** A running MongoDB instance (local or cloud)
- **WhatsApp Account:** For pairing and generating a `SESSION_ID`

---

## 🚀 Installation & Setup

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/vhadau-dev/BLUE-MD.git
    cd BLUE-MD
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Configure Environment:**

    Create a `.env` file in the root directory and add the following:

    ```========================================
 BLUE-MD Bot Configuration
 ========================================

 Session folder (REQUIRED)
SESSION_ID=./session

 Bot Image
BLUE_IMAGE=https://d.uguu.se/HpAPramA.jpg
 Command prefix
PREFIX=.

 Owners
OWNERS=27675859928 you nunmber

 Mods / Guards
MODS=you mods here

 Bot behavior
AUTO_READ=true
AUTO_REACT=true
AUTO_TYPING=false

 Timezone & logging
TIMEZONE=Africa/Lagos
LOG_LEVEL=info
```

4.  **Configure the Bot:**

    Edit `config.js` to set your owner number and other preferences:

```import 'dotenv/config';

const config = {
  // Bot Information
  BOT_NAME: process.env.BOT_NAME || "Riculu",
  OWNER_NAME: process.env.OWNER_NAME || "vhadau_t",
  VERSION: "1.0.0",

  // Command Configuration
  PREFIX: process.env.PREFIX || ".",

  // Owner Configuration
  OWNERS: (process.env.OWNERS || "27675859928")
    .split(',')
    .map(n => n.trim()),

  // Session Configuration
  SESSION_ID: process.env.SESSION_ID || "./session",

  // Image Configuration
  BLUE_IMAGE: process.env.BLUE_IMAGE || "https://d.uguu.se/HpAPramA.jpg",
  // Bot Behavior
  AUTO_READ: process.env.AUTO_READ === "true",
  AUTO_REACT: process.env.AUTO_REACT === "false",
  AUTO_TYPING: process.env.AUTO_TYPING === "true",
  MODS: (process.env.MODS || "27675859928"), 

  // Group Settings Defaults (still fine)
  DEFAULT_GROUP_SETTINGS: {
    antilink: true,
    welcome: false,
    goodbye: false,
    mute: false,
    locked: false
  },

  // Timezone
  TIMEZONE: process.env.TIMEZONE || "Africa/Lagos",

  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || "info"
};

export default config;

    ```

5.  **Start the Bot:**

    ```bash
    npm start
    ```

---

## 🔒 Session & Pairing

This bot **requires** a `SESSION_ID` to be set in the `.env` file. It will not start without one.

-   **If `SESSION_ID` is missing:** The bot will log an error and exit.
-   **If `SESSION_ID` is invalid or expired:** The bot will log an error and exit.

**The bot does not support auto-pairing.** You must obtain a valid `SESSION_ID` from a trusted source or by pairing your own number.

---

## ⚙️ Configuration

### `.env` File

| Variable     | Description                                      |
| :----------- | :----------------------------------------------- |
| `SESSION_ID` | **Required.** Your WhatsApp session ID.          |
| `MONGO_URI`  | **Required.** Your MongoDB connection string.    |
| `BLUE_IMAGE` | Optional. URL for images in menus, etc.          |

### `config.js` File

| Setting            | Description                                      |
| :----------------- | :----------------------------------------------- |
| `BOT_NAME`         | The name of your bot.                            |
| `OWNER_NAME`       | The name of the bot owner.                       |
| `PREFIX`           | The command prefix (e.g., `.`, `!`).             |
| `OWNERS`           | An array of owner phone numbers.                 |
| `DEFAULT_CURRENCY` | The currency symbol for the gambling system.     |
| `STARTING_BALANCE` | The initial balance for new users.               |
| `BLUE_IMAGE`       | Default image URL if not set in `.env`.          |

---

## 🎯 Commands

### 🎰 Gambling Commands (`.gamblehelp`)

-   `balance`: Check your balance.
-   `daily`: Claim your daily reward.
-   `weekly`: Claim your weekly reward.
-   `leaderboard`: View the top 10 richest users.
-   `bet <amount>`: Place a 50/50 bet.
-   `gamble <amount>`: Gamble with variable multipliers.
-   `dice <amount> <1-6>`: Bet on a dice roll.
-   `slots <amount>`: Play the slot machine.
-   `coinflip <amount> <h/t>`: Flip a coin.
-   `give <amount> @user`: Give money to another user.
-   `rob @user`: Attempt to rob another user.
-   `deposit <amount>`: (Coming Soon) Deposit to your bank.
-   `withdraw <amount>`: (Coming Soon) Withdraw from your bank.
-   `resetbalance @user`: (Owner) Reset a user's balance.

### 🎉 Fun Commands (`.funhelp`)

-   `joke`: Get a random joke.
-   `meme`: Get a random meme (coming soon).
-   `quote`: Get an inspirational quote.
-   `fact`: Get a random fun fact.
-   `roast`: Get roasted.
-   `compliment`: Get a compliment.
-   `ship @user1 @user2`: Ship two users together.
-   `emoji`: Get a random emoji.
-   `truth`: Get a truth question.
-   `dare`: Get a dare challenge.
-   `rate <thing>`: Rate something out of 100.
-   `ascii <text>`: Convert text to ASCII art.
-   `say <text>`: Make the bot say something.

### 👑 Owner Commands (`.ownerhelp`)

-   `addmod @user`: Add a moderator.
-   `mods`: List all moderators (public).
-   `delmod @user`: Remove a moderator.
-   `setprefix <prefix>`: Change the command prefix.
-   `eval <code>`: Execute JavaScript code (DANGEROUS).
-   `shell <cmd>`: Execute a shell command (DANGEROUS).
-   `restart`: Restart the bot.
-   `shutdown`: Shutdown the bot.
-   `setdb`: Instructions for changing the database.
-   `backupdb`: Instructions for backing up the database.
-   `setmode <mode>`: Change bot mode (coming soon).
-   `banuser @user [reason]`: Ban a user from the bot.
-   `unbanuser @user`: Unban a user.
-   `broadcast <message>`: Broadcast a message to all groups.

### 👥 Group Commands (`.grouphelp`)

-   `antilink`: Toggle anti-link protection.
-   `welcome`: Toggle welcome messages.
-   `goodbye`: Toggle goodbye messages.
-   `kick @user`: Kick a user from the group.
-   `mute`: Mute the group (admins only).
-   `unmute`: Unmute the group.
-   `promote @user`: Promote a user to admin.
-   `demote @user`: Demote an admin.
-   `tagall [message]`: Tag all group members.
-   `hidetag <message>`: Tag all members without visible tags.
-   `poll`: Create a poll (coming soon).
-   `rules`: View the group rules.
-   `setrules <text>`: Set the group rules.
-   `lock`: Lock group settings (admins only).

---

## 📝 Code Style & Final Note

-   **Modularity:** Each command is in its own file within its category folder.
-   **Clarity:** The code is written to be as clear and understandable as possible.
-   **No Hardcoded Secrets:** All sensitive information is handled through environment variables.

This bot is designed to be fully editable and easy to maintain. Enjoy using and customizing BLUE-MD!
