import blue from '../../lib/blue.js';
import db from '../../lib/database.js';
import config from '../../config.js';
import { formatCurrency, checkCooldown, formatTime } from '../../lib/utils.js';

blue.bot({
  cmd: "daily",
  desc: "Claim your daily reward",
  fromMe: false,
  type: "gambling",
  react: "🎁",
  filename: import.meta.url,
  handler: async (sock, msg, args, { senderNumber }) => {
    const user = await db.getUser(senderNumber);
    
    const cooldown = checkCooldown(user.lastDaily, config.DAILY_COOLDOWN);
    
    if (!cooldown.canUse) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: `⏰ Daily reward already claimed!\n\nCome back in: ${formatTime(cooldown.remaining)}`
      }, { quoted: msg });
    }
    
    user.balance += config.DAILY_REWARD;
    user.lastDaily = new Date();
    await user.save();
    
    const text = `🎁 *Daily Reward Claimed!*\n\n` +
      `Reward: ${formatCurrency(config.DAILY_REWARD)}\n` +
      `New Balance: ${formatCurrency(user.balance)}\n\n` +
      `Come back in 24 hours for your next reward!`;
    
    await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
  }
});
