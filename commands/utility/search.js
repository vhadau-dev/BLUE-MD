import blue from '../../lib/blue.js';
import axios from 'axios';

blue.bot({
  cmd: "google",
  desc: "Search on Google",
  fromMe: "user",
  type: "utility",
  handler: async (sock, msg, args) => {
    try {
      if (!args[0]) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Usage: .google <query>' 
        });
      }

      const query = args.join(' ');
      const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `🔍 *GOOGLE SEARCH*\n\nQuery: ${query}\n\nLink: ${url}` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "wiki",
  desc: "Search Wikipedia",
  fromMe: "user",
  type: "utility",
  handler: async (sock, msg, args) => {
    try {
      if (!args[0]) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Usage: .wiki <query>' 
        });
      }

      const query = args.join(' ');
      const response = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
      const data = response.data;

      const result = `
📚 *WIKIPEDIA*

*${data.title}*

${data.extract}

🔗 Read more: ${data.content_urls.desktop.page}
      `.trim();

      await sock.sendMessage(msg.key.remoteJid, { text: result });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Article not found!' 
      });
    }
  }
});

blue.bot({
  cmd: "news",
  desc: "Get latest news",
  fromMe: "user",
  type: "utility",
  handler: async (sock, msg, args) => {
    try {
      const category = args[0] || 'general';
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?category=${category}&apiKey=demo`);
      
      if (!response.data.articles || response.data.articles.length === 0) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ No news found!' 
        });
      }

      const articles = response.data.articles.slice(0, 5);
      let news = `📰 *LATEST NEWS - ${category.toUpperCase()}*\n\n`;

      articles.forEach((article, index) => {
        news += `${index + 1}. *${article.title}*\n`;
        news += `   ${article.description || 'No description'}\n`;
        news += `   🔗 ${article.url}\n\n`;
      });

      await sock.sendMessage(msg.key.remoteJid, { text: news });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Failed to fetch news!' 
      });
    }
  }
});

blue.bot({
  cmd: "crypto",
  desc: "Get cryptocurrency price",
  fromMe: "user",
  type: "utility",
  handler: async (sock, msg, args) => {
    try {
      const coin = args[0] || 'bitcoin';
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&include_24hr_change=true`);
      
      if (!response.data[coin]) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Cryptocurrency not found!' 
        });
      }

      const data = response.data[coin];
      const change = data.usd_24h_change > 0 ? '📈' : '📉';

      const crypto = `
💰 *CRYPTOCURRENCY*

Coin: ${coin.toUpperCase()}
Price: $${data.usd.toLocaleString()}
24h Change: ${change} ${data.usd_24h_change.toFixed(2)}%
      `.trim();

      await sock.sendMessage(msg.key.remoteJid, { text: crypto });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Failed to fetch crypto data!' 
      });
    }
  }
});

blue.bot({
  cmd: "movie",
  desc: "Search for movie information",
  fromMe: "user",
  type: "utility",
  handler: async (sock, msg, args) => {
    try {
      if (!args[0]) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Usage: .movie <title>' 
        });
      }

      const title = args.join(' ');
      const response = await axios.get(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=demo`);
      const data = response.data;

      if (data.Response === 'False') {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Movie not found!' 
        });
      }

      const movie = `
🎬 *MOVIE INFO*

*${data.Title}* (${data.Year})

⭐ Rating: ${data.imdbRating}/10
🎭 Genre: ${data.Genre}
⏱️ Runtime: ${data.Runtime}
🎬 Director: ${data.Director}
🎭 Cast: ${data.Actors}

📝 Plot: ${data.Plot}
      `.trim();

      await sock.sendMessage(msg.key.remoteJid, { 
        image: { url: data.Poster },
        caption: movie 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Failed to fetch movie data!' 
      });
    }
  }
});

blue.bot({
  cmd: "lyrics",
  desc: "Get song lyrics",
  fromMe: "user",
  type: "utility",
  handler: async (sock, msg, args) => {
    try {
      if (!args[0]) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Usage: .lyrics <song title>' 
        });
      }

      const song = args.join(' ');
      const response = await axios.get(`https://api.lyrics.ovh/v1/artist/${encodeURIComponent(song)}`);
      
      if (!response.data.lyrics) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Lyrics not found!' 
        });
      }

      const lyrics = response.data.lyrics.substring(0, 2000); // Limit length

      await sock.sendMessage(msg.key.remoteJid, { 
        text: `🎵 *LYRICS - ${song}*\n\n${lyrics}` 
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Failed to fetch lyrics!' 
      });
    }
  }
});

blue.bot({
  cmd: "github",
  desc: "Search GitHub repositories",
  fromMe: "user",
  type: "utility",
  handler: async (sock, msg, args) => {
    try {
      if (!args[0]) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Usage: .github <repo name>' 
        });
      }

      const query = args.join(' ');
      const response = await axios.get(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc`);
      
      if (response.data.items.length === 0) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ No repositories found!' 
        });
      }

      const repos = response.data.items.slice(0, 5);
      let result = `🐙 *GITHUB SEARCH - ${query}*\n\n`;

      repos.forEach((repo, index) => {
        result += `${index + 1}. *${repo.full_name}*\n`;
        result += `   ⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}\n`;
        result += `   ${repo.description || 'No description'}\n`;
        result += `   🔗 ${repo.html_url}\n\n`;
      });

      await sock.sendMessage(msg.key.remoteJid, { text: result });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Failed to search GitHub!' 
      });
    }
  }
});
