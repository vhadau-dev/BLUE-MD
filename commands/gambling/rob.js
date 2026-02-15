import blue from '../../lib/blue.js';
import db from '../../lib/database.js';
import config from '../../config.js';
import { formatCurrency, extractMentions, checkCooldown, formatTime, random } from '../../lib/utils.js';

blue.bot({
  cmd: "rob",
  desc: "Attempt to rob another user",
  fromMe: false,
  type: "gambling",
  react: "🔫",
  filename: import.meta.url,
  handler: async (sock, msg, args, { senderNumber }) => {
    const mentions = extractMentions(msg);
    
    if (mentions.length === 0) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Please mention a user to rob\nUsage: .rob @user'
      }, { quoted: msg });
    }
    
    const target = mentions[0];
    
    if (target === senderNumber) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ You cannot rob yourself'
      }, { quoted: msg });
    }
    
    const robber = await db.getUser(senderNumber);
    
    // Check cooldown
    const cooldown = checkCooldown(robber.lastRob, config.ROB_COOLDOWN);
    if (!cooldown.canUse) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: `⏰ Rob cooldown active!\n\nTry again in: ${formatTime(cooldown.remaining)}`
      }, { quoted: msg });
    }
    
    const victim = await db.getUser(target);
    
    if (victim.balance < 100) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Target has insufficient balance to rob (minimum 100)'
      }, { quoted: msg });
    }
    
    // 40% success rate
    const success = Math.random() < 0.4;
    const amount = Math.floor(victim.balance * (random(10, 30) / 100)); // 10-30% of victim's balance
    
    if (success) {
      robber.balance += amount;
      victim.balance -= amount;
      robber.lastRob = new Date();
      
      await robber.save();
      await victim.save();
      
      const text = `🔫 *Robbery Successful!*\n\n` +
        `You robbed ${formatCurrency(amount)} from @${target.split('@')[0]}\n` +
        `Your New Balance: ${formatCurrency(robber.balance)}`;
      
      await sock.sendMessage(msg.key.remoteJid, { 
        text,
        mentions: [target]
      }, { quoted: msg });
    } else {
      // Failed - pay fine
      const fine = Math.floor(robber.balance * 0.1); // 10% fine
      robber.balance -= fine;
      robber.lastRob = new Date();
      await robber.save();
      
      const text = `❌ *Robbery Failed!*\n\n` +
        `You got caught and paid a fine of ${formatCurrency(fine)}\n` +
        `Your New Balance: ${formatCurrency(robber.balance)}`;
      
      await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
    }
  }
});
