import blue from '../../lib/blue.js';
import db from '../../lib/database.js';

blue.bot({
  cmd: "unmute",
  desc: "Unmute the group (everyone can send messages)",
  fromMe: false,
  type: "group",
  react: "🔊",
  filename: import.meta.url,
  handler: async (sock, msg, args, { sender, isGroup }) => {
    if (!isGroup) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ This command can only be used in groups'
      }, { quoted: msg });
    }
    
    try {
      await sock.groupSettingUpdate(sender, 'not_announcement');
      
      const group = await db.getGroup(sender);
      group.mute = false;
      await group.save();
      
      const text = `🔊 *Group Unmuted*\n\nEveryone can send messages now.`;
      
      await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: `❌ Failed to unmute group: ${error.message}`
      }, { quoted: msg });
    }
  }
});
