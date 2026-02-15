import blue from '../../lib/blue.js';
import config from '../../config.js';

blue.bot({
  cmd: "gamblehelp",
  desc: "Show gambling commands help",
  fromMe: false,
  type: "gambling",
  react: "❓",
  filename: import.meta.url,
  handler: async (sock, msg, args) => {
    const text = `🎰 *Gambling Commands Help*\n\n` +
      `*Basic Commands:*\n` +
      `${config.PREFIX}balance - Check your balance\n` +
      `${config.PREFIX}daily - Claim daily reward\n` +
      `${config.PREFIX}weekly - Claim weekly reward\n` +
      `${config.PREFIX}leaderboard - View top users\n\n` +
      `*Gambling Games:*\n` +
      `${config.PREFIX}bet <amount> - 50/50 bet\n` +
      `${config.PREFIX}gamble <amount> - Variable multiplier (1.5x-3x)\n` +
      `${config.PREFIX}dice <amount> <1-6> - Guess the dice (6x)\n` +
      `${config.PREFIX}slots <amount> - Slot machine\n` +
      `${config.PREFIX}coinflip <amount> <heads/tails> - Flip a coin\n\n` +
      `*Social:*\n` +
      `${config.PREFIX}give <amount> @user - Give money\n` +
      `${config.PREFIX}rob @user - Rob another user\n\n` +
      `*Banking (Coming Soon):*\n` +
      `${config.PREFIX}deposit <amount> - Deposit to bank\n` +
      `${config.PREFIX}withdraw <amount> - Withdraw from bank\n\n` +
      `*Owner Only:*\n` +
      `${config.PREFIX}resetbalance @user - Reset user balance`;
    
    await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
  }
});
