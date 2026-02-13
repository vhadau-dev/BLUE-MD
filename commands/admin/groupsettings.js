import blue from '../../lib/blue.js';

blue.bot({
  cmd: "groupinfo",
  desc: "Get group information",
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
      
      const info = `
📋 *GROUP INFORMATION*

👥 *Name:* ${metadata.subject}
📝 *Description:* ${metadata.desc || 'No description'}
👤 *Owner:* @${metadata.owner.split('@')[0]}
👥 *Participants:* ${metadata.participants.length}
📅 *Created:* ${new Date(metadata.creation * 1000).toLocaleDateString()}
🔒 *Restrict:* ${metadata.restrict ? 'Yes' : 'No'}
📢 *Announce:* ${metadata.announce ? 'Yes' : 'No'}
      `.trim();

      await sock.sendMessage(groupId, { 
        text: info,
        mentions: [metadata.owner]
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "setname",
  desc: "Change group name",
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
          text: '❌ Please provide a new group name' 
        });
      }

      const newName = args.join(' ');
      await sock.groupUpdateSubject(groupId, newName);

      await sock.sendMessage(groupId, { 
        text: `✅ Group name changed to: *${newName}*` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "setdesc",
  desc: "Change group description",
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
          text: '❌ Please provide a new group description' 
        });
      }

      const newDesc = args.join(' ');
      await sock.groupUpdateDescription(groupId, newDesc);

      await sock.sendMessage(groupId, { 
        text: `✅ Group description updated!` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "lock",
  desc: "Lock group (only admins can send messages)",
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

      await sock.groupSettingUpdate(groupId, 'announcement');

      await sock.sendMessage(groupId, { 
        text: '🔒 Group locked! Only admins can send messages.' 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "unlock",
  desc: "Unlock group (all members can send messages)",
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

      await sock.groupSettingUpdate(groupId, 'not_announcement');

      await sock.sendMessage(groupId, { 
        text: '🔓 Group unlocked! All members can send messages.' 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});
