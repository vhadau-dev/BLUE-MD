import blue from '../../lib/blue.js';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

blue.bot({
  cmd: "shell",
  desc: "Execute shell commands (Owner only - DANGEROUS)",
  fromMe: true,
  type: "owner",
  react: "⚠️",
  filename: import.meta.url,
  handler: async (sock, msg, args) => {
    const command = args.join(' ');
    
    if (!command) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Please provide a command to execute\nUsage: .shell <command>\n\n⚠️ Warning: This command is dangerous!'
      }, { quoted: msg });
    }
    
    try {
      const { stdout, stderr } = await execPromise(command);
      
      const output = stdout || stderr || 'Command executed successfully (no output)';
      const text = `⚠️ *Shell Output*\n\n\`\`\`${output.slice(0, 2000)}\`\`\``;
      
      await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: `❌ *Shell Error*\n\n\`\`\`${error.message}\`\`\``
      }, { quoted: msg });
    }
  }
});
