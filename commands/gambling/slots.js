import blue from '../../lib/blue.js';
import db from '../../lib/database.js';
import { formatCurrency, validateBet, randomChoice } from '../../lib/utils.js';

blue.bot({
  cmd: "slots",
  desc: "Play slot machine",
  fromMe: false,
  type: "gambling",
  react: "🎰",
  filename: import.meta.url,
  handler: async (sock, msg, args, { senderNumber }) => {
    const betAmount = parseInt(args[0]);
    
    if (!betAmount) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Please specify a bet amount\nUsage: .slots <amount>'
      }, { quoted: msg });
    }
    
    const user = await db.getUser(senderNumber);
    const validation = validateBet(betAmount, user.balance);
    
    if (!validation.valid) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: validation.message
      }, { quoted: msg });
    }
    
    const symbols = ['🍒', '🍋', '🍊', '🍇', '⭐', '💎', '7️⃣'];
    const slot1 = randomChoice(symbols);
    const slot2 = randomChoice(symbols);
    const slot3 = randomChoice(symbols);
    
    let multiplier = 0;
    let won = false;
    
    // Check winning conditions
    if (slot1 === slot2 && slot2 === slot3) {
      // All three match
      if (slot1 === '💎') multiplier = 10;
      else if (slot1 === '7️⃣') multiplier = 7;
      else if (slot1 === '⭐') multiplier = 5;
      else multiplier = 3;
      won = true;
    } else if (slot1 === slot2 || slot2 === slot3 || slot1 === slot3) {
      // Two match
      multiplier = 1.5;
      won = true;
    }
    
    const resultAmount = won ? Math.floor(betAmount * multiplier) - betAmount : -betAmount;
    
    // Update user
    user.balance += resultAmount;
    user.totalGambled += betAmount;
    if (won) user.totalWins += 1;
    else user.totalLosses += 1;
    await user.save();
    
    const text = `🎰 *Slot Machine*\n\n` +
      `[ ${slot1} | ${slot2} | ${slot3} ]\n\n` +
      (won
        ? `🎉 You Won! (${multiplier}x)\n` +
          `Won: ${formatCurrency(resultAmount)}\n` +
          `New Balance: ${formatCurrency(user.balance)}`
        : `😢 No Match!\n` +
          `Lost: ${formatCurrency(betAmount)}\n` +
          `New Balance: ${formatCurrency(user.balance)}`);
    
    await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
  }
});
