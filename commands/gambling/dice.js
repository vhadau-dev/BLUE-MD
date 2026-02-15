import blue from '../../lib/blue.js';
import db from '../../lib/database.js';
import { formatCurrency, validateBet, random } from '../../lib/utils.js';

blue.bot({
  cmd: "dice",
  desc: "Roll a dice and bet on the outcome (1-6)",
  fromMe: false,
  type: "gambling",
  react: "🎲",
  filename: import.meta.url,
  handler: async (sock, msg, args, { senderNumber }) => {
    const betAmount = parseInt(args[0]);
    const guess = parseInt(args[1]);
    
    if (!betAmount || !guess) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Please specify bet amount and guess (1-6)\nUsage: .dice <amount> <guess>'
      }, { quoted: msg });
    }
    
    if (guess < 1 || guess > 6) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Guess must be between 1 and 6'
      }, { quoted: msg });
    }
    
    const user = await db.getUser(senderNumber);
    const validation = validateBet(betAmount, user.balance);
    
    if (!validation.valid) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: validation.message
      }, { quoted: msg });
    }
    
    const roll = random(1, 6);
    const won = roll === guess;
    const resultAmount = won ? betAmount * 5 : -betAmount;
    
    // Update user
    user.balance += resultAmount;
    user.totalGambled += betAmount;
    if (won) user.totalWins += 1;
    else user.totalLosses += 1;
    await user.save();
    
    const text = `🎲 *Dice Roll*\n\n` +
      `Your Guess: ${guess}\n` +
      `Rolled: ${roll}\n\n` +
      (won
        ? `🎉 You Won! (6x multiplier)\n` +
          `Won: ${formatCurrency(betAmount * 5)}\n` +
          `New Balance: ${formatCurrency(user.balance)}`
        : `😢 You Lost!\n` +
          `Lost: ${formatCurrency(betAmount)}\n` +
          `New Balance: ${formatCurrency(user.balance)}`);
    
    await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
  }
});
