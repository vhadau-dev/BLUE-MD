import blue from '../../lib/blue.js';
import db from '../../lib/database.js';

blue.bot({
  cmd: "rules",
  desc: "View group rules",
  fromMe: false,
  type: "group",
  react: "📜",
  filename: import.meta.url,
  handler: async (sock, msg, args, { sender, isGroup }) => {
    if (!isGroup) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ This command can only be used in groups'
      }, { quoted: msg });
    }
    
    const group = await db.getGroup(sender);
    
    const text = `📜 *Group Rules*\n\n${group.rules}`;
    
    await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
  }
});
