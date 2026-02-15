import blue from '../../lib/blue.js';
import db from '../../lib/database.js';
import { formatCurrency, extractMentions } from '../../lib/utils.js';

blue.bot({
  cmd: "give",
  desc: "Give money to another user",
  fromMe: false,
  type: "gambling",
  react: "💸",
  filename: import.meta.url,
  handler: async (sock, msg, args, { senderNumber }) => {
    const amount = parseInt(args[0]);
    const mentions = extractMentions(msg);
    
    if (!amount || mentions.length === 0) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Please specify amount and mention a user\nUsage: .give <amount> @user'
      }, { quoted: msg });
    }
    
    const recipient = mentions[0];
    
    if (recipient === senderNumber) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ You cannot give money to yourself'
      }, { quoted: msg });
    }
    
    if (amount < 1) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Amount must be at least 1'
      }, { quoted: msg });
    }
    
    const sender = await db.getUser(senderNumber);
    
    if (sender.balance < amount) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: `❌ Insufficient balance. You have ${formatCurrency(sender.balance)}`
      }, { quoted: msg });
    }
    
    const recipientUser = await db.getUser(recipient);
    
    sender.balance -= amount;
    recipientUser.balance += amount;
    
    await sender.save();
    await recipientUser.save();
    
    const text = `💸 *Transfer Successful*\n\n` +
      `Amount: ${formatCurrency(amount)}\n` +
      `To: @${recipient.split('@')[0]}\n` +
      `Your New Balance: ${formatCurrency(sender.balance)}`;
    
    await sock.sendMessage(msg.key.remoteJid, { 
      text,
      mentions: [recipient]
    }, { quoted: msg });
  }
});
