import blue from '../../lib/blue.js';
import db from '../../lib/database.js';
import { formatCurrency, validateBet, random } from '../../lib/utils.js';

blue.bot({
  cmd: "bet",
  desc: "Place a bet with 50/50 odds",
  fromMe: false,
  type: "gambling",
  react: "🎲",
  filename: import.meta.url,
  handler: async (sock, msg, args, { senderNumber }) => {
    const betAmount = parseInt(args[0]);
    
    if (!betAmount) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Please specify a bet amount\nUsage: .bet <amount>'
      }, { quoted: msg });
    }
    
    const user = await db.getUser(senderNumber);
    const validation = validateBet(betAmount, user.balance);
    
    if (!validation.valid) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: validation.message
      }, { quoted: msg });
    }
    
    // 50/50 chance
    const won = Math.random() < 0.5;
    const resultAmount = won ? betAmount : -betAmount;
    
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
      ? `🎉 *You Won!*\n\n` +
        `Bet: ${formatCurrency(betAmount)}\n` +
        `Won: ${formatCurrency(betAmount)}\n` +
        `New Balance: ${formatCurrency(user.balance)}`
      : `😢 *You Lost!*\n\n` +
        `Bet: ${formatCurrency(betAmount)}\n` +
        `Lost: ${formatCurrency(betAmount)}\n` +
        `New Balance: ${formatCurrency(user.balance)}`;
    
    await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
  }
});
