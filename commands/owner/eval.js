import blue from '../../lib/blue.js';
import util from 'util';

blue.bot({
  cmd: "eval",
  desc: "Execute JavaScript code (Owner only)",
  fromMe: "owner",
  type: "owner",
  handler: async (sock, msg, args) => {
    try {
      if (!args[0]) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Please provide code to evaluate' 
        });
      }

      const code = args.join(' ');
      let result = eval(code);
      
      if (typeof result !== 'string') {
        result = util.inspect(result, { depth: 0 });
      }

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `✅ *Eval Result:*\n\n\`\`\`${result}\`\`\`` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ *Error:*\n\n\`\`\`${error.message}\`\`\`` 
      });
    }
  }
});
