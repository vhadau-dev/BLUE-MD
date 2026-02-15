import blue from '../../lib/blue.js';
import db from '../../lib/database.js';
import config from '../../config.js';
import { formatCurrency, extractMentions } from '../../lib/utils.js';

blue.bot({
  cmd: "resetbalance",
  desc: "Reset a user's balance (Owner only)",
  fromMe: true,
  type: "gambling",
  react: "🔄",
  filename: import.meta.url,
  handler: async (sock, msg, args) => {
    const mentions = extractMentions(msg);
    
    if (mentions.length === 0) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Please mention a user\nUsage: .resetbalance @user'
      }, { quoted: msg });
    }
    
    const target = mentions[0];
    const user = await db.getUser(target);
    
    user.balance = config.STARTING_BALANCE;
    user.totalWins = 0;
    user.totalLosses = 0;
    user.totalGambled = 0;
    user.lastDaily = null;
    user.lastWeekly = null;
    user.lastRob = null;
    await user.save();
    
    const text = `🔄 *Balance Reset*\n\n` +
      `User: @${target.split('@')[0]}\n` +
      `New Balance: ${formatCurrency(config.STARTING_BALANCE)}\n` +
      `All stats have been reset.`;
    
    await sock.sendMessage(msg.key.remoteJid, { 
      text,
      mentions: [target]
    }, { quoted: msg });
  }
});
