import pkg from '@whiskeysockets/baileys';
import pino from 'pino';
import chalk from 'chalk';
import readline from 'readline';
import fs from 'fs-extra';
import config from './config.js';
import blue from './lib/blue.js';
import { loadCommands } from './lib/loader.js';
import db from './lib/database.js';
import chatbot from './lib/chatbot.js';
import dotenv from 'dotenv';

dotenv.config();

// --- UNIVERSAL BAILEYS COMPATIBILITY LAYER ---
const Baileys = pkg.default || pkg;
const makeWASocket = Baileys.default || Baileys.makeWASocket || pkg.makeWASocket;
const DisconnectReason = Baileys.DisconnectReason || pkg.DisconnectReason;
const useMultiFileAuthState = Baileys.useMultiFileAuthState || pkg.useMultiFileAuthState;
const fetchLatestBaileysVersion = Baileys.fetchLatestBaileysVersion || pkg.fetchLatestBaileysVersion;
const makeCacheableSignalKeyStore = Baileys.makeCacheableSignalKeyStore || pkg.makeCacheableSignalKeyStore;
const makeInMemoryStore = Baileys.makeInMemoryStore || pkg.makeInMemoryStore;

// Validate critical functions
if (typeof makeWASocket !== 'function') console.error(chalk.red('❌ makeWASocket is not a function!'));
if (typeof useMultiFileAuthState !== 'function') console.error(chalk.red('❌ useMultiFileAuthState is not a function!'));
// ---------------------------------------------

// Create readline interface for pairing
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (text) => new Promise((resolve) => rl.question(text, resolve));

// Logger
const logger = pino({ level: 'silent' });

// Store initialization
let store;
try {
  if (typeof makeInMemoryStore === 'function') {
    store = makeInMemoryStore({ logger });
  } else {
    console.log(chalk.yellow('⚠️  makeInMemoryStore not found. Store features disabled.'));
  }
} catch (e) {
  console.log(chalk.red('❌ Store error:'), e.message);
}

// Banner
function showBanner() {
  console.log(chalk.cyan(`
╔══════════════════════════════════════╗
║                                      ║
║         BLUE-MD WhatsApp Bot         ║
║                                      ║
║  Owner: ${config.OWNER_NAME.padEnd(28)}║
║  Version: 1.0.0                      ║
║                                      ║
╚══════════════════════════════════════╝
  `));
}

// Start bot
async function startBot() {
  showBanner();

  // Ensure session folder exists
  await fs.ensureDir(config.SESSION_FOLDER);

  // Load commands
  await loadCommands();

  // Auth state
  const { state, saveCreds } = await useMultiFileAuthState(config.SESSION_FOLDER);

  // Get latest Baileys version
  const { version } = await fetchLatestBaileysVersion();
  console.log(chalk.green(`✓ Using Baileys version: ${version.join('.')}\n`));

  // Create socket
  const sock = makeWASocket({
    version,
    logger,
    printQRInTerminal: false,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, logger)
    },
    browser: ['BLUE-MD', 'Chrome', '1.0.0'],
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    getMessage: async (key) => {
      if (store) {
        const msg = await store.loadMessage(key.remoteJid, key.id);
        return msg?.message || undefined;
      }
      return { conversation: '' };
    }
  });

  // Bind store
  store?.bind(sock.ev);

  // Handle pairing
  if (!sock.authState.creds.registered) {
    console.log(chalk.yellow('⚠️  No session found. Starting pairing process...\n'));
    
    const phoneNumber = await question(chalk.cyan('Enter your WhatsApp number (with country code): '));
    const code = await sock.requestPairingCode(phoneNumber.trim());
    
    console.log(chalk.green(`\n✓ Your pairing code: ${chalk.bold(code)}`));
    console.log(chalk.yellow('Enter this code in WhatsApp > Linked Devices > Link a Device\n'));
  }

  // Connection update
  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      
      console.log(chalk.red('Connection closed. Reconnecting...'), shouldReconnect);
      
      if (shouldReconnect) {
        startBot();
      }
    } else if (connection === 'open') {
      console.log(chalk.green('\n✓ BLUE-MD is now online!\n'));
      console.log(chalk.cyan('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
      console.log(chalk.green(`Bot Name: ${config.BOT_NAME}`));
      console.log(chalk.green(`Owner: ${config.OWNER_NAME}`));
      console.log(chalk.green(`Prefix: ${config.PREFIX}`));
      console.log(chalk.green(`Commands: ${blue.getAllCommands().length}`));
      console.log(chalk.green(`AI Chatbot: ${config.CHATBOT_ENABLED ? 'Enabled' : 'Disabled'}`));
      console.log(chalk.cyan('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
    }
  });

  // Save credentials
  sock.ev.on('creds.update', saveCreds);

  // Handle messages
  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;

    const msg = messages[0];
    if (!msg.message) return;
    if (msg.key.fromMe) return;

    // Get message text
    const messageText = 
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      msg.message.imageMessage?.caption ||
      msg.message.videoMessage?.caption ||
      '';

    if (!messageText) return;

    const userId = msg.key.participant || msg.key.remoteJid;
    const isGroup = msg.key.remoteJid.endsWith('@g.us');
    
    // Get group admins if it's a group
    let groupAdmins = [];
    if (isGroup) {
      try {
        const metadata = await sock.groupMetadata(msg.key.remoteJid);
        groupAdmins = metadata.participants
          .filter(p => p.admin !== null)
          .map(p => p.id);
      } catch (e) {
        groupAdmins = [];
      }
    }

    // Update user stats
    await db.incrementUserStats(userId, 'messageCount');

    // Auto read
    if (config.AUTO_READ) {
      await sock.readMessages([msg.key]);
    }

    // Check if message is a command
    if (messageText.startsWith(config.PREFIX)) {
      const args = messageText.slice(config.PREFIX.length).trim().split(/ +/);
      const commandName = args.shift().toLowerCase();
      const command = blue.getCommand(commandName);

      if (!command) {
        // Command not found - check if chatbot should respond
        if (config.CHATBOT_ENABLED && !isGroup) {
          const response = await chatbot.chat(userId, messageText);
          if (response) {
            await sock.sendMessage(msg.key.remoteJid, { text: response });
          }
        }
        return;
      }

      // Check permission
      if (!blue.hasPermission(userId, command.permission, groupAdmins)) {
        return await sock.sendMessage(msg.key.remoteJid, {
          text: `❌ You don't have permission to use this command!\n\nRequired role: ${command.permission}`
        });
      }

      // Check cooldown
      const cooldown = blue.checkCooldown(userId, commandName);
      if (cooldown.onCooldown) {
        return await sock.sendMessage(msg.key.remoteJid, {
          text: `⏳ Please wait ${cooldown.timeLeft}s before using this command again`
        });
      }

      // Auto react
      if (config.AUTO_REACT) {
        await sock.sendMessage(msg.key.remoteJid, {
          react: { text: '⚡', key: msg.key }
        });
      }

      // Update command stats
      await db.incrementUserStats(userId, 'commandCount');

      // Execute command
      try {
        console.log(chalk.blue(`[CMD] ${commandName} by ${userId.split('@')[0]}`));
        await command.handler(sock, msg, args);
      } catch (error) {
        console.error(chalk.red(`[ERROR] ${commandName}:`), error);
        await sock.sendMessage(msg.key.remoteJid, {
          text: `❌ Command execution failed: ${error.message}`
        });
      }
    } else {
      // Not a command - check if chatbot should respond
      if (config.CHATBOT_ENABLED) {
        // In groups, only respond when bot is mentioned or in DM
        const shouldRespond = !isGroup || messageText.includes(`@${sock.user.id.split(':')[0]}`);
        
        if (shouldRespond) {
          // Auto typing
          if (config.AUTO_TYPING) {
            await sock.sendPresenceUpdate('composing', msg.key.remoteJid);
          }

          const response = await chatbot.chat(userId, messageText);
          
          if (response) {
            await sock.sendMessage(msg.key.remoteJid, { 
              text: response 
            });
          }

          // Stop typing
          if (config.AUTO_TYPING) {
            await sock.sendPresenceUpdate('paused', msg.key.remoteJid);
          }
        }
      }
    }
  });

  // Handle group updates
  sock.ev.on('group-participants.update', async ({ id, participants, action }) => {
    const settings = await db.getGroupSettings(id);

    if (action === 'add' && settings.welcome) {
      for (const participant of participants) {
        await sock.sendMessage(id, {
          text: config.WELCOME_MESSAGE.replace('@user', `@${participant.split('@')[0]}`),
          mentions: [participant]
        });
      }
    }

    if (action === 'remove' && settings.goodbye) {
      for (const participant of participants) {
        await sock.sendMessage(id, {
          text: config.GOODBYE_MESSAGE.replace('@user', `@${participant.split('@')[0]}`),
          mentions: [participant]
        });
      }
    }
  });

  // Anti-link handler
  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const groupId = msg.key.remoteJid;
    if (!groupId.endsWith('@g.us')) return;

    const settings = await db.getGroupSettings(groupId);
    if (!settings.antilink) return;

    const userId = msg.key.participant;
    
    // Don't check owner/admin/mod
    if (blue.isOwner(userId) || blue.isAdmin(userId) || blue.isMod(userId)) return;

    const messageText = 
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      '';

    // Check for links
    const linkRegex = /(https?:\/\/|www\.)[^\s]+/gi;
    const waGroupRegex = /chat\.whatsapp\.com\/[^\s]+/gi;

    if (linkRegex.test(messageText) || waGroupRegex.test(messageText)) {
      // Delete message
      await sock.sendMessage(groupId, { delete: msg.key });

      // Warn user
      const warnings = await db.addWarning(userId, groupId);
      
      let warningText = `⚠️ @${userId.split('@')[0]} Link detected!\n\nWarnings: ${warnings}/${config.MAX_WARNINGS}`;

      if (warnings >= config.MAX_WARNINGS) {
        await sock.groupParticipantsUpdate(groupId, [userId], 'remove');
        warningText += '\n\n❌ Maximum warnings reached! User kicked.';
        await db.resetWarnings(userId, groupId);
      }

      await sock.sendMessage(groupId, {
        text: warningText,
        mentions: [userId]
      });
    }
  });

  return sock;
}

// Start
startBot().catch((err) => {
  console.error(chalk.red('Fatal error:'), err);
  process.exit(1);
});

// Handle process termination
process.on('uncaughtException', (err) => {
  console.error(chalk.red('Uncaught Exception:'), err);
});

process.on('unhandledRejection', (err) => {
  console.error(chalk.red('Unhandled Rejection:'), err);
});
