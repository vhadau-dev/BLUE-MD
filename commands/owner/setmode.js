import blue from '../../lib/blue.js';

blue.bot({
  cmd: "setmode",
  desc: "Change bot mode (Owner only)",
  fromMe: true,
  type: "owner",
  react: "⚙️",
  filename: import.meta.url,
  handler: async (sock, msg, args) => {
    const mode = args[0]?.toLowerCase();
    
    if (!mode) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Please specify a mode\nUsage: .setmode <public/private>\n\nModes:\n- public: Bot responds to everyone\n- private: Bot responds only to owner'
      }, { quoted: msg });
    }
    
    const text = `⚙️ *Bot Mode*\n\n` +
      `Mode changing feature coming soon!\n\n` +
      `Requested mode: ${mode}`;
    
    await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
  }
});
