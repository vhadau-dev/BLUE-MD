import blue from '../../lib/blue.js';
import db from '../../lib/database.js';
import { formatCurrency, validateBet, random } from '../../lib/utils.js';

blue.bot({
  cmd: "gamble",
  desc: "Gamble with variable multipliers (1.5x-3x)",
  fromMe: false,
  type: "gambling",
  react: "🎰",
  filename: import.meta.url,
  handler: async (sock, msg, args, { senderNumber }) => {
    const betAmount = parseInt(args[0]);
    
    if (!betAmount) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Please specify a bet amount\nUsage: .gamble <amount>'
      }, { quoted: msg });
    }
    
    const user = await db.getUser(senderNumber);
    const validation = validateBet(betAmount, user.balance);
    
    if (!validation.valid) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: validation.message
      }, { quoted: msg });
    }
    
    // 45% win chance with variable multiplier
    const won = Math.random() < 0.45;
    let resultAmount;
    let multiplier = 0;
    
    if (won) {
      multiplier = (random(15, 30) / 10); // 1.5x to 3.0x
      resultAmount = Math.floor(betAmount * multiplier) - betAmount;
    } else {
      resultAmount = -betAmount;
    }
    
    // Update user
    user.balance += resultAmount;
    user.totalGambled += betAmount;
    if (won) {
      user.totalWins += 1;
    } else {
      user.totalLosses += 1;
    }
    await user.save();
    
    const text = won
      ? `🎉 *Jackpot!*\n\n` +
        `Multiplier: ${multiplier.toFixed(1)}x\n` +
        `Bet: ${formatCurrency(betAmount)}\n` +
        `Won: ${formatCurrency(resultAmount)}\n` +
        `New Balance: ${formatCurrency(user.balance)}`
      : `😢 *Better Luck Next Time!*\n\n` +
        `Bet: ${formatCurrency(betAmount)}\n` +
        `Lost: ${formatCurrency(betAmount)}\n` +
        `New Balance: ${formatCurrency(user.balance)}`;
    
    await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
  }
});
