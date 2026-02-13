import OpenAI from 'openai';
import config from '../config.js';

class Chatbot {
  constructor() {
    this.client = null;
    this.conversationHistory = new Map();
    this.init();
  }

  init() {
    if (config.OPENAI_API_KEY) {
      this.client = new OpenAI({
        apiKey: config.OPENAI_API_KEY
      });
    }
  }

  isEnabled() {
    return config.CHATBOT_ENABLED && this.client !== null;
  }

  async chat(userId, message) {
    if (!this.isEnabled()) {
      return null;
    }

    try {
      // Get or create conversation history
      if (!this.conversationHistory.has(userId)) {
        this.conversationHistory.set(userId, [
          {
            role: 'system',
            content: `You are ${config.BOT_NAME}, a helpful WhatsApp bot assistant. You are friendly, knowledgeable, and can help with various topics. Keep responses concise and friendly for WhatsApp chat.`
          }
        ]);
      }

      const history = this.conversationHistory.get(userId);
      
      // Add user message to history
      history.push({
        role: 'user',
        content: message
      });

      // Keep only last 10 messages to manage token usage
      if (history.length > 11) {
        history.splice(1, history.length - 11);
      }

      // Get AI response
      const response = await this.client.chat.completions.create({
        model: config.CHATBOT_MODEL,
        messages: history,
        max_tokens: 500,
        temperature: 0.7
      });

      const aiMessage = response.choices[0].message.content;

      // Add AI response to history
      history.push({
        role: 'assistant',
        content: aiMessage
      });

      return aiMessage;
    } catch (error) {
      console.error('Chatbot error:', error);
      return null;
    }
  }

  clearHistory(userId) {
    this.conversationHistory.delete(userId);
  }

  clearAllHistory() {
    this.conversationHistory.clear();
  }
}

export default new Chatbot();
