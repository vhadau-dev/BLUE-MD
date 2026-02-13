import blue from '../../lib/blue.js';
import config from '../../config.js';
import db from '../../lib/database.js';
import os from 'os';

blue.bot({
  cmd: "profile",
  desc: "Get user profile information",
  fromMe: "user",
  type: "system",
  handler: async (sock, msg) => {
    try {
      const userId = msg.key.participant || msg.key.remoteJid;
      const userData = await db.getUserData(userId);
      const role = blue.getUserRole(userId);

      const profile = `
👤 *USER PROFILE*

📱 Number: @${userId.split('@')[0]}
👑 Role: ${role}
💬 Messages: ${userData.messageCount || 0}
⚡ Commands Used: ${userData.commandCount || 0}
📅 Joined: ${new Date(userData.joinedAt || Date.now()).toLocaleDateString()}
      `.trim();

      await sock.sendMessage(msg.key.remoteJid, { 
        text: profile,
        mentions: [userId]
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "status",
  desc: "Get bot system status",
  fromMe: "user",
  type: "system",
  handler: async (sock, msg) => {
    try {
      const totalMem = os.totalmem();
      const freeMem = os.freemem();
      const usedMem = totalMem - freeMem;
      const memUsage = ((usedMem / totalMem) * 100).toFixed(2);

      const status = `
🖥️ *SYSTEM STATUS*

💾 Memory Usage: ${memUsage}%
📊 Total Memory: ${(totalMem / 1024 / 1024 / 1024).toFixed(2)} GB
📈 Used Memory: ${(usedMem / 1024 / 1024 / 1024).toFixed(2)} GB
📉 Free Memory: ${(freeMem / 1024 / 1024 / 1024).toFixed(2)} GB
🖥️ Platform: ${os.platform()}
⚙️ CPU Cores: ${os.cpus().length}
⏱️ Uptime: ${(os.uptime() / 3600).toFixed(2)} hours
      `.trim();

      await sock.sendMessage(msg.key.remoteJid, { text: status });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "speed",
  desc: "Test bot response speed",
  fromMe: "user",
  type: "system",
  handler: async (sock, msg) => {
    try {
      const start = Date.now();
      const sent = await sock.sendMessage(msg.key.remoteJid, { text: '⚡ Testing speed...' });
      const end = Date.now();
      
      const speed = end - start;

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `⚡ *SPEED TEST*\n\nResponse Time: ${speed}ms` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "listgroups",
  desc: "List all bot groups",
  fromMe: "user",
  type: "system",
  handler: async (sock, msg) => {
    try {
      const groups = await sock.groupFetchAllParticipating();
      const groupList = Object.values(groups);

      let text = `📋 *BOT GROUPS* (${groupList.length})\n\n`;
      
      groupList.forEach((group, index) => {
        text += `${index + 1}. ${group.subject}\n`;
        text += `   👥 ${group.participants.length} members\n\n`;
      });

      await sock.sendMessage(msg.key.remoteJid, { text: text });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "repo",
  desc: "Get bot repository link",
  fromMe: "user",
  type: "system",
  handler: async (sock, msg) => {
    try {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `📦 *REPOSITORY*\n\n${config.GITHUB_REPO}\n\n⭐ Star the repo if you like it!` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "owner",
  desc: "Get owner contact",
  fromMe: "user",
  type: "system",
  handler: async (sock, msg) => {
    try {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `👤 *OWNER*\n\nName: ${config.OWNER_NAME}\n\n📞 Contact: wa.me/${config.OWNER_NUMBER[0]}` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "support",
  desc: "Get support information",
  fromMe: "user",
  type: "system",
  handler: async (sock, msg) => {
    try {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `💬 *SUPPORT*\n\nFor support and updates:\n\n📦 GitHub: ${config.GITHUB_REPO}\n👤 Owner: ${config.OWNER_NAME}\n\nJoin our support group for help!` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});
