import blue from '../../lib/blue.js';

blue.bot({
  cmd: "poll",
  desc: "Create a poll in the group",
  fromMe: false,
  type: "group",
  react: "📊",
  filename: import.meta.url,
  handler: async (sock, msg, args, { sender, isGroup }) => {
    if (!isGroup) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ This command can only be used in groups'
      }, { quoted: msg });
    }
    
    const text = `📊 *Poll Feature*\n\n` +
      `Poll creation coming soon!\n\n` +
      `Usage will be:\n` +
      `.poll <question> | <option1> | <option2> | ...`;
    
    await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
  }
});
