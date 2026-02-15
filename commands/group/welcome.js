import blue from '../../lib/blue.js';
import db from '../../lib/database.js';

blue.bot({
  cmd: "welcome",
  desc: "Toggle welcome messages",
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
    group.welcome = !group.welcome;
    await group.save();
    
    const text = `👋 *Welcome Messages*\n\n` +
      `Status: ${group.welcome ? '✅ Enabled' : '❌ Disabled'}\n\n` +
      `${group.welcome ? 'New members will receive a welcome message.' : 'Welcome messages are now disabled.'}\n\n` +
      `Current message:\n"${group.welcomeMessage}"`;
    
    await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
  }
});
