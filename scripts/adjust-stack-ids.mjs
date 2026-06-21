import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const PORTFOLIOS_DIR = path.join(process.cwd(), 'content', 'portfolios');
const STACKS_DIR = path.join(process.cwd(), 'content', 'stacks');

// 1. Build a mapping of stack names and safeNames to slugs
const stackSlugMap = new Map(); // name -> slug
const safeNameToSlug = new Map(); // safeName -> slug

const stackFiles = fs.readdirSync(STACKS_DIR).filter(file => file.endsWith('.md'));

for (const file of stackFiles) {
  const slug = path.basename(file, '.md');
  const filePath = path.join(STACKS_DIR, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  const match = content.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/);
  if (match) {
    const frontmatter = YAML.parse(match[1]);
    if (frontmatter.name) {
      stackSlugMap.set(frontmatter.name.toLowerCase(), slug);
      const safeName = frontmatter.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      safeNameToSlug.set(safeName, slug);
    }
  }
  // also map slug directly
  safeNameToSlug.set(slug, slug);
}

console.log("Stack mappings built:", Array.from(stackSlugMap.entries()));

// 2. Read each portfolio file and update stack ids
const portfolioFiles = fs.readdirSync(PORTFOLIOS_DIR).filter(file => file.endsWith('.md'));

for (const file of portfolioFiles) {
  const filePath = path.join(PORTFOLIOS_DIR, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  const match = content.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    console.log(`Skipping ${file}: no frontmatter found`);
    continue;
  }
  
  const yamlStr = match[1];
  const bodyStr = match[2];
  const frontmatter = YAML.parse(yamlStr);
  
  let updated = false;
  if (Array.isArray(frontmatter.stacks)) {
    for (const stack of frontmatter.stacks) {
      if (stack && stack.name) {
        const nameLower = stack.name.toLowerCase();
        const safeName = nameLower.replace(/[^a-z0-9]+/g, '-');
        
        let targetSlug = stackSlugMap.get(nameLower) || safeNameToSlug.get(safeName);
        
        if (!targetSlug) {
          // fallback checks
          if (nameLower === 'react.js' || nameLower === 'react') {
            targetSlug = 'react-js';
          } else if (nameLower === 'next.js' || nameLower === 'next') {
            targetSlug = 'next-js';
          } else if (nameLower === 'nuxt.js' || nameLower === 'nuxt') {
            targetSlug = 'nuxt-js';
          } else if (nameLower === 'vue.js' || nameLower === 'vue') {
            targetSlug = 'vue-js';
          } else if (nameLower === 'nest.js' || nameLower === 'nest') {
            targetSlug = 'nest-js';
          } else if (nameLower === 'javascript' || nameLower === 'js') {
            targetSlug = 'javascript';
          }
        }
        
        if (targetSlug) {
          if (stack.id !== targetSlug) {
            console.log(`Portfolio: ${file} | Updating stack ${stack.name} ID: ${stack.id} -> ${targetSlug}`);
            stack.id = targetSlug;
            updated = true;
          }
        } else {
          console.warn(`Portfolio: ${file} | WARNING: Could not find matching stack file for "${stack.name}"`);
        }
      }
    }
  }
  
  if (updated) {
    const newYamlStr = YAML.stringify(frontmatter);
    const newContent = `---\n${newYamlStr}---\n${bodyStr}`;
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Updated stack IDs for portfolio: ${file}`);
  }
}

console.log('Finished adjusting stack IDs!');
