import blue from '../../lib/blue.js';
import config from '../../config.js';

blue.bot({
  cmd: "menu",
  desc: "Display bot menu",
  fromMe: "user",
  type: "general",
  handler: async (sock, msg) => {
    try {
      const categories = {
        owner: '👑 Owner Commands',
        admin: '⚙️ Admin Commands',
        mods: '🛡️ Moderator Commands',
        general: '📱 General Commands',
        system: '🖥️ System Commands',
        fun: '🎮 Fun Commands',
        utility: '🔧 Utility Commands'
      };

      let menu = `
╭━━━━━━━━━━━━━━━━━━━━╮
│  *${config.BOT_NAME} - COMMAND MENU*
╰━━━━━━━━━━━━━━━━━━━━╯

📋 *Bot Information*
• Prefix: ${config.PREFIX}
• Owner: ${config.OWNER_NAME}
• Version: 1.0.0

`;

      for (const [category, title] of Object.entries(categories)) {
        const commands = blue.getCommandsByCategory(category);
        if (commands.length > 0) {
          menu += `\n${title}\n`;
          commands.forEach(cmd => {
            menu += `• ${config.PREFIX}${cmd.cmd} - ${cmd.desc}\n`;
          });
        }
      }

      menu += `\n━━━━━━━━━━━━━━━━━━━━
💡 Type ${config.PREFIX}help <command> for more info
━━━━━━━━━━━━━━━━━━━━`;

      if (config.MENU_IMAGE) {
        await sock.sendMessage(msg.key.remoteJid, { 
          image: { url: config.MENU_IMAGE },
          caption: menu 
        });
      } else {
        await sock.sendMessage(msg.key.remoteJid, { text: menu });
      }
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "help",
  desc: "Get help for a specific command",
  fromMe: "user",
  type: "general",
  handler: async (sock, msg, args) => {
    try {
      if (!args[0]) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: `❌ Usage: ${config.PREFIX}help <command>\n\nExample: ${config.PREFIX}help ping` 
        });
      }

      const cmdName = args[0].toLowerCase();
      const command = blue.getCommand(cmdName);

      if (!command) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: `❌ Command "${cmdName}" not found` 
        });
      }

      const helpText = `
📖 *COMMAND HELP*

• Command: ${config.PREFIX}${command.cmd}
• Description: ${command.desc}
• Category: ${command.category}
• Permission: ${command.permission}

Usage: ${config.PREFIX}${command.cmd}
      `.trim();

      await sock.sendMessage(msg.key.remoteJid, { text: helpText });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "ping",
  desc: "Check bot response time",
  fromMe: "user",
  type: "general",
  handler: async (sock, msg) => {
    try {
      const start = Date.now();
      await sock.sendMessage(msg.key.remoteJid, { text: '🏓 Pinging...' });
      const end = Date.now();
      const ping = end - start;

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `🏓 *Pong!*\n\n⚡ Response Time: ${ping}ms` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});
