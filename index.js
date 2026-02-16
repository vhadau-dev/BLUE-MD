import makeWASocket, {
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  DisconnectReason,
  delay,
  Browsers
} from '@whiskeysockets/baileys';

import pino from 'pino';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import chalk from 'chalk';

import blue from './lib/blue.js';
import loadCommands from './lib/loader.js';
import config from './config.js';

const SESSION_PATH = path.resolve(config.SESSION_ID || './session');

if (!fs.existsSync(SESSION_PATH)) {
  fs.mkdirSync(SESSION_PATH, { recursive: true });
}

console.log(chalk.cyan(`
╔══════════════════════════════╗
║        BLUE-MD BOT           ║
║      Stable Core Build       ║
╚══════════════════════════════╝
`));

function askNumber() {
  return new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('📱 Enter WhatsApp number (no +): ', n => {
      rl.close();
      resolve(n.replace(/[^0-9]/g, ''));
    });
  });
}

async function startBot() {
  await loadCommands();

  const { state, saveCreds } = await useMultiFileAuthState(SESSION_PATH);
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: false,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' }))
    },
    browser: Browsers.ubuntu('Chrome'),
    markOnlineOnConnect: true,
    syncFullHistory: false
  });

  blue.setSock(sock);

  if (!state.creds.registered) {
    console.log('\n🔗 Pair your WhatsApp account');
    const number = await askNumber();

    console.log('⏳ Requesting pairing code...');
    await delay(2000);

    const code = await sock.requestPairingCode(number);
    console.log(chalk.green(`\n✅ PAIRING CODE: ${code}\n`));
    console.log('Open WhatsApp → Linked Devices → Link with phone number');
  }

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
    if (connection === 'open') {
      console.log(chalk.green('\n✅ Bot connected & ready'));
      console.log(`📦 Commands loaded: ${blue.getCommands().length}\n`);
    }

    if (connection === 'close') {
      const reason = lastDisconnect?.error?.output?.statusCode;
      if (reason === DisconnectReason.loggedOut) {
        console.log('❌ Logged out. Delete session & restart.');
        process.exit(0);
      }
      console.log('🔄 Reconnecting...');
      startBot();
    }
  });

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;

    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    await blue.handleMessage(sock, msg);
  });
}

startBot().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});

process.on('SIGINT', () => {
  console.log('\n👋 Shutting down...');
  process.exit(0);
});}

console.log(chalk.green('✅ SESSION_ID found'));

// Database connection
console.log(chalk.yellow('\n🔍 Connecting to database...'));

const dbConnected = await db.connectDB();
if (!dbConnected) {
  console.log(chalk.red('❌ Database connection failed. Bot cannot start.'));
  console.log(chalk.yellow('\nPlease check your MONGO_URI in .env file'));
  process.exit(1);
}

// Load commands
await loadCommands();

// Start bot
async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./session');
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: false,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' }))
    },
    browser: ['BLUE-MD', 'Chrome', '1.0.0'],
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    getMessage: async (key) => {
      return { conversation: 'BLUE-MD' };
    }
  });

  // Set sock in blue handler
  blue.setSock(sock);

  // Save credentials on update
  sock.ev.on('creds.update', saveCreds);

  // Connection update handler
  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === 'close') {
      const shouldReconnect = 
        (lastDisconnect?.error instanceof Boom)
          ? lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut
          : true;

      console.log(chalk.red('❌ Connection closed'));

      if (lastDisconnect?.error?.output?.statusCode === DisconnectReason.loggedOut) {
        console.log(chalk.red('⚠️ Session expired, please get a new one.'));
        process.exit(1);
      }

      if (shouldReconnect) {
        console.log(chalk.yellow('🔄 Reconnecting...'));
        setTimeout(() => startBot(), 3000);
      }
    } else if (connection === 'open') {
      console.log(chalk.green('\n✅ Bot connected successfully!'));
      console.log(chalk.cyan(`📱 Bot Name: ${config.BOT_NAME}`));
      console.log(chalk.cyan(`👤 Owner: ${config.OWNER_NAME}`));
      console.log(chalk.cyan(`⚡ Prefix: ${config.PREFIX}`));
      console.log(chalk.cyan(`📊 Commands: ${blue.getCommands().length}`));
      console.log(chalk.green('\n🚀 Bot is ready to receive messages!\n'));
    }
  });

  // Message handler
  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;
    
    const msg = messages[0];
    if (!msg.message) return;
    if (msg.key.fromMe) return;

    await blue.handleMessage(sock, msg);
  });

  // Group participant update handler
  sock.ev.on('group-participants.update', async (update) => {
    const { id, participants, action } = update;
    
    try {
      const groupSettings = await db.getGroup(id);
      
      if (action === 'add' && groupSettings.welcome) {
        const groupMetadata = await sock.groupMetadata(id);
        
        for (const participant of participants) {
          const welcomeText = groupSettings.welcomeMessage
            .replace('@user', `@${participant.split('@')[0]}`)
            .replace('@group', groupMetadata.subject);
          
          await sock.sendMessage(id, {
            text: welcomeText,
            mentions: [participant]
          });
        }
      }
      
      if (action === 'remove' && groupSettings.goodbye) {
        const groupMetadata = await sock.groupMetadata(id);
        
        for (const participant of participants) {
          const goodbyeText = groupSettings.goodbyeMessage
            .replace('@user', `@${participant.split('@')[0]}`)
            .replace('@group', groupMetadata.subject);
          
          await sock.sendMessage(id, {
            text: goodbyeText,
            mentions: [participant]
          });
        }
      }
    } catch (error) {
      console.error('Error handling group participant update:', error);
    }
  });

  return sock;
}

// Start the bot
startBot().catch(error => {
  console.error(chalk.red('❌ Fatal error:'), error);
  process.exit(1);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log(chalk.yellow('\n👋 Shutting down bot...'));
  process.exit(0);
});

process.on('unhandledRejection', (error) => {
  console.error(chalk.red('❌ Unhandled rejection:'), error);
});
