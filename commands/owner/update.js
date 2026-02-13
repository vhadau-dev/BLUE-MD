import blue from '../../lib/blue.js';
import { exec } from 'child_process';
import { promisify } from 'util';
import config from '../../config.js';

const execAsync = promisify(exec);

blue.bot({
  cmd: "update",
  desc: "Update bot from GitHub repository",
  fromMe: "owner",
  type: "owner",
  handler: async (sock, msg) => {
    try {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '🔄 Checking for updates...' 
      });

      // Fetch latest changes
      const { stdout: fetchOut } = await execAsync('git fetch origin');
      
      // Check if updates available
      const { stdout: statusOut } = await execAsync('git status -uno');
      
      if (statusOut.includes('up to date')) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '✅ Bot is already up to date!' 
        });
      }

      // Pull updates
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '📥 Downloading updates...' 
      });
      
      const { stdout: pullOut } = await execAsync('git pull origin main');
      
      // Install dependencies
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '📦 Installing dependencies...' 
      });
      
      await execAsync('npm install');
      
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '✅ Update completed! Restarting bot...' 
      });
      
      setTimeout(() => {
        process.exit(0);
      }, 2000);
      
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Update failed: ${error.message}` 
      });
    }
  }
});
