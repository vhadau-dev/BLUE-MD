import blue from '../../lib/blue.js';
import db from '../../lib/database.js';
import { extractMentions } from '../../lib/utils.js';

blue.bot({
  cmd: "delmod",
  desc: "Remove a moderator (Owner only)",
  fromMe: true,
  type: "owner",
  react: "❌",
  filename: import.meta.url,
  handler: async (sock, msg, args) => {
    const mentions = extractMentions(msg);
    
    if (mentions.length === 0) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Please mention a user to remove from moderators\nUsage: .delmod @user'
      }, { quoted: msg });
    }
    
    const target = mentions[0];
    const result = await db.removeModerator(target);
    
    if (!result) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Failed to remove moderator or user is not a moderator'
      }, { quoted: msg });
    }
    
    const text = `✅ *Moderator Removed*\n\n` +
      `User: @${target.split('@')[0]}`;
    
    await sock.sendMessage(msg.key.remoteJid, { 
      text,
      mentions: [target]
    }, { quoted: msg });
  }
});
