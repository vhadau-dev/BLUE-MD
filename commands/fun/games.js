import blue from '../../lib/blue.js';

blue.bot({
  cmd: "truth",
  desc: "Get a truth question",
  fromMe: "user",
  type: "fun",
  handler: async (sock, msg) => {
    try {
      const truths = [
        "What's the most embarrassing thing you've ever done?",
        "What's your biggest fear?",
        "Have you ever lied to your best friend?",
        "What's your biggest secret?",
        "Who was your first crush?",
        "What's the worst thing you've ever said to someone?",
        "Have you ever cheated on a test?",
        "What's your most embarrassing childhood memory?",
        "What's something you've never told anyone?",
        "What's your biggest regret?"
      ];

      const truth = truths[Math.floor(Math.random() * truths.length)];

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `🎭 *TRUTH*\n\n${truth}` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "dare",
  desc: "Get a dare challenge",
  fromMe: "user",
  type: "fun",
  handler: async (sock, msg) => {
    try {
      const dares = [
        "Send a funny selfie to the group",
        "Do 20 push-ups",
        "Sing your favorite song",
        "Dance for 1 minute",
        "Tell a joke",
        "Change your profile picture to something funny",
        "Text your crush",
        "Post an embarrassing photo",
        "Do your best impression of someone",
        "Speak in an accent for the next 10 minutes"
      ];

      const dare = dares[Math.floor(Math.random() * dares.length)];

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `🎯 *DARE*\n\n${dare}` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "ship",
  desc: "Ship two people",
  fromMe: "user",
  type: "fun",
  handler: async (sock, msg, args) => {
    try {
      const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
      
      if (!mentioned || mentioned.length < 2) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Please mention 2 people to ship!' 
        });
      }

      const person1 = mentioned[0];
      const person2 = mentioned[1];
      const percentage = Math.floor(Math.random() * 101);

      let emoji = '💔';
      if (percentage > 80) emoji = '💕';
      else if (percentage > 60) emoji = '💖';
      else if (percentage > 40) emoji = '💗';
      else if (percentage > 20) emoji = '💙';

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `${emoji} *LOVE CALCULATOR* ${emoji}\n\n@${person1.split('@')[0]} 💕 @${person2.split('@')[0]}\n\nLove Percentage: *${percentage}%*`,
        mentions: [person1, person2]
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "rate",
  desc: "Rate someone or something",
  fromMe: "user",
  type: "fun",
  handler: async (sock, msg, args) => {
    try {
      if (!args[0]) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Please provide something to rate!' 
        });
      }

      const rating = Math.floor(Math.random() * 11);
      const stars = '⭐'.repeat(rating);

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `⭐ *RATING*\n\n${args.join(' ')}\n\n${stars}\n\nRating: *${rating}/10*` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "roast",
  desc: "Get a random roast",
  fromMe: "user",
  type: "fun",
  handler: async (sock, msg) => {
    try {
      const roasts = [
        "I'd agree with you, but then we'd both be wrong.",
        "You're not stupid; you just have bad luck thinking.",
        "I'm not insulting you. I'm describing you.",
        "If I wanted to hear from someone with your IQ, I'd watch a nature documentary.",
        "You bring everyone so much joy... when you leave the room.",
        "I'd explain it to you, but I left my crayons at home.",
        "You're like a cloud. When you disappear, it's a beautiful day.",
        "I'm jealous of people who don't know you.",
        "You're proof that evolution can go in reverse.",
        "I'd challenge you to a battle of wits, but I see you're unarmed."
      ];

      const roast = roasts[Math.floor(Math.random() * roasts.length)];

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `🔥 *ROASTED*\n\n${roast}` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "compliment",
  desc: "Get a random compliment",
  fromMe: "user",
  type: "fun",
  handler: async (sock, msg) => {
    try {
      const compliments = [
        "You're an awesome friend!",
        "You light up the room!",
        "You have a great sense of humor!",
        "You're incredibly talented!",
        "You're one of a kind!",
        "You're a great listener!",
        "You have the best laugh!",
        "You're so thoughtful!",
        "You're amazing just the way you are!",
        "You make the world a better place!"
      ];

      const compliment = compliments[Math.floor(Math.random() * compliments.length)];

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `💖 *COMPLIMENT*\n\n${compliment}` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});
