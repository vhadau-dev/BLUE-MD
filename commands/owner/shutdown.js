import blue from '../../lib/blue.js';

blue.bot({
  cmd: "shutdown",
  desc: "Shutdown the bot (Owner only)",
  fromMe: true,
  type: "owner",
  react: "🛑",
  filename: import.meta.url,
  handler: async (sock, msg, args) => {
    await sock.sendMessage(msg.key.remoteJid, {
      text: '🛑 Shutting down bot...'
    }, { quoted: msg });
    
    process.exit(0);
  }
});
