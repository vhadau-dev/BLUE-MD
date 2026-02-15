import blue from '../../lib/blue.js';

blue.bot({
  cmd: "setdb",
  desc: "Change database connection (Owner only)",
  fromMe: true,
  type: "owner",
  react: "🗄️",
  filename: import.meta.url,
  handler: async (sock, msg, args) => {
    const text = `🗄️ *Database Configuration*\n\n` +
      `This feature requires editing the .env file and restarting the bot.\n\n` +
      `To change database:\n` +
      `1. Edit MONGO_URI in .env file\n` +
      `2. Use .restart command\n\n` +
      `_Direct database switching is not supported for security reasons._`;
    
    await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
  }
});
