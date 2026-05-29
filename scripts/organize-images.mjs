import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const PORTFOLIOS_DIR = path.join(process.cwd(), 'content', 'portfolios');
const STACKS_DIR = path.join(process.cwd(), 'content', 'stacks');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

function organizePortfolios() {
  console.log('Organizing portfolio images...');
  if (!fs.existsSync(PORTFOLIOS_DIR)) {
    console.log('Portfolios directory not found.');
    return;
  }

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
    const bodyStr = match[2];
    const frontmatter = YAML.parse(yamlStr);
    const slug = path.basename(file, '.md');
    
    let updated = false;

    // 1. Process portfolio images
    if (Array.isArray(frontmatter.images)) {
      const newImages = [];
      for (const imgPath of frontmatter.images) {
        if (typeof imgPath === 'string' && imgPath.startsWith('/images/portfolios/')) {
          const parts = imgPath.slice('/images/portfolios/'.length).split('/');
          // If it's a direct child (length === 1), it needs to be moved to a subfolder
          if (parts.length === 1) {
            const filename = parts[0];
            const currentPhysicalPath = path.join(PUBLIC_DIR, 'images', 'portfolios', filename);
            const targetFolderDir = path.join(PUBLIC_DIR, 'images', 'portfolios', slug);
            const targetPhysicalPath = path.join(targetFolderDir, filename);

            if (fs.existsSync(currentPhysicalPath)) {
              fs.mkdirSync(targetFolderDir, { recursive: true });
              fs.renameSync(currentPhysicalPath, targetPhysicalPath);
              console.log(`Moved: ${currentPhysicalPath} -> ${targetPhysicalPath}`);
            }

            newImages.push(`/images/portfolios/${slug}/${filename}`);
            updated = true;
          } else {
            newImages.push(imgPath);
          }
        } else {
          newImages.push(imgPath);
        }
      }
      frontmatter.images = newImages;
    }

    // 2. Process stacks inline logos
    if (Array.isArray(frontmatter.stacks)) {
      const newStacks = [];
      for (const stack of frontmatter.stacks) {
        if (stack && stack.logo && typeof stack.logo === 'string' && stack.logo.startsWith('/images/portfolios/')) {
          const parts = stack.logo.slice('/images/portfolios/'.length).split('/');
          if (parts.length === 1) {
            const filename = parts[0];
            const currentPhysicalPath = path.join(PUBLIC_DIR, 'images', 'portfolios', filename);
            const targetFolderDir = path.join(PUBLIC_DIR, 'images', 'portfolios', slug);
            const targetPhysicalPath = path.join(targetFolderDir, filename);

            if (fs.existsSync(currentPhysicalPath)) {
              fs.mkdirSync(targetFolderDir, { recursive: true });
              fs.renameSync(currentPhysicalPath, targetPhysicalPath);
              console.log(`Moved stack logo: ${currentPhysicalPath} -> ${targetPhysicalPath}`);
            }

            stack.logo = `/images/portfolios/${slug}/${filename}`;
            updated = true;
          }
        }
        newStacks.push(stack);
      }
      frontmatter.stacks = newStacks;
    }

    if (updated) {
      const newYamlStr = YAML.stringify(frontmatter);
      const newContent = `---\n${newYamlStr}---\n${bodyStr}`;
      fs.writeFileSync(filePath, newContent, 'utf-8');
      console.log(`Updated frontmatter image paths for portfolio: ${file}`);
    }
  }
}

function organizeStacks() {
  console.log('\nOrganizing stack images...');
  if (!fs.existsSync(STACKS_DIR)) {
    console.log('Stacks directory not found.');
    return;
  }

  const files = fs.readdirSync(STACKS_DIR);
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    const filePath = path.join(STACKS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const match = content.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) {
      console.log(`Skipping ${file}: no frontmatter found`);
      continue;
    }
    
    const yamlStr = match[1];
    const bodyStr = match[2];
    const frontmatter = YAML.parse(yamlStr);
    const slug = path.basename(file, '.md');
    
    let updated = false;

    if (frontmatter.logo && typeof frontmatter.logo === 'string' && frontmatter.logo.startsWith('/images/stacks/')) {
      const parts = frontmatter.logo.slice('/images/stacks/'.length).split('/');
      if (parts.length === 1) {
        const filename = parts[0];
        const currentPhysicalPath = path.join(PUBLIC_DIR, 'images', 'stacks', filename);
        const targetFolderDir = path.join(PUBLIC_DIR, 'images', 'stacks', slug);
        const targetPhysicalPath = path.join(targetFolderDir, filename);

        if (fs.existsSync(currentPhysicalPath)) {
          fs.mkdirSync(targetFolderDir, { recursive: true });
          fs.renameSync(currentPhysicalPath, targetPhysicalPath);
          console.log(`Moved stack logo: ${currentPhysicalPath} -> ${targetPhysicalPath}`);
        }

        frontmatter.logo = `/images/stacks/${slug}/${filename}`;
        updated = true;
      }
    }

    if (updated) {
      const newYamlStr = YAML.stringify(frontmatter);
      const newContent = `---\n${newYamlStr}---\n${bodyStr}`;
      fs.writeFileSync(filePath, newContent, 'utf-8');
      console.log(`Updated logo path for stack: ${file}`);
    }
  }
}

organizePortfolios();
organizeStacks();
console.log('\nImage reorganization complete!');
