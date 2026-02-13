import blue from '../../lib/blue.js';
import { exec } from 'child_process';

blue.bot({
  cmd: "restart",
  desc: "Restart the bot (Owner only)",
  fromMe: "owner",
  type: "owner",
  handler: async (sock, msg) => {
    await sock.sendMessage(msg.key.remoteJid, { 
      text: '🔄 Restarting bot...' 
    });
    
    setTimeout(() => {
      process.exit(0);
    }, 1000);
  }
});
