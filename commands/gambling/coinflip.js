import blue from '../../lib/blue.js';
import db from '../../lib/database.js';
import { formatCurrency, validateBet, randomChoice } from '../../lib/utils.js';

blue.bot({
  cmd: "coinflip",
  desc: "Flip a coin and bet on heads or tails",
  fromMe: false,
  type: "gambling",
  react: "🪙",
  filename: import.meta.url,
  handler: async (sock, msg, args, { senderNumber }) => {
    const betAmount = parseInt(args[0]);
    const choice = args[1]?.toLowerCase();
    
    if (!betAmount || !choice) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Please specify bet amount and choice\nUsage: .coinflip <amount> <heads/tails>'
      }, { quoted: msg });
    }
    
    if (choice !== 'heads' && choice !== 'tails') {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Choice must be "heads" or "tails"'
      }, { quoted: msg });
    }
    
    const user = await db.getUser(senderNumber);
    const validation = validateBet(betAmount, user.balance);
    
    if (!validation.valid) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: validation.message
      }, { quoted: msg });
    }
    
    const result = randomChoice(['heads', 'tails']);
    const won = result === choice;
    const resultAmount = won ? betAmount : -betAmount;
    
    // Update user
    user.balance += resultAmount;
    user.totalGambled += betAmount;
    if (won) user.totalWins += 1;
    else user.totalLosses += 1;
    await user.save();
    
    const emoji = result === 'heads' ? '👑' : '🦅';
    
    const text = `🪙 *Coin Flip*\n\n` +
      `Your Choice: ${choice}\n` +
      `Result: ${emoji} ${result}\n\n` +
      (won
        ? `🎉 You Won!\n` +
          `Won: ${formatCurrency(betAmount)}\n` +
          `New Balance: ${formatCurrency(user.balance)}`
        : `😢 You Lost!\n` +
          `Lost: ${formatCurrency(betAmount)}\n` +
          `New Balance: ${formatCurrency(user.balance)}`);
    
    await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
  }
});
