import blue from '../../lib/blue.js';
import db from '../../lib/database.js';
import config from '../../config.js';

blue.bot({
  cmd: "warn",
  desc: "Warn a user",
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

      const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
      
      if (!mentioned || mentioned.length === 0) {
        return await sock.sendMessage(groupId, { 
          text: '❌ Please mention a user to warn' 
        });
      }

      const userId = mentioned[0];
      const reason = args.slice(1).join(' ') || 'No reason provided';
      
      const warnings = await db.addWarning(userId, groupId);

      let message = `⚠️ *WARNING*\n\n@${userId.split('@')[0]} has been warned!\n\n📝 Reason: ${reason}\n⚠️ Warnings: ${warnings}/${config.MAX_WARNINGS}`;

      if (warnings >= config.MAX_WARNINGS) {
        await sock.groupParticipantsUpdate(groupId, [userId], 'remove');
        message += '\n\n❌ Maximum warnings reached! User has been kicked.';
        await db.resetWarnings(userId, groupId);
      }

      await sock.sendMessage(groupId, { 
        text: message,
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
  cmd: "resetwarn",
  desc: "Reset user warnings",
  fromMe: "mod",
  type: "mods",
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
          text: '❌ Please mention a user to reset warnings' 
        });
      }

      const userId = mentioned[0];
      await db.resetWarnings(userId, groupId);

      await sock.sendMessage(groupId, { 
        text: `✅ Warnings reset for @${userId.split('@')[0]}`,
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
  cmd: "warnings",
  desc: "Check user warnings",
  fromMe: "mod",
  type: "mods",
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
          text: '❌ Please mention a user to check warnings' 
        });
      }

      const userId = mentioned[0];
      const warnings = await db.getWarnings(userId, groupId);

      await sock.sendMessage(groupId, { 
        text: `⚠️ @${userId.split('@')[0]} has ${warnings}/${config.MAX_WARNINGS} warnings`,
        mentions: [userId]
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});
