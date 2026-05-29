import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const PORTFOLIOS_DIR = path.join(process.cwd(), 'content', 'portfolios');

function updatePortfolios() {
  const files = fs.readdirSync(PORTFOLIOS_DIR);
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    const filePath = path.join(PORTFOLIOS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Parse frontmatter and body
    const match = content.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) {
      console.log(`Skipping ${file}: no frontmatter found`);
      continue;
    }
    
    const yamlStr = match[1];
    const bodyStr = match[2].trim();
    
    if (!bodyStr) {
      console.log(`Skipping ${file}: body is empty`);
      continue;
    }
    
    const frontmatter = YAML.parse(yamlStr);
    
    // If description is already set, skip
    if (frontmatter.description) {
      console.log(`Skipping ${file}: description already exists in frontmatter`);
      continue;
    }
    
    frontmatter.description = bodyStr;
    const newYamlStr = YAML.stringify(frontmatter);
    const newContent = `---\n${newYamlStr}---\n\n${bodyStr}\n`;
    
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Updated ${file} with description`);
  }
}

updatePortfolios();
