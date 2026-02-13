import blue from '../../lib/blue.js';

blue.bot({
  cmd: "join",
  desc: "Join a group via invite link",
  fromMe: "owner",
  type: "owner",
  handler: async (sock, msg, args) => {
    try {
      if (!args[0]) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Please provide a group invite link' 
        });
      }

      const link = args[0];
      const code = link.split('/').pop();

      await sock.groupAcceptInvite(code);

      await sock.sendMessage(msg.key.remoteJid, { 
        text: '✅ Successfully joined the group!' 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Failed to join group: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "leave",
  desc: "Leave current group",
  fromMe: "owner",
  type: "owner",
  handler: async (sock, msg) => {
    try {
      const groupId = msg.key.remoteJid;

      if (!groupId.endsWith('@g.us')) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ This command can only be used in groups' 
        });
      }

      await sock.sendMessage(groupId, { 
        text: '👋 Goodbye! Bot is leaving the group.' 
      });

      await sock.groupLeave(groupId);
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});
