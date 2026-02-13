import blue from '../../lib/blue.js';
import db from '../../lib/database.js';

blue.bot({
  cmd: "antilink",
  desc: "Enable/disable anti-link protection",
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

      const action = args[0]?.toLowerCase();

      if (!action || !['on', 'off'].includes(action)) {
        return await sock.sendMessage(groupId, { 
          text: '❌ Usage: .antilink on/off' 
        });
      }

      const settings = await db.getGroupSettings(groupId);
      settings.antilink = action === 'on';
      await db.updateGroupSettings(groupId, settings);

      await sock.sendMessage(groupId, { 
        text: `✅ Anti-link protection ${action === 'on' ? 'enabled' : 'disabled'}` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "antibadword",
  desc: "Enable/disable bad word filter",
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

      const action = args[0]?.toLowerCase();

      if (!action || !['on', 'off'].includes(action)) {
        return await sock.sendMessage(groupId, { 
          text: '❌ Usage: .antibadword on/off' 
        });
      }

      const settings = await db.getGroupSettings(groupId);
      settings.antibadword = action === 'on';
      await db.updateGroupSettings(groupId, settings);

      await sock.sendMessage(groupId, { 
        text: `✅ Bad word filter ${action === 'on' ? 'enabled' : 'disabled'}` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "welcome",
  desc: "Enable/disable welcome messages",
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

      const action = args[0]?.toLowerCase();

      if (!action || !['on', 'off'].includes(action)) {
        return await sock.sendMessage(groupId, { 
          text: '❌ Usage: .welcome on/off' 
        });
      }

      const settings = await db.getGroupSettings(groupId);
      settings.welcome = action === 'on';
      await db.updateGroupSettings(groupId, settings);

      await sock.sendMessage(groupId, { 
        text: `✅ Welcome messages ${action === 'on' ? 'enabled' : 'disabled'}` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "goodbye",
  desc: "Enable/disable goodbye messages",
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

      const action = args[0]?.toLowerCase();

      if (!action || !['on', 'off'].includes(action)) {
        return await sock.sendMessage(groupId, { 
          text: '❌ Usage: .goodbye on/off' 
        });
      }

      const settings = await db.getGroupSettings(groupId);
      settings.goodbye = action === 'on';
      await db.updateGroupSettings(groupId, settings);

      await sock.sendMessage(groupId, { 
        text: `✅ Goodbye messages ${action === 'on' ? 'enabled' : 'disabled'}` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});
