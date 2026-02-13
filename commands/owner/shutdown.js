import blue from '../../lib/blue.js';

blue.bot({
  cmd: "shutdown",
  desc: "Shutdown the bot (Owner only)",
  fromMe: "owner",
  type: "owner",
  handler: async (sock, msg) => {
    await sock.sendMessage(msg.key.remoteJid, { 
      text: '⚠️ Bot shutting down...' 
    });
    
    setTimeout(() => {
      process.exit(1);
    }, 1000);
  }
});
