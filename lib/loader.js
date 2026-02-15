import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function loadCommands() {
  console.log('📦 Loading commands...');
  
  const commandsPath = join(__dirname, '../commands');
  const categories = readdirSync(commandsPath);
  
  let totalLoaded = 0;
  
  for (const category of categories) {
    const categoryPath = join(commandsPath, category);
    const files = readdirSync(categoryPath).filter(file => file.endsWith('.js'));
    
    console.log(`\n📁 Loading ${category} commands (${files.length} files)...`);
    
    for (const file of files) {
      try {
        const filePath = join(categoryPath, file);
        const fileUrl = pathToFileURL(filePath).href;
        await import(fileUrl);
        totalLoaded++;
      } catch (error) {
        console.error(`❌ Failed to load ${category}/${file}:`, error.message);
      }
    }
  }
  
  console.log(`\n✅ Successfully loaded ${totalLoaded} commands\n`);
  return totalLoaded;
}

export default loadCommands;
