import blue from '../../lib/blue.js';
import axios from 'axios';

blue.bot({
  cmd: "calc",
  desc: "Calculate mathematical expressions",
  fromMe: "user",
  type: "utility",
  handler: async (sock, msg, args) => {
    try {
      if (!args[0]) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Usage: .calc <expression>\n\nExample: .calc 2 + 2' 
        });
      }

      const expression = args.join(' ');
      const result = eval(expression);

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `🔢 *CALCULATOR*\n\n${expression} = *${result}*` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Invalid expression: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "weather",
  desc: "Get weather information",
  fromMe: "user",
  type: "utility",
  handler: async (sock, msg, args) => {
    try {
      if (!args[0]) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Usage: .weather <city>\n\nExample: .weather London' 
        });
      }

      const city = args.join(' ');
      const response = await axios.get(`https://wttr.in/${city}?format=j1`);
      const data = response.data;

      const current = data.current_condition[0];
      const weather = `
🌤️ *WEATHER - ${city.toUpperCase()}*

🌡️ Temperature: ${current.temp_C}°C / ${current.temp_F}°F
☁️ Condition: ${current.weatherDesc[0].value}
💨 Wind: ${current.windspeedKmph} km/h
💧 Humidity: ${current.humidity}%
👁️ Visibility: ${current.visibility} km
      `.trim();

      await sock.sendMessage(msg.key.remoteJid, { text: weather });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Failed to fetch weather. Check city name!' 
      });
    }
  }
});

blue.bot({
  cmd: "translate",
  desc: "Translate text to another language",
  fromMe: "user",
  type: "utility",
  handler: async (sock, msg, args) => {
    try {
      if (args.length < 2) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Usage: .translate <lang> <text>\n\nExample: .translate es Hello World' 
        });
      }

      const targetLang = args[0];
      const text = args.slice(1).join(' ');

      const response = await axios.get(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`);
      const translation = response.data.responseData.translatedText;

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `🌐 *TRANSLATION*\n\nOriginal: ${text}\n\nTranslated: ${translation}` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Translation failed. Check language code!' 
      });
    }
  }
});

blue.bot({
  cmd: "define",
  desc: "Get word definition",
  fromMe: "user",
  type: "utility",
  handler: async (sock, msg, args) => {
    try {
      if (!args[0]) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Usage: .define <word>' 
        });
      }

      const word = args[0];
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = response.data[0];

      const definition = data.meanings[0].definitions[0].definition;
      const example = data.meanings[0].definitions[0].example || 'No example available';

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `📖 *DEFINITION*\n\nWord: ${word}\n\nDefinition: ${definition}\n\nExample: ${example}` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Word not found!' 
      });
    }
  }
});

blue.bot({
  cmd: "shorten",
  desc: "Shorten a URL",
  fromMe: "user",
  type: "utility",
  handler: async (sock, msg, args) => {
    try {
      if (!args[0]) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Usage: .shorten <url>' 
        });
      }

      const url = args[0];
      const response = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
      const shortUrl = response.data;

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `🔗 *URL SHORTENER*\n\nOriginal: ${url}\n\nShortened: ${shortUrl}` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Failed to shorten URL!' 
      });
    }
  }
});

blue.bot({
  cmd: "qr",
  desc: "Generate QR code",
  fromMe: "user",
  type: "utility",
  handler: async (sock, msg, args) => {
    try {
      if (!args[0]) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Usage: .qr <text>' 
        });
      }

      const text = args.join(' ');
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(text)}`;

      await sock.sendMessage(msg.key.remoteJid, { 
        image: { url: qrUrl },
        caption: `📱 *QR CODE*\n\n${text}`
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "screenshot",
  desc: "Take website screenshot",
  fromMe: "user",
  type: "utility",
  handler: async (sock, msg, args) => {
    try {
      if (!args[0]) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Usage: .screenshot <url>' 
        });
      }

      const url = args[0];
      const screenshotUrl = `https://api.screenshotmachine.com/?key=demo&url=${encodeURIComponent(url)}&dimension=1024x768`;

      await sock.sendMessage(msg.key.remoteJid, { 
        image: { url: screenshotUrl },
        caption: `📸 *SCREENSHOT*\n\n${url}`
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Failed to take screenshot!' 
      });
    }
  }
});

blue.bot({
  cmd: "time",
  desc: "Get current time in a timezone",
  fromMe: "user",
  type: "utility",
  handler: async (sock, msg, args) => {
    try {
      const timezone = args[0] || 'UTC';
      const date = new Date();
      
      const timeString = date.toLocaleString('en-US', { 
        timeZone: timezone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `🕐 *TIME*\n\nTimezone: ${timezone}\n\n${timeString}` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Invalid timezone!' 
      });
    }
  }
});
