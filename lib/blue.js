import config from '../config.js';

class BlueBot {
  constructor() {
    this.commands = new Map();
    this.categories = {
      owner: [],
      admin: [],
      mods: [],
      general: [],
      system: [],
      fun: [],
      utility: []
    };
    this.cooldowns = new Map();
  }

  /**
   * Register a command
   * @param {Object} options - Command options
   * @param {string} options.cmd - Command name
   * @param {string} options.desc - Command description
   * @param {string} options.fromMe - Permission level (owner/admin/mod/user)
   * @param {string} options.type - Command category
   * @param {Function} options.handler - Command handler function
   */
  bot(options) {
    const { cmd, desc, fromMe, type, handler } = options;
    
    if (!cmd || !handler) {
      throw new Error('Command name and handler are required');
    }

    const commandData = {
      cmd: cmd.toLowerCase(),
      desc: desc || 'No description provided',
      permission: fromMe || 'user',
      category: type || 'general',
      handler
    };

    this.commands.set(cmd.toLowerCase(), commandData);
    
    // Add to category
    if (this.categories[type]) {
      this.categories[type].push(commandData);
    }

    return this;
  }

  /**
   * Get command by name
   */
  getCommand(name) {
    return this.commands.get(name.toLowerCase());
  }

  /**
   * Get all commands
   */
  getAllCommands() {
    return Array.from(this.commands.values());
  }

  /**
   * Get commands by category
   */
  getCommandsByCategory(category) {
    return this.categories[category] || [];
  }

  /**
   * Check if user has permission to execute command
   * @param {string} userNumber - User's phone number
   * @param {string} permission - Required permission level
   * @param {Array} groupAdmins - List of group admins (optional)
   */
  hasPermission(userNumber, permission, groupAdmins = []) {
    const cleanNumber = userNumber.replace(/[^0-9]/g, '');
    
    // Owner has all permissions
    if (this.isOwner(userNumber)) {
      return true;
    }

    // Admin has owner, admin, mod, and user permissions
    if (permission === 'admin' || permission === 'mod' || permission === 'user') {
      // Check if user is in config admins OR is a group admin
      if (this.isAdmin(userNumber, groupAdmins)) {
        return true;
      }
    }

    // Mod has mod and user permissions
    if (permission === 'mod' || permission === 'user') {
      if (this.isMod(userNumber)) {
        return true;
      }
    }

    // Everyone has user permission
    if (permission === 'user') {
      return true;
    }

    return false;
  }

  /**
   * Check cooldown for user
   */
  checkCooldown(userId, commandName) {
    const key = `${userId}-${commandName}`;
    const now = Date.now();
    
    if (this.cooldowns.has(key)) {
      const expirationTime = this.cooldowns.get(key);
      if (now < expirationTime) {
        const timeLeft = ((expirationTime - now) / 1000).toFixed(1);
        return { onCooldown: true, timeLeft };
      }
    }

    // Set cooldown
    this.cooldowns.set(key, now + (config.COMMAND_COOLDOWN * 1000));
    return { onCooldown: false };
  }

  /**
   * Check if user is owner
   */
  isOwner(userNumber) {
    const cleanNumber = userNumber.replace(/[^0-9]/g, '');
    return config.OWNER_NUMBER.some(num => num.replace(/[^0-9]/g, '') === cleanNumber);
  }

  /**
   * Check if user is admin (config or group admin)
   */
  isAdmin(userNumber, groupAdmins = []) {
    const cleanNumber = userNumber.replace(/[^0-9]/g, '');
    
    // Check config admins
    const isConfigAdmin = config.ADMIN_NUMBERS.some(num => num.replace(/[^0-9]/g, '') === cleanNumber);
    if (isConfigAdmin) return true;

    // Check group admins
    const isGroupAdmin = groupAdmins.some(admin => admin.replace(/[^0-9]/g, '') === cleanNumber);
    return isGroupAdmin;
  }

  /**
   * Check if user is mod
   */
  isMod(userNumber) {
    const cleanNumber = userNumber.replace(/[^0-9]/g, '');
    return config.MOD_NUMBERS.some(num => num.replace(/[^0-9]/g, '') === cleanNumber);
  }

  /**
   * Get user role
   */
  getUserRole(userNumber, groupAdmins = []) {
    if (this.isOwner(userNumber)) return 'Owner';
    if (this.isAdmin(userNumber, groupAdmins)) return 'Admin';
    if (this.isMod(userNumber)) return 'Moderator';
    return 'User';
  }
}

export default new BlueBot();
