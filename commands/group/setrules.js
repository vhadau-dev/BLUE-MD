import blue from '../../lib/blue.js';
import db from '../../lib/database.js';

blue.bot({
  cmd: "setrules",
  desc: "Set group rules",
  fromMe: false,
  type: "group",
  react: "📝",
  filename: import.meta.url,
  handler: async (sock, msg, args, { sender, isGroup }) => {
    if (!isGroup) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ This command can only be used in groups'
      }, { quoted: msg });
    }
    
    const rules = args.join(' ');
    
    if (!rules) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Please provide rules to set\nUsage: .setrules <rules text>'
      }, { quoted: msg });
    }
    
    const group = await db.getGroup(sender);
    group.rules = rules;
    await group.save();
    
    const text = `📝 *Rules Updated*\n\n${rules}`;
    
    await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
  }
});
