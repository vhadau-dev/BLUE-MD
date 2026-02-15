import blue from '../../lib/blue.js';
import db from '../../lib/database.js';

blue.bot({
  cmd: "antilink",
  desc: "Toggle antilink protection",
  fromMe: false,
  type: "group",
  react: "🔗",
  filename: import.meta.url,
  handler: async (sock, msg, args, { sender, isGroup }) => {
    if (!isGroup) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ This command can only be used in groups'
      }, { quoted: msg });
    }
    
    const group = await db.getGroup(sender);
    group.antilink = !group.antilink;
    await group.save();
    
    const text = `🔗 *Antilink Protection*\n\n` +
      `Status: ${group.antilink ? '✅ Enabled' : '❌ Disabled'}\n\n` +
      `${group.antilink ? 'Links will be automatically deleted and users will be warned.' : 'Users can now send links freely.'}`;
    
    await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
  }
});
