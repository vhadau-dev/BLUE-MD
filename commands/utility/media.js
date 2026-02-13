import blue from '../../lib/blue.js';
import axios from 'axios';
import { writeFile } from 'fs/promises';
import path from 'path';

blue.bot({
  cmd: "sticker",
  desc: "Convert image/video to sticker",
  fromMe: "user",
  type: "utility",
  handler: async (sock, msg) => {
    try {
      const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      
      if (!quoted || (!quoted.imageMessage && !quoted.videoMessage)) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Please reply to an image or video!' 
        });
      }

      await sock.sendMessage(msg.key.remoteJid, { 
        text: '⏳ Creating sticker...' 
      });

      const mediaType = quoted.imageMessage ? 'image' : 'video';
      const buffer = await sock.downloadMediaMessage(msg);

      await sock.sendMessage(msg.key.remoteJid, {
        sticker: buffer
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Failed to create sticker: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "toimage",
  desc: "Convert sticker to image",
  fromMe: "user",
  type: "utility",
  handler: async (sock, msg) => {
    try {
      const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      
      if (!quoted || !quoted.stickerMessage) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Please reply to a sticker!' 
        });
      }

      const buffer = await sock.downloadMediaMessage(msg);

      await sock.sendMessage(msg.key.remoteJid, {
        image: buffer,
        caption: '✅ Sticker converted to image'
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "tovideo",
  desc: "Convert animated sticker to video",
  fromMe: "user",
  type: "utility",
  handler: async (sock, msg) => {
    try {
      const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      
      if (!quoted || !quoted.stickerMessage) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Please reply to an animated sticker!' 
        });
      }

      const buffer = await sock.downloadMediaMessage(msg);

      await sock.sendMessage(msg.key.remoteJid, {
        video: buffer,
        caption: '✅ Sticker converted to video'
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "toaudio",
  desc: "Convert video to audio",
  fromMe: "user",
  type: "utility",
  handler: async (sock, msg) => {
    try {
      const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      
      if (!quoted || !quoted.videoMessage) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Please reply to a video!' 
        });
      }

      await sock.sendMessage(msg.key.remoteJid, { 
        text: '⏳ Converting to audio...' 
      });

      const buffer = await sock.downloadMediaMessage(msg);

      await sock.sendMessage(msg.key.remoteJid, {
        audio: buffer,
        mimetype: 'audio/mp4'
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `❌ Error: ${error.message}` 
      });
    }
  }
});

blue.bot({
  cmd: "image",
  desc: "Search for images",
  fromMe: "user",
  type: "utility",
  handler: async (sock, msg, args) => {
    try {
      if (!args[0]) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ Usage: .image <query>' 
        });
      }

      const query = args.join(' ');
      const response = await axios.get(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1`, {
        headers: {
          'Authorization': 'Client-ID demo'
        }
      });

      if (response.data.results.length === 0) {
        return await sock.sendMessage(msg.key.remoteJid, { 
          text: '❌ No images found!' 
        });
      }

      const imageUrl = response.data.results[0].urls.regular;

      await sock.sendMessage(msg.key.remoteJid, {
        image: { url: imageUrl },
        caption: `🖼️ *${query}*`
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Failed to fetch image!' 
      });
    }
  }
});

blue.bot({
  cmd: "wallpaper",
  desc: "Get random wallpaper",
  fromMe: "user",
  type: "utility",
  handler: async (sock, msg, args) => {
    try {
      const query = args.join(' ') || 'nature';
      const response = await axios.get(`https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}`, {
        headers: {
          'Authorization': 'Client-ID demo'
        }
      });

      const imageUrl = response.data.urls.full;

      await sock.sendMessage(msg.key.remoteJid, {
        image: { url: imageUrl },
        caption: `🖼️ *WALLPAPER - ${query}*`
      });
    } catch (error) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: '❌ Failed to fetch wallpaper!' 
      });
    }
  }
});
