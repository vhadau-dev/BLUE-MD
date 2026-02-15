import blue from '../../lib/blue.js';
import config from '../../config.js';

blue.bot({
  cmd: "grouphelp",
  desc: "Show group commands help",
  fromMe: false,
  type: "group",
  react: "❓",
  filename: import.meta.url,
  handler: async (sock, msg, args) => {
    const text = `👥 *Group Commands Help*\n\n` +
      `*Settings:*\n` +
      `${config.PREFIX}antilink - Toggle antilink protection\n` +
      `${config.PREFIX}welcome - Toggle welcome messages\n` +
      `${config.PREFIX}goodbye - Toggle goodbye messages\n` +
      `${config.PREFIX}mute - Mute group (admins only)\n` +
      `${config.PREFIX}unmute - Unmute group\n` +
      `${config.PREFIX}lock - Lock group settings\n\n` +
      `*Member Management:*\n` +
      `${config.PREFIX}kick @user - Kick member\n` +
      `${config.PREFIX}promote @user - Promote to admin\n` +
      `${config.PREFIX}demote @user - Demote from admin\n\n` +
      `*Communication:*\n` +
      `${config.PREFIX}tagall [message] - Tag all members\n` +
      `${config.PREFIX}hidetag <message> - Hidden tag\n` +
      `${config.PREFIX}poll - Create poll (coming soon)\n\n` +
      `*Rules:*\n` +
      `${config.PREFIX}rules - View group rules\n` +
      `${config.PREFIX}setrules <text> - Set group rules`;
    
    await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
  }
});
