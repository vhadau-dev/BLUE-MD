import blue from '../../lib/blue.js';
import axios from 'axios';

blue.bot({
  cmd: "trivia",
  desc: "Get a trivia question",
  fromMe: "user",
  type: "fun",
  handler: async (sock, msg) => {
    try {
      const response = await axios.get('https://opentdb.com/api.php?amount=1&type=multiple');
      const trivia = response.data.results[0];

      const question = trivia.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'");
      const options = [...trivia.incorrect_answers, trivia.correct_answer]
        .sort(() => Math.random() - 0.5)
        .map((opt, i) => `${i + 1}. ${opt.replace(/&quot;/g, '"').replace(/&#039;/g, "'")}`)
        .join('\n');

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `🧠 *TRIVIA*\n\nCategory: ${trivia.category}\nDifficulty: ${trivia.difficulty}\n\n${question}\n\n${options}` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Failed to fetch trivia!' 
      });
    }
  }
});

blue.bot({
  cmd: "riddle",
  desc: "Get a riddle",
  fromMe: "user",
  type: "fun",
  handler: async (sock, msg) => {
    try {
      const riddles = [
        { q: "What has keys but no locks, space but no room, and you can enter but can't go inside?", a: "A keyboard" },
        { q: "I speak without a mouth and hear without ears. I have no body, but come alive with wind. What am I?", a: "An echo" },
        { q: "What can travel around the world while staying in a corner?", a: "A stamp" },
        { q: "The more you take, the more you leave behind. What am I?", a: "Footsteps" },
        { q: "What has a head and a tail but no body?", a: "A coin" },
        { q: "What gets wet while drying?", a: "A towel" },
        { q: "What can you catch but not throw?", a: "A cold" },
        { q: "What runs but never walks?", a: "Water" },
        { q: "What has hands but cannot clap?", a: "A clock" },
        { q: "What has a neck but no head?", a: "A bottle" }
      ];

      const riddle = riddles[Math.floor(Math.random() * riddles.length)];

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `🤔 *RIDDLE*\n\n${riddle.q}\n\n_Reply with your answer!_` 
      });

      setTimeout(async () => {
        await sock.sendMessage(msg.key.remoteJid, { 
          text: `💡 *ANSWER*\n\n${riddle.a}` 
        });
      }, 30000); // Show answer after 30 seconds
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "pickup",
  desc: "Get a pickup line",
  fromMe: "user",
  type: "fun",
  handler: async (sock, msg) => {
    try {
      const lines = [
        "Are you a magician? Because whenever I look at you, everyone else disappears.",
        "Do you have a map? I keep getting lost in your eyes.",
        "Is your name Google? Because you have everything I've been searching for.",
        "Are you a parking ticket? Because you've got FINE written all over you.",
        "Do you believe in love at first sight, or should I walk by again?",
        "Are you a camera? Because every time I look at you, I smile.",
        "Is your dad a boxer? Because you're a knockout!",
        "Do you have a Band-Aid? Because I just scraped my knee falling for you.",
        "Are you Australian? Because you meet all of my koala-fications.",
        "If you were a vegetable, you'd be a cute-cumber!"
      ];

      const line = lines[Math.floor(Math.random() * lines.length)];

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `💘 *PICKUP LINE*\n\n${line}` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "advice",
  desc: "Get random advice",
  fromMe: "user",
  type: "fun",
  handler: async (sock, msg) => {
    try {
      const response = await axios.get('https://api.adviceslip.com/advice');
      const advice = response.data.slip.advice;

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `💡 *ADVICE*\n\n${advice}` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Failed to fetch advice!' 
      });
    }
  }
});

blue.bot({
  cmd: "insult",
  desc: "Get a random insult",
  fromMe: "user",
  type: "fun",
  handler: async (sock, msg) => {
    try {
      const response = await axios.get('https://evilinsult.com/generate_insult.php?lang=en&type=json');
      const insult = response.data.insult;

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `🔥 *INSULT*\n\n${insult}` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Failed to fetch insult!' 
      });
    }
  }
});

blue.bot({
  cmd: "dog",
  desc: "Get a random dog image",
  fromMe: "user",
  type: "fun",
  handler: async (sock, msg) => {
    try {
      const response = await axios.get('https://dog.ceo/api/breeds/image/random');
      const imageUrl = response.data.message;

      await sock.sendMessage(msg.key.remoteJid, {
        image: { url: imageUrl },
        caption: '🐕 *RANDOM DOG*'
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Failed to fetch dog image!' 
      });
    }
  }
});

blue.bot({
  cmd: "cat",
  desc: "Get a random cat image",
  fromMe: "user",
  type: "fun",
  handler: async (sock, msg) => {
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search');
      const imageUrl = response.data[0].url;

      await sock.sendMessage(msg.key.remoteJid, {
        image: { url: imageUrl },
        caption: '🐱 *RANDOM CAT*'
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Failed to fetch cat image!' 
      });
    }
  }
});

blue.bot({
  cmd: "fox",
  desc: "Get a random fox image",
  fromMe: "user",
  type: "fun",
  handler: async (sock, msg) => {
    try {
      const response = await axios.get('https://randomfox.ca/floof/');
      const imageUrl = response.data.image;

      await sock.sendMessage(msg.key.remoteJid, {
        image: { url: imageUrl },
        caption: '🦊 *RANDOM FOX*'
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Failed to fetch fox image!' 
      });
    }
  }
});

blue.bot({
  cmd: "duck",
  desc: "Get a random duck image",
  fromMe: "user",
  type: "fun",
  handler: async (sock, msg) => {
    try {
      const response = await axios.get('https://random-d.uk/api/random');
      const imageUrl = response.data.url;

      await sock.sendMessage(msg.key.remoteJid, {
        image: { url: imageUrl },
        caption: '🦆 *RANDOM DUCK*'
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Failed to fetch duck image!' 
      });
    }
  }
});
