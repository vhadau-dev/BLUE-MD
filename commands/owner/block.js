import blue from '../../lib/blue.js';

blue.bot({
  cmd: "block",
  desc: "Block a user from using the bot",
  fromMe: "owner",
  type: "owner",
  handler: async (sock, msg) => {
    try {
      const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
      
      if (!mentioned || mentioned.length === 0) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Please mention a user to block' 
        });
      }

      const userId = mentioned[0];
      await sock.updateBlockStatus(userId, 'block');

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `✅ @${userId.split('@')[0]} has been blocked`,
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
  cmd: "unblock",
  desc: "Unblock a user",
  fromMe: "owner",
  type: "owner",
  handler: async (sock, msg) => {
    try {
      const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
      
      if (!mentioned || mentioned.length === 0) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Please mention a user to unblock' 
        });
      }

      const userId = mentioned[0];
      await sock.updateBlockStatus(userId, 'unblock');

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `✅ @${userId.split('@')[0]} has been unblocked`,
        mentions: [userId]
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});
