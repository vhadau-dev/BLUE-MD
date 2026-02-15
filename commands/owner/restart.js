import blue from '../../lib/blue.js';

blue.bot({
  cmd: "restart",
  desc: "Restart the bot (Owner only)",
  fromMe: true,
  type: "owner",
  react: "🔄",
  filename: import.meta.url,
  handler: async (sock, msg, args) => {
    await sock.sendMessage(msg.key.remoteJid, {
      text: '🔄 Restarting bot...'
    }, { quoted: msg });
    
    process.exit(0);
  }
});
