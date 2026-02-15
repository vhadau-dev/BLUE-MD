import blue from '../../lib/blue.js';
import util from 'util';

blue.bot({
  cmd: "eval",
  desc: "Execute JavaScript code (Owner only - DANGEROUS)",
  fromMe: true,
  type: "owner",
  react: "⚠️",
  filename: import.meta.url,
  handler: async (sock, msg, args) => {
    const code = args.join(' ');
    
    if (!code) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Please provide code to execute\nUsage: .eval <code>\n\n⚠️ Warning: This command is dangerous!'
      }, { quoted: msg });
    }
    
    try {
      let result = eval(code);
      
      if (typeof result !== 'string') {
        result = util.inspect(result, { depth: 0 });
      }
      
      const text = `⚠️ *Eval Result*\n\n\`\`\`${result}\`\`\``;
      
      await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: `❌ *Eval Error*\n\n\`\`\`${error.message}\`\`\``
      }, { quoted: msg });
    }
  }
});
