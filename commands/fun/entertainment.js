import blue from '../../lib/blue.js';
import axios from 'axios';

blue.bot({
  cmd: "joke",
  desc: "Get a random joke",
  fromMe: "user",
  type: "fun",
  handler: async (sock, msg) => {
    try {
      const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
      const joke = response.data;

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `😂 *JOKE TIME*\n\n${joke.setup}\n\n${joke.punchline}` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Failed to fetch joke. Try again!' 
      });
    }
  }
});

blue.bot({
  cmd: "quote",
  desc: "Get an inspirational quote",
  fromMe: "user",
  type: "fun",
  handler: async (sock, msg) => {
    try {
      const response = await axios.get('https://api.quotable.io/random');
      const quote = response.data;

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `💭 *QUOTE OF THE MOMENT*\n\n"${quote.content}"\n\n— ${quote.author}` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Failed to fetch quote. Try again!' 
      });
    }
  }
});

blue.bot({
  cmd: "fact",
  desc: "Get a random fact",
  fromMe: "user",
  type: "fun",
  handler: async (sock, msg) => {
    try {
      const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
      const fact = response.data;

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `🧠 *DID YOU KNOW?*\n\n${fact.text}` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Failed to fetch fact. Try again!' 
      });
    }
  }
});

blue.bot({
  cmd: "meme",
  desc: "Get a random meme",
  fromMe: "user",
  type: "fun",
  handler: async (sock, msg) => {
    try {
      const response = await axios.get('https://meme-api.com/gimme');
      const meme = response.data;

      await sock.sendMessage(msg.key.remoteJid, { 
        image: { url: meme.url },
        caption: `😂 *${meme.title}*\n\n👍 ${meme.ups} upvotes\n📱 r/${meme.subreddit}`
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Failed to fetch meme. Try again!' 
      });
    }
  }
});

blue.bot({
  cmd: "dice",
  desc: "Roll a dice",
  fromMe: "user",
  type: "fun",
  handler: async (sock, msg) => {
    try {
      const result = Math.floor(Math.random() * 6) + 1;
      const dice = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `🎲 *DICE ROLL*\n\n${dice[result - 1]}\n\nYou rolled: ${result}` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "flip",
  desc: "Flip a coin",
  fromMe: "user",
  type: "fun",
  handler: async (sock, msg) => {
    try {
      const result = Math.random() < 0.5 ? 'Heads' : 'Tails';

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `🪙 *COIN FLIP*\n\nResult: *${result}*` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "8ball",
  desc: "Ask the magic 8-ball",
  fromMe: "user",
  type: "fun",
  handler: async (sock, msg, args) => {
    try {
      if (!args[0]) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Please ask a question!' 
        });
      }

      const responses = [
        'Yes, definitely!',
        'It is certain.',
        'Without a doubt.',
        'Yes.',
        'Most likely.',
        'Outlook good.',
        'Signs point to yes.',
        'Reply hazy, try again.',
        'Ask again later.',
        'Better not tell you now.',
        'Cannot predict now.',
        'Concentrate and ask again.',
        "Don't count on it.",
        'My reply is no.',
        'My sources say no.',
        'Outlook not so good.',
        'Very doubtful.'
      ];

      const answer = responses[Math.floor(Math.random() * responses.length)];

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `🎱 *MAGIC 8-BALL*\n\nQuestion: ${args.join(' ')}\n\nAnswer: *${answer}*` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "choose",
  desc: "Choose between options",
  fromMe: "user",
  type: "fun",
  handler: async (sock, msg, args) => {
    try {
      if (!args[0]) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Usage: .choose option1 | option2 | option3' 
        });
      }

      const options = args.join(' ').split('|').map(o => o.trim());
      
      if (options.length < 2) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Please provide at least 2 options separated by |' 
        });
      }

      const choice = options[Math.floor(Math.random() * options.length)];

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `🤔 *CHOICE MAKER*\n\nI choose: *${choice}*` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});
