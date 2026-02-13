import blue from '../../lib/blue.js';
import config from '../../config.js';
import chatbot from '../../lib/chatbot.js';

blue.bot({
  cmd: "chatbot",
  desc: "Toggle AI chatbot on/off (Owner/Mods only)",
  fromMe: "mod",
  type: "owner",
  handler: async (sock, msg, args) => {
    try {
      const action = args[0]?.toLowerCase();

      if (!action || !['on', 'off'].includes(action)) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: `❌ Usage: ${config.PREFIX}chatbot on/off\n\nCurrent status: ${config.CHATBOT_ENABLED ? 'ON' : 'OFF'}` 
        });
      }

      config.CHATBOT_ENABLED = action === 'on';

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `✅ AI Chatbot ${action === 'on' ? 'enabled' : 'disabled'}!\n\n${action === 'on' ? '🤖 Bot will now respond to all messages that don\'t start with a command.' : '⏸️ Bot will only respond to commands.'}` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "clearchat",
  desc: "Clear AI chatbot conversation history",
  fromMe: "user",
  type: "owner",
  handler: async (sock, msg) => {
    try {
      const userId = msg.key.participant || msg.key.remoteJid;
      chatbot.clearHistory(userId);

      await sock.sendMessage(msg.key.remoteJid, { 
        text: '✅ Your conversation history has been cleared!' 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "clearallchats",
  desc: "Clear all AI chatbot conversation histories (Owner only)",
  fromMe: "owner",
  type: "owner",
  handler: async (sock, msg) => {
    try {
      chatbot.clearAllHistory();

      await sock.sendMessage(msg.key.remoteJid, { 
        text: '✅ All conversation histories have been cleared!' 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "ai",
  desc: "Chat with AI (alternative command)",
  fromMe: "user",
  type: "general",
  handler: async (sock, msg, args) => {
    try {
      if (!args[0]) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: `❌ Usage: ${config.PREFIX}ai <your message>` 
        });
      }

      if (!chatbot.isEnabled()) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ AI Chatbot is currently disabled!' 
        });
      }

      const userId = msg.key.participant || msg.key.remoteJid;
      const userMessage = args.join(' ');

      await sock.sendMessage(msg.key.remoteJid, { 
        text: '🤖 Thinking...' 
      });

      const response = await chatbot.chat(userId, userMessage);

      if (!response) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Failed to get AI response. Please try again!' 
        });
      }

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `🤖 *${config.BOT_NAME} AI*\n\n${response}` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});
