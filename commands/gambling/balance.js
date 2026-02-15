import blue from '../../lib/blue.js';
import db from '../../lib/database.js';
import { formatCurrency } from '../../lib/utils.js';

blue.bot({
  cmd: "balance",
  desc: "Check your current balance",
  fromMe: false,
  type: "gambling",
  react: "💰",
  filename: import.meta.url,
  handler: async (sock, msg, args, { senderNumber }) => {
    const user = await db.getUser(senderNumber);
    
    const text = `💰 *Your Balance*\n\n` +
      `Balance: ${formatCurrency(user.balance)}\n` +
      `Total Wins: ${user.totalWins}\n` +
      `Total Losses: ${user.totalLosses}\n` +
      `Total Gambled: ${formatCurrency(user.totalGambled)}`;
    
    await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
  }
});
