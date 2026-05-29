import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const PORTFOLIOS_DIR = path.join(process.cwd(), 'content', 'portfolios');
const STACKS_DIR = path.join(process.cwd(), 'content', 'stacks');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

// Helper to convert names to URL-friendly slugs
function getSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// 1. Build a map of stack name -> stack logo path
function buildStacksMap() {
  console.log('Building stacks map from content/stacks...');
  const map = new Map();
  if (!fs.existsSync(STACKS_DIR)) {
    console.log('Stacks directory not found.');
    return map;
  }

  const files = fs.readdirSync(STACKS_DIR);
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    const filePath = path.join(STACKS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const match = content.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) continue;
    
    const frontmatter = YAML.parse(match[1]);
    const name = frontmatter.name || path.basename(file, '.md');
    
    // Normalize stack names like "Vue.js" -> "vue.js", "Nuxt.js" -> "nuxt.js"
    // Also support aliases (e.g. "VB.Net" -> "Visual Basic .Net")
    let key = name.toLowerCase().trim();
    if (frontmatter.logo) {
      map.set(key, frontmatter.logo);
      console.log(`Mapped stack logo: "${key}" -> ${frontmatter.logo}`);
    }
  }
  
  // Custom manual mappings for stacks that might have slightly different names in portfolios
  // (e.g. "VB.Net" in portfolio vs "Visual Basic .Net" in stacks, or "VB6" vs "Visual Basic 6", etc.)
  map.set('vb.net', map.get('visual-basic-net') || map.get('vb.net'));
  map.set('vb6', map.get('visual-basic-6') || map.get('vb6'));
  map.set('crystal report', map.get('crystal-reports') || map.get('crystal report'));
  map.set('next', map.get('next-js') || map.get('next'));
  map.set('vue', map.get('vue-js') || map.get('vue'));
  map.set('nuxt', map.get('nuxt-js') || map.get('nuxt'));
  map.set('vee-validate', map.get('vee-validate') || '/images/stacks/vee-validate.png'); // fallback
  
  return map;
}

function processMigration() {
  const stacksMap = buildStacksMap();
  console.log('\nProcessing portfolios refactoring...');

  if (!fs.existsSync(PORTFOLIOS_DIR)) {
    console.log('Portfolios directory not found.');
    return;
  }

  const files = fs.readdirSync(PORTFOLIOS_DIR);
  const usedSlugs = new Set();

  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    const oldFilePath = path.join(PORTFOLIOS_DIR, file);
    const oldSlug = path.basename(file, '.md');
    const content = fs.readFileSync(oldFilePath, 'utf-8');
    
    const match = content.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) {
      console.log(`Skipping ${file}: no frontmatter found`);
      continue;
    }
    
    const yamlStr = match[1];
    const bodyStr = match[2];
    const frontmatter = YAML.parse(yamlStr);
    
    if (!frontmatter.name) {
      console.log(`Skipping ${file}: name field is missing in frontmatter`);
      continue;
    }

    // Generate new unique clean slug
    let baseSlug = getSlug(frontmatter.name);
    let newSlug = baseSlug;
    let counter = 2;
    while (usedSlugs.has(newSlug)) {
      newSlug = `${baseSlug}-${counter}`;
      counter++;
    }
    usedSlugs.add(newSlug);

    const oldImageDir = path.join(PUBLIC_DIR, 'images', 'portfolios', oldSlug);
    const newImageDir = path.join(PUBLIC_DIR, 'images', 'portfolios', newSlug);
    
    console.log(`\nRefactoring portfolio: "${frontmatter.name}"`);
    console.log(`  Slug: ${oldSlug} -> ${newSlug}`);
    
    let updated = false;

    // 1. Process stacks and de-duplicate logos
    if (Array.isArray(frontmatter.stacks)) {
      const newStacks = [];
      for (const stack of frontmatter.stacks) {
        if (stack && stack.name) {
          const stackKey = stack.name.toLowerCase().trim();
          
          if (stacksMap.has(stackKey)) {
            const mainLogoPath = stacksMap.get(stackKey);
            
            // Delete the duplicated logo if it exists in the old folder
            if (stack.logo && typeof stack.logo === 'string') {
              const basename = path.basename(stack.logo);
              const duplicatedLogoPath = path.join(oldImageDir, basename);
              if (fs.existsSync(duplicatedLogoPath)) {
                fs.unlinkSync(duplicatedLogoPath);
                console.log(`  Deleted duplicate stack logo: ${duplicatedLogoPath}`);
              }
            }
            
            // Link to the main stack logo path directly
            stack.logo = mainLogoPath;
            updated = true;
            console.log(`  Linked "${stack.name}" to main stack logo: ${mainLogoPath}`);
          } else {
            console.log(`  Warning: No main stack logo found for "${stack.name}", keeping current path.`);
          }
        }
        newStacks.push(stack);
      }
      frontmatter.stacks = newStacks;
    }

    // 2. Move remaining portfolio images and logos to new slug folder
    fs.mkdirSync(newImageDir, { recursive: true });

    // Process portfolio images
    if (Array.isArray(frontmatter.images)) {
      const newImages = [];
      for (const imgPath of frontmatter.images) {
        if (typeof imgPath === 'string' && imgPath.startsWith('/images/portfolios/')) {
          const basename = path.basename(imgPath);
          const currentPhysicalPath = path.join(PUBLIC_DIR, 'images', 'portfolios', oldSlug, basename);
          const targetPhysicalPath = path.join(newImageDir, basename);

          if (fs.existsSync(currentPhysicalPath)) {
            fs.renameSync(currentPhysicalPath, targetPhysicalPath);
            console.log(`  Moved portfolio image: ${currentPhysicalPath} -> ${targetPhysicalPath}`);
          }
          
          newImages.push(`/images/portfolios/${newSlug}/${basename}`);
          updated = true;
        } else {
          newImages.push(imgPath);
        }
      }
      frontmatter.images = newImages;
    }

    // Process any remaining stack logos that were NOT de-duplicated but need to be moved to the new folder
    if (Array.isArray(frontmatter.stacks)) {
      const newStacks = [];
      for (const stack of frontmatter.stacks) {
        if (stack && stack.logo && typeof stack.logo === 'string' && stack.logo.startsWith(`/images/portfolios/${oldSlug}/`)) {
          const basename = path.basename(stack.logo);
          const currentPhysicalPath = path.join(PUBLIC_DIR, 'images', 'portfolios', oldSlug, basename);
          const targetPhysicalPath = path.join(newImageDir, basename);

          if (fs.existsSync(currentPhysicalPath)) {
            fs.renameSync(currentPhysicalPath, targetPhysicalPath);
            console.log(`  Moved remaining logo: ${currentPhysicalPath} -> ${targetPhysicalPath}`);
          }
          
          stack.logo = `/images/portfolios/${newSlug}/${basename}`;
          updated = true;
        }
        newStacks.push(stack);
      }
      frontmatter.stacks = newStacks;
    }

    // 3. Write updated portfolio Markdown to the new slug file
    const newFilePath = path.join(PORTFOLIOS_DIR, `${newSlug}.md`);
    const newYamlStr = YAML.stringify(frontmatter);
    const newContent = `---\n${newYamlStr}---\n${bodyStr}`;
    fs.writeFileSync(newFilePath, newContent, 'utf-8');
    console.log(`  Created: ${newFilePath}`);

    // 4. Delete the old Markdown file
    fs.unlinkSync(oldFilePath);
    console.log(`  Deleted old markdown: ${oldFilePath}`);

    // 5. Clean up the old image folder if it's empty or exists
    if (fs.existsSync(oldImageDir)) {
      const remainingFiles = fs.readdirSync(oldImageDir);
      if (remainingFiles.length === 0) {
        fs.rmdirSync(oldImageDir);
        console.log(`  Cleaned up empty old directory: ${oldImageDir}`);
      } else {
        // If there are still files, force clean or report
        console.log(`  Notice: Old directory still contains ${remainingFiles.length} files, removing recursively...`);
        fs.rmSync(oldImageDir, { recursive: true, force: true });
      }
    }
  }
}

processMigration();
console.log('\nSlugification and stack logo de-duplication complete!');
