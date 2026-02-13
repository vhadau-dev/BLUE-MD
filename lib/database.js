import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Database {
  constructor() {
    this.dbPath = path.join(__dirname, '../database');
    this.warningsPath = path.join(this.dbPath, 'warnings.json');
    this.groupsPath = path.join(this.dbPath, 'groups.json');
    this.usersPath = path.join(this.dbPath, 'users.json');
    
    this.init();
  }

  async init() {
    await fs.ensureDir(this.dbPath);
    
    if (!await fs.pathExists(this.warningsPath)) {
      await fs.writeJSON(this.warningsPath, {});
    }
    
    if (!await fs.pathExists(this.groupsPath)) {
      await fs.writeJSON(this.groupsPath, {});
    }
    
    if (!await fs.pathExists(this.usersPath)) {
      await fs.writeJSON(this.usersPath, {});
    }
  }

  // Warnings Management
  async getWarnings(userId, groupId) {
    const data = await fs.readJSON(this.warningsPath);
    const key = `${groupId}_${userId}`;
    return data[key] || 0;
  }

  async addWarning(userId, groupId) {
    const data = await fs.readJSON(this.warningsPath);
    const key = `${groupId}_${userId}`;
    data[key] = (data[key] || 0) + 1;
    await fs.writeJSON(this.warningsPath, data, { spaces: 2 });
    return data[key];
  }

  async resetWarnings(userId, groupId) {
    const data = await fs.readJSON(this.warningsPath);
    const key = `${groupId}_${userId}`;
    delete data[key];
    await fs.writeJSON(this.warningsPath, data, { spaces: 2 });
  }

  // Group Settings Management
  async getGroupSettings(groupId) {
    const data = await fs.readJSON(this.groupsPath);
    return data[groupId] || {
      antilink: false,
      antibadword: false,
      welcome: false,
      goodbye: false,
      mute: false
    };
  }

  async updateGroupSettings(groupId, settings) {
    const data = await fs.readJSON(this.groupsPath);
    data[groupId] = { ...data[groupId], ...settings };
    await fs.writeJSON(this.groupsPath, data, { spaces: 2 });
  }

  // User Data Management
  async getUserData(userId) {
    const data = await fs.readJSON(this.usersPath);
    return data[userId] || {
      messageCount: 0,
      commandCount: 0,
      joinedAt: Date.now()
    };
  }

  async updateUserData(userId, updates) {
    const data = await fs.readJSON(this.usersPath);
    data[userId] = { ...data[userId], ...updates };
    await fs.writeJSON(this.usersPath, data, { spaces: 2 });
  }

  async incrementUserStats(userId, field) {
    const userData = await this.getUserData(userId);
    userData[field] = (userData[field] || 0) + 1;
    await this.updateUserData(userId, userData);
  }
}

export default new Database();
