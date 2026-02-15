import blue from '../../lib/blue.js';
import db from '../../lib/database.js';
import { extractMentions } from '../../lib/utils.js';

blue.bot({
  cmd: "banuser",
  desc: "Ban a user from using the bot (Owner only)",
  fromMe: true,
  type: "owner",
  react: "🔨",
  filename: import.meta.url,
  handler: async (sock, msg, args) => {
    const mentions = extractMentions(msg);
    
    if (mentions.length === 0) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Please mention a user to ban\nUsage: .banuser @user [reason]'
      }, { quoted: msg });
    }
    
    const target = mentions[0];
    const reason = args.join(' ') || 'No reason provided';
    
    await db.banUser(target, reason);
    
    const text = `🔨 *User Banned*\n\n` +
      `User: @${target.split('@')[0]}\n` +
      `Reason: ${reason}\n\n` +
      `This user can no longer use the bot.`;
    
    await sock.sendMessage(msg.key.remoteJid, { 
      text,
      mentions: [target]
    }, { quoted: msg });
  }
});
