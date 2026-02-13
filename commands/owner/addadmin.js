import blue from '../../lib/blue.js';
import config from '../../config.js';

blue.bot({
  cmd: "addadmin",
  desc: "Add user as admin",
  fromMe: "owner",
  type: "owner",
  handler: async (sock, msg, args) => {
    try {
      const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
      
      if (!mentioned || mentioned.length === 0) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Please mention a user to add as admin' 
        });
      }

      const userId = mentioned[0];
      
      if (config.ADMIN_NUMBERS.includes(userId)) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '⚠️ User is already an admin' 
        });
      }

      config.ADMIN_NUMBERS.push(userId);

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `✅ @${userId.split('@')[0]} has been added as admin`,
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
  cmd: "addmod",
  desc: "Add user as moderator",
  fromMe: "owner",
  type: "owner",
  handler: async (sock, msg, args) => {
    try {
      const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
      
      if (!mentioned || mentioned.length === 0) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Please mention a user to add as moderator' 
        });
      }

      const userId = mentioned[0];
      
      if (config.MOD_NUMBERS.includes(userId)) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '⚠️ User is already a moderator' 
        });
      }

      config.MOD_NUMBERS.push(userId);

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `✅ @${userId.split('@')[0]} has been added as moderator`,
        mentions: [userId]
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});
