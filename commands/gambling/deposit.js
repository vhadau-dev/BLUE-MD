import blue from '../../lib/blue.js';
import { formatCurrency } from '../../lib/utils.js';

blue.bot({
  cmd: "deposit",
  desc: "Deposit money to your bank (placeholder)",
  fromMe: false,
  type: "gambling",
  react: "🏦",
  filename: import.meta.url,
  handler: async (sock, msg, args) => {
    const text = `🏦 *Bank Deposit*\n\n` +
      `This feature is coming soon!\n` +
      `You'll be able to safely store your ${formatCurrency(0).split(' ')[0]} in the bank.`;
    
    await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
  }
});
