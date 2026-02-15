import blue from '../../lib/blue.js';
import db from '../../lib/database.js';
import config from '../../config.js';

blue.bot({
  cmd: "mods",
  desc: "List all moderators (Public command)",
  fromMe: false,
  type: "owner",
  react: "👥",
  filename: import.meta.url,
  handler: async (sock, msg, args) => {
    const mods = await db.getModerators();
    
    if (mods.length === 0) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: '📋 *Moderator List*\n\nNo moderators have been added yet.'
      }, { quoted: msg });
    }
    
    let text = '👥 *Moderator List*\n\n';
    
    if (config.BLUE_IMAGE) {
      // If image is configured, we'll send it with the list
      text += `Total Moderators: ${mods.length}\n\n`;
    }
    
    mods.forEach((mod, index) => {
      text += `${index + 1}. @${mod.jid.split('@')[0]}\n`;
      text += `   Added: ${new Date(mod.addedAt).toLocaleDateString()}\n\n`;
    });
    
    const mentions = mods.map(m => m.jid);
    
    // Send with image if configured
    if (config.BLUE_IMAGE && config.BLUE_IMAGE !== 'https://i.imgur.com/default.jpg') {
      await sock.sendMessage(msg.key.remoteJid, {
        image: { url: config.BLUE_IMAGE },
        caption: text,
        mentions
      }, { quoted: msg });
    } else {
      await sock.sendMessage(msg.key.remoteJid, { 
        text,
        mentions 
      }, { quoted: msg });
    }
  }
});
