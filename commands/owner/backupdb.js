import blue from '../../lib/blue.js';

blue.bot({
  cmd: "backupdb",
  desc: "Backup database (Owner only)",
  fromMe: true,
  type: "owner",
  react: "💾",
  filename: import.meta.url,
  handler: async (sock, msg, args) => {
    const text = `💾 *Database Backup*\n\n` +
      `This feature is coming soon!\n\n` +
      `For now, you can manually backup your MongoDB database using:\n` +
      `\`mongodump --uri="your_mongo_uri"\``;
    
    await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
  }
});
