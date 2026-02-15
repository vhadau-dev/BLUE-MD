import blue from '../../lib/blue.js';
import config from '../../config.js';

blue.bot({
  cmd: "ownerhelp",
  desc: "Show owner commands help",
  fromMe: true,
  type: "owner",
  react: "❓",
  filename: import.meta.url,
  handler: async (sock, msg, args) => {
    const text = `👑 *Owner Commands Help*\n\n` +
      `*Moderator Management:*\n` +
      `${config.PREFIX}addmod @user - Add moderator\n` +
      `${config.PREFIX}mods - List all moderators (public)\n` +
      `${config.PREFIX}delmod @user - Remove moderator\n\n` +
      `*Bot Configuration:*\n` +
      `${config.PREFIX}setprefix <prefix> - Change prefix\n` +
      `${config.PREFIX}setmode <mode> - Change bot mode\n` +
      `${config.PREFIX}setdb - Database configuration\n` +
      `${config.PREFIX}backupdb - Backup database\n\n` +
      `*User Management:*\n` +
      `${config.PREFIX}banuser @user [reason] - Ban user\n` +
      `${config.PREFIX}unbanuser @user - Unban user\n\n` +
      `*System Control:*\n` +
      `${config.PREFIX}restart - Restart bot\n` +
      `${config.PREFIX}shutdown - Shutdown bot\n` +
      `${config.PREFIX}eval <code> - Execute JS code ⚠️\n` +
      `${config.PREFIX}shell <cmd> - Execute shell command ⚠️\n\n` +
      `*Communication:*\n` +
      `${config.PREFIX}broadcast <message> - Broadcast to all groups`;
    
    await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
  }
});
