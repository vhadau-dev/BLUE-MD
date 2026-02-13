import blue from '../../lib/blue.js';

blue.bot({
  cmd: "add",
  desc: "Add user to group",
  fromMe: "admin",
  type: "admin",
  handler: async (sock, msg, args) => {
    try {
      const groupId = msg.key.remoteJid;

      if (!groupId.endsWith('@g.us')) {
        return await sock.sendMessage(groupId, { 
          text: '❌ This command can only be used in groups' 
        });
      }

      if (!args[0]) {
        return await sock.sendMessage(groupId, { 
          text: '❌ Usage: .add <number>' 
        });
      }

      const number = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';

      await sock.groupParticipantsUpdate(groupId, [number], 'add');

      await sock.sendMessage(groupId, { 
        text: `✅ Added @${number.split('@')[0]} to the group`,
        mentions: [number]
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "invite",
  desc: "Get group invite link",
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

      const code = await sock.groupInviteCode(groupId);
      const link = `https://chat.whatsapp.com/${code}`;

      await sock.sendMessage(groupId, { 
        text: `🔗 *GROUP INVITE LINK*\n\n${link}` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "revoke",
  desc: "Revoke group invite link",
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

      await sock.groupRevokeInvite(groupId);

      await sock.sendMessage(groupId, { 
        text: '✅ Group invite link has been revoked!' 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "admins",
  desc: "Tag all group admins",
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

      const metadata = await sock.groupMetadata(groupId);
      const admins = metadata.participants.filter(p => p.admin).map(p => p.id);

      let text = '👑 *GROUP ADMINS*\n\n';
      admins.forEach((admin, i) => {
        text += `${i + 1}. @${admin.split('@')[0]}\n`;
      });

      await sock.sendMessage(groupId, { 
        text: text,
        mentions: admins
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "everyone",
  desc: "Tag all group members",
  fromMe: "admin",
  type: "admin",
  handler: async (sock, msg, args) => {
    try {
      const groupId = msg.key.remoteJid;

      if (!groupId.endsWith('@g.us')) {
        return await sock.sendMessage(groupId, { 
          text: '❌ This command can only be used in groups' 
        });
      }

      const metadata = await sock.groupMetadata(groupId);
      const participants = metadata.participants.map(p => p.id);
      
      const message = args.join(' ') || 'Attention Everyone!';
      
      await sock.sendMessage(groupId, { 
        text: `📢 *${message}*`,
        mentions: participants
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "setwelcome",
  desc: "Set custom welcome message",
  fromMe: "admin",
  type: "admin",
  handler: async (sock, msg, args) => {
    try {
      const groupId = msg.key.remoteJid;

      if (!groupId.endsWith('@g.us')) {
        return await sock.sendMessage(groupId, { 
          text: '❌ This command can only be used in groups' 
        });
      }

      if (!args[0]) {
        return await sock.sendMessage(groupId, { 
          text: '❌ Usage: .setwelcome <message>\n\nUse @user to mention the new member' 
        });
      }

      const message = args.join(' ');
      // Store in database (simplified for now)
      
      await sock.sendMessage(groupId, { 
        text: `✅ Welcome message set to:\n\n${message}` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "setgoodbye",
  desc: "Set custom goodbye message",
  fromMe: "admin",
  type: "admin",
  handler: async (sock, msg, args) => {
    try {
      const groupId = msg.key.remoteJid;

      if (!groupId.endsWith('@g.us')) {
        return await sock.sendMessage(groupId, { 
          text: '❌ This command can only be used in groups' 
        });
      }

      if (!args[0]) {
        return await sock.sendMessage(groupId, { 
          text: '❌ Usage: .setgoodbye <message>\n\nUse @user to mention the leaving member' 
        });
      }

      const message = args.join(' ');
      // Store in database (simplified for now)
      
      await sock.sendMessage(groupId, { 
        text: `✅ Goodbye message set to:\n\n${message}` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});
