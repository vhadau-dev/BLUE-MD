import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Load all command files from commands directory
 */
export async function loadCommands() {
  const commandsPath = path.join(__dirname, '../commands');
  const categories = ['owner', 'admin', 'mods', 'general', 'system', 'fun', 'utility'];
  
  let totalLoaded = 0;
  
  console.log(chalk.cyan('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
  console.log(chalk.cyan.bold('        LOADING COMMANDS'));
  console.log(chalk.cyan('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
  
  for (const category of categories) {
    const categoryPath = path.join(commandsPath, category);
    
    if (!fs.existsSync(categoryPath)) {
      continue;
    }
    
    const files = fs.readdirSync(categoryPath).filter(file => file.endsWith('.js'));
    
    if (files.length === 0) continue;
    
    console.log(chalk.yellow(`\n📁 ${category.toUpperCase()}`));
    
    for (const file of files) {
      try {
        const filePath = path.join(categoryPath, file);
        const command = await import(`file://${filePath}`);
        totalLoaded++;
        console.log(chalk.green(`  ✓ ${file.replace('.js', '')}`));
      } catch (error) {
        console.log(chalk.red(`  ✗ ${file.replace('.js', '')} - ${error.message}`));
      }
    }
  }
  
  console.log(chalk.cyan('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
  console.log(chalk.green.bold(`✓ Loaded ${totalLoaded} commands successfully`));
  console.log(chalk.cyan('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
  
  return totalLoaded;
}

/**
 * Get file size in human readable format
 */
export function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  const bytes = stats.size;
  
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}
