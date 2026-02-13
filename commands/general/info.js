import blue from '../../lib/blue.js';
import config from '../../config.js';
import os from 'os';

const startTime = Date.now();

blue.bot({
  cmd: "info",
  desc: "Get bot information",
  fromMe: "user",
  type: "general",
  handler: async (sock, msg) => {
    try {
      const info = `
╭━━━━━━━━━━━━━━━━━━━━╮
│  *${config.BOT_NAME} - BOT INFO*
╰━━━━━━━━━━━━━━━━━━━━╯

🤖 *Bot Name:* ${config.BOT_NAME}
👤 *Owner:* ${config.OWNER_NAME}
📌 *Prefix:* ${config.PREFIX}
📦 *Version:* 1.0.0
🔧 *Platform:* WhatsApp MD

🌐 *GitHub:* ${config.GITHUB_REPO}

━━━━━━━━━━━━━━━━━━━━
${config.STATUS_MESSAGE}
━━━━━━━━━━━━━━━━━━━━
      `.trim();

      await sock.sendMessage(msg.key.remoteJid, { text: info });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "uptime",
  desc: "Check bot uptime",
  fromMe: "user",
  type: "general",
  handler: async (sock, msg) => {
    try {
      const uptime = Date.now() - startTime;
      const seconds = Math.floor(uptime / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      const uptimeText = `
⏱️ *BOT UPTIME*

📅 Days: ${days}
🕐 Hours: ${hours % 24}
⏰ Minutes: ${minutes % 60}
⏱️ Seconds: ${seconds % 60}

✅ Bot is running smoothly!
      `.trim();

      await sock.sendMessage(msg.key.remoteJid, { text: uptimeText });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "stats",
  desc: "Get bot statistics",
  fromMe: "user",
  type: "general",
  handler: async (sock, msg) => {
    try {
      const commands = blue.getAllCommands();
      const groups = await sock.groupFetchAllParticipating();
      const groupCount = Object.keys(groups).length;

      const stats = `
📊 *BOT STATISTICS*

📝 Total Commands: ${commands.length}
👥 Active Groups: ${groupCount}
💾 Memory Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
⚡ Platform: ${os.platform()}
🖥️ CPU: ${os.cpus()[0].model}
      `.trim();

      await sock.sendMessage(msg.key.remoteJid, { text: stats });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "runtime",
  desc: "Check system runtime",
  fromMe: "user",
  type: "general",
  handler: async (sock, msg) => {
    try {
      const runtime = process.uptime();
      const seconds = Math.floor(runtime);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      const runtimeText = `
🖥️ *SYSTEM RUNTIME*

📅 Days: ${days}
🕐 Hours: ${hours % 24}
⏰ Minutes: ${minutes % 60}
⏱️ Seconds: ${seconds % 60}
      `.trim();

      await sock.sendMessage(msg.key.remoteJid, { text: runtimeText });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});
