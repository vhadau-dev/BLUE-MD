import blue from '../../lib/blue.js';

blue.bot({
  cmd: "broadcast",
  desc: "Broadcast message to all groups",
  fromMe: "owner",
  type: "owner",
  handler: async (sock, msg, args) => {
    try {
      if (!args[0]) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Please provide a message to broadcast' 
        });
      }

      const message = args.join(' ');
      const groups = await sock.groupFetchAllParticipating();
      const groupIds = Object.keys(groups);

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `📢 Broadcasting to ${groupIds.length} groups...` 
      });

      let success = 0;
      let failed = 0;

      for (const groupId of groupIds) {
        try {
          await sock.sendMessage(groupId, { 
            text: `📢 *BROADCAST MESSAGE*\n\n${message}\n\n_Sent by ${config.BOT_NAME}_` 
          });
          success++;
          await new Promise(resolve => setTimeout(resolve, 1000)); // Delay to avoid spam
        } catch (err) {
          failed++;
        }
      }

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `✅ Broadcast complete!\n\n✓ Success: ${success}\n✗ Failed: ${failed}` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Broadcast failed: ${error.message}` 
      });
    }
  }
});
