import blue from '../../lib/blue.js';
import db from '../../lib/database.js';
import { extractMentions } from '../../lib/utils.js';

blue.bot({
  cmd: "addmod",
  desc: "Add a moderator (Owner only)",
  fromMe: true,
  type: "owner",
  react: "✅",
  filename: import.meta.url,
  handler: async (sock, msg, args, { senderNumber }) => {
    const mentions = extractMentions(msg);
    
    if (mentions.length === 0) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Please mention a user to add as moderator\nUsage: .addmod @user'
      }, { quoted: msg });
    }
    
    const target = mentions[0];
    const result = await db.addModerator(target, senderNumber);
    
    if (result && result.error) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: `❌ ${result.error}`
      }, { quoted: msg });
    }
    
    const text = `✅ *Moderator Added*\n\n` +
      `User: @${target.split('@')[0]}\n` +
      `Added by: @${senderNumber.split('@')[0]}`;
    
    await sock.sendMessage(msg.key.remoteJid, { 
      text,
      mentions: [target, senderNumber]
    }, { quoted: msg });
  }
});
