import blue from '../../lib/blue.js';

blue.bot({
  cmd: "kick",
  desc: "Kick a user from the group",
  fromMe: "admin",
  type: "admin",
  handler: async (sock, msg) => {
    try {
      const groupId = msg.key.remoteJid;

      if (!groupId.endsWith('@g.us')) {
        return await sock.sendMessage(groupId, { 
          text: '❌ This command can only be used in groups' 
        });
      }

      const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
      
      if (!mentioned || mentioned.length === 0) {
        return await sock.sendMessage(groupId, { 
          text: '❌ Please mention a user to kick' 
        });
      }

      await sock.groupParticipantsUpdate(groupId, mentioned, 'remove');

      await sock.sendMessage(groupId, { 
        text: `✅ Kicked @${mentioned[0].split('@')[0]} from the group`,
        mentions: mentioned
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "promote",
  desc: "Promote user to admin",
  fromMe: "admin",
  type: "admin",
  handler: async (sock, msg) => {
    try {
      const groupId = msg.key.remoteJid;

      if (!groupId.endsWith('@g.us')) {
        return await sock.sendMessage(groupId, { 
          text: '❌ This command can only be used in groups' 
        });
      }

      const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
      
      if (!mentioned || mentioned.length === 0) {
        return await sock.sendMessage(groupId, { 
          text: '❌ Please mention a user to promote' 
        });
      }

      await sock.groupParticipantsUpdate(groupId, mentioned, 'promote');

      await sock.sendMessage(groupId, { 
        text: `✅ Promoted @${mentioned[0].split('@')[0]} to admin`,
        mentions: mentioned
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "demote",
  desc: "Demote admin to member",
  fromMe: "admin",
  type: "admin",
  handler: async (sock, msg) => {
    try {
      const groupId = msg.key.remoteJid;

      if (!groupId.endsWith('@g.us')) {
        return await sock.sendMessage(groupId, { 
          text: '❌ This command can only be used in groups' 
        });
      }

      const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
      
      if (!mentioned || mentioned.length === 0) {
        return await sock.sendMessage(groupId, { 
          text: '❌ Please mention a user to demote' 
        });
      }

      await sock.groupParticipantsUpdate(groupId, mentioned, 'demote');

      await sock.sendMessage(groupId, { 
        text: `✅ Demoted @${mentioned[0].split('@')[0]} to member`,
        mentions: mentioned
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});
