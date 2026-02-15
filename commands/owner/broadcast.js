import blue from '../../lib/blue.js';

blue.bot({
  cmd: "broadcast",
  desc: "Broadcast message to all groups (Owner only)",
  fromMe: true,
  type: "owner",
  react: "📢",
  filename: import.meta.url,
  handler: async (sock, msg, args) => {
    const message = args.join(' ');
    
    if (!message) {
      return await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ Please provide a message to broadcast\nUsage: .broadcast <message>'
      }, { quoted: msg });
    }
    
    try {
      const groups = await sock.groupFetchAllParticipating();
      const groupIds = Object.keys(groups);
      
      let successCount = 0;
      let failCount = 0;
      
      for (const groupId of groupIds) {
        try {
          await sock.sendMessage(groupId, {
            text: `📢 *Broadcast Message*\n\n${message}`
          });
          successCount++;
        } catch (error) {
          failCount++;
        }
      }
      
      const text = `📢 *Broadcast Complete*\n\n` +
        `✅ Success: ${successCount} groups\n` +
        `❌ Failed: ${failCount} groups`;
      
      await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: `❌ Broadcast failed: ${error.message}`
      }, { quoted: msg });
    }
  }
});
