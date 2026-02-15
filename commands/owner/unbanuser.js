import blue from '../../lib/blue.js';
import db from '../../lib/database.js';
import { extractMentions } from '../../lib/utils.js';

blue.bot({
  cmd: "unbanuser",
  desc: "Unban a user (Owner only)",
  fromMe: true,
  type: "owner",
  react: "✅",
  filename: import.meta.url,
  handler: async (sock, msg, args) => {
    const mentions = extractMentions(msg);
    
    if (mentions.length === 0) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Please mention a user to unban\nUsage: .unbanuser @user'
      }, { quoted: msg });
    }
    
    const target = mentions[0];
    await db.unbanUser(target);
    
    const text = `✅ *User Unbanned*\n\n` +
      `User: @${target.split('@')[0]}\n\n` +
      `This user can now use the bot again.`;
    
    await sock.sendMessage(msg.key.remoteJid, { 
      text,
      mentions: [target]
    }, { quoted: msg });
  }
});
