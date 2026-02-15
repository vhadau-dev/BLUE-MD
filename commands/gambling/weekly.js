import blue from '../../lib/blue.js';
import db from '../../lib/database.js';
import config from '../../config.js';
import { formatCurrency, checkCooldown, formatTime } from '../../lib/utils.js';

blue.bot({
  cmd: "weekly",
  desc: "Claim your weekly reward",
  fromMe: false,
  type: "gambling",
  react: "🎁",
  filename: import.meta.url,
  handler: async (sock, msg, args, { senderNumber }) => {
    const user = await db.getUser(senderNumber);
    
    const cooldown = checkCooldown(user.lastWeekly, config.WEEKLY_COOLDOWN);
    
    if (!cooldown.canUse) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: `⏰ Weekly reward already claimed!\n\nCome back in: ${formatTime(cooldown.remaining)}`
      }, { quoted: msg });
    }
    
    user.balance += config.WEEKLY_REWARD;
    user.lastWeekly = new Date();
    await user.save();
    
    const text = `🎁 *Weekly Reward Claimed!*\n\n` +
      `Reward: ${formatCurrency(config.WEEKLY_REWARD)}\n` +
      `New Balance: ${formatCurrency(user.balance)}\n\n` +
      `Come back in 7 days for your next reward!`;
    
    await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
  }
});
