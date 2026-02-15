import blue from '../../lib/blue.js';
import db from '../../lib/database.js';
import { formatCurrency, formatPhone } from '../../lib/utils.js';

blue.bot({
  cmd: "leaderboard",
  desc: "View top 10 richest users",
  fromMe: false,
  type: "gambling",
  react: "🏆",
  filename: import.meta.url,
  handler: async (sock, msg, args) => {
    const topUsers = await db.getLeaderboard(10);
    
    if (topUsers.length === 0) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ No users found in leaderboard'
      }, { quoted: msg });
    }
    
    let text = '🏆 *Top 10 Richest Users*\n\n';
    
    topUsers.forEach((user, index) => {
      const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`;
      const phone = formatPhone(user.jid);
      text += `${medal} @${phone}\n`;
      text += `   Balance: ${formatCurrency(user.balance)}\n\n`;
    });
    
    const mentions = topUsers.map(u => u.jid);
    
    await sock.sendMessage(msg.key.remoteJid, { 
      text,
      mentions 
    }, { quoted: msg });
  }
});
