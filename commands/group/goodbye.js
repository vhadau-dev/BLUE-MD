import blue from '../../lib/blue.js';
import db from '../../lib/database.js';

blue.bot({
  cmd: "goodbye",
  desc: "Toggle goodbye messages",
  fromMe: false,
  type: "group",
  react: "👋",
  filename: import.meta.url,
  handler: async (sock, msg, args, { sender, isGroup }) => {
    if (!isGroup) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ This command can only be used in groups'
      }, { quoted: msg });
    }
    
    const group = await db.getGroup(sender);
    group.goodbye = !group.goodbye;
    await group.save();
    
    const text = `👋 *Goodbye Messages*\n\n` +
      `Status: ${group.goodbye ? '✅ Enabled' : '❌ Disabled'}\n\n` +
      `${group.goodbye ? 'Leaving members will receive a goodbye message.' : 'Goodbye messages are now disabled.'}\n\n` +
      `Current message:\n"${group.goodbyeMessage}"`;
    
    await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
  }
});
