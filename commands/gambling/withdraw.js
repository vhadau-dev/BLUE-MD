import blue from '../../lib/blue.js';
import { formatCurrency } from '../../lib/utils.js';

blue.bot({
  cmd: "withdraw",
  desc: "Withdraw money from your bank (placeholder)",
  fromMe: false,
  type: "gambling",
  react: "🏦",
  filename: import.meta.url,
  handler: async (sock, msg, args) => {
    const text = `🏦 *Bank Withdrawal*\n\n` +
      `This feature is coming soon!\n` +
      `You'll be able to withdraw your ${formatCurrency(0).split(' ')[0]} from the bank.`;
    
    await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
  }
});
