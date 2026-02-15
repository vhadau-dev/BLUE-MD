import blue from '../../lib/blue.js';
import config from '../../config.js';

blue.bot({
  cmd: "setprefix",
  desc: "Change bot command prefix (Owner only)",
  fromMe: true,
  type: "owner",
  react: "⚙️",
  filename: import.meta.url,
  handler: async (sock, msg, args) => {
    const newPrefix = args[0];
    
    if (!newPrefix) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: `❌ Please specify a new prefix\nUsage: .setprefix <prefix>\n\nCurrent prefix: ${config.PREFIX}`
      }, { quoted: msg });
    }
    
    const oldPrefix = config.PREFIX;
    config.PREFIX = newPrefix;
    
    const text = `⚙️ *Prefix Changed*\n\n` +
      `Old Prefix: ${oldPrefix}\n` +
      `New Prefix: ${newPrefix}\n\n` +
      `_Note: This change is temporary and will reset on bot restart._`;
    
    await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
  }
});
