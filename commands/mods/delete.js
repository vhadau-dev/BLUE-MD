import blue from '../../lib/blue.js';

blue.bot({
  cmd: "delete",
  desc: "Delete a message (reply to message)",
  fromMe: "mod",
  type: "mods",
  handler: async (sock, msg) => {
    try {
      const quotedMsg = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      
      if (!quotedMsg) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Please reply to a message to delete it' 
        });
      }

      const messageKey = {
        remoteJid: msg.key.remoteJid,
        fromMe: false,
        id: msg.message.extendedTextMessage.contextInfo.stanzaId,
        participant: msg.message.extendedTextMessage.contextInfo.participant
      };

      await sock.sendMessage(msg.key.remoteJid, { delete: messageKey });
      
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '✅ Message deleted' 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "tagall",
  desc: "Tag all group members",
  fromMe: "mod",
  type: "mods",
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
      
      const message = args.join(' ') || 'Group Announcement';
      
      let text = `📢 *${message}*\n\n`;
      participants.forEach((p, i) => {
        text += `${i + 1}. @${p.split('@')[0]}\n`;
      });

      await sock.sendMessage(groupId, { 
        text: text,
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
  cmd: "hidetag",
  desc: "Send message with hidden tag",
  fromMe: "mod",
  type: "mods",
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
          text: '❌ Please provide a message' 
        });
      }

      const metadata = await sock.groupMetadata(groupId);
      const participants = metadata.participants.map(p => p.id);
      
      const message = args.join(' ');

      await sock.sendMessage(groupId, { 
        text: message,
        mentions: participants
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});
