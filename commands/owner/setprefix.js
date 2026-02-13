import blue from '../../lib/blue.js';
import config from '../../config.js';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

blue.bot({
  cmd: "setprefix",
  desc: "Change bot command prefix",
  fromMe: "owner",
  type: "owner",
  handler: async (sock, msg, args) => {
    try {
      if (!args[0]) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: `❌ Current prefix: *${config.PREFIX}*\n\nUsage: ${config.PREFIX}setprefix <new_prefix>` 
        });
      }

      const newPrefix = args[0];
      config.PREFIX = newPrefix;

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `✅ Prefix changed to: *${newPrefix}*` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});
