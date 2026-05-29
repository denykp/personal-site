import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import YAML from 'yaml';

const BASE_URL = 'http://localhost:3000/api/public';
const OUTPUT_DIR = path.join(process.cwd(), 'content');
const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

// Ensure directories exist
fs.mkdirSync(path.join(OUTPUT_DIR, 'portfolios'), { recursive: true });
fs.mkdirSync(path.join(OUTPUT_DIR, 'stacks'), { recursive: true });
fs.mkdirSync(path.join(IMAGES_DIR, 'portfolios'), { recursive: true });
fs.mkdirSync(path.join(IMAGES_DIR, 'stacks'), { recursive: true });

async function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
        return;
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
      file.on('error', reject);
    }).on('error', reject);
  });
}

function processImagesInObject(obj, type) {
  const newObj = Array.isArray(obj) ? [] : {};
  let downloadPromises = [];

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string' && value.startsWith('http')) {
      if (value.includes('cloudinary') || value.includes('firebasestorage') || value.match(/\.(png|jpg|jpeg|gif|svg|webp)$/i)) {
        const extMatch = value.match(/\.(png|jpg|jpeg|gif|svg|webp)(?:\?.*)?$/i);
        const ext = extMatch ? extMatch[1] : 'png';
        const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
        const localPath = `/images/${type}/${filename}`;
        const destPath = path.join(IMAGES_DIR, type, filename);
        
        console.log(`Downloading ${value} -> ${localPath}`);
        downloadPromises.push(downloadImage(value, destPath));
        newObj[key] = localPath;
      } else {
        newObj[key] = value;
      }
    } else if (value && typeof value === 'object') {
      const { updatedObj, promises } = processImagesInObject(value, type);
      newObj[key] = updatedObj;
      downloadPromises.push(...promises);
    } else {
      newObj[key] = value;
    }
  }

  return { updatedObj: newObj, promises: downloadPromises };
}

async function migrateData() {
  try {
    console.log('Fetching stacks...');
    const stacksRes = await fetch(`${BASE_URL}/stacks`);
    if (!stacksRes.ok) throw new Error(`Stacks fetch failed: ${stacksRes.status}`);
    const stacks = await stacksRes.json();

    console.log('Fetching portfolios...');
    const portfoliosRes = await fetch(`${BASE_URL}/portfolios`);
    if (!portfoliosRes.ok) throw new Error(`Portfolios fetch failed: ${portfoliosRes.status}`);
    const portfolios = await portfoliosRes.json();

    console.log(`Found ${stacks.length} stacks and ${portfolios.length} portfolios.`);

    // Process Stacks
    for (const stack of stacks) {
      console.log(`Processing stack: ${stack.name}`);
      const { updatedObj, promises } = processImagesInObject(stack, 'stacks');
      await Promise.all(promises);

      const { id, description, content, ...frontmatter } = updatedObj;
      const yamlStr = YAML.stringify(frontmatter);
      const bodyContent = content || description || '';
      const mdContent = `---\n${yamlStr}---\n\n${bodyContent}`;
      
      const safeName = (stack.name || id).toLowerCase().replace(/[^a-z0-9]+/g, '-');
      fs.writeFileSync(path.join(OUTPUT_DIR, 'stacks', `${safeName}.md`), mdContent);
    }

    // Process Portfolios
    for (const portfolio of portfolios) {
      console.log(`Processing portfolio: ${portfolio.title}`);
      const { updatedObj, promises } = processImagesInObject(portfolio, 'portfolios');
      await Promise.all(promises);

      const { id, description, content, ...frontmatter } = updatedObj;
      const yamlStr = YAML.stringify(frontmatter);
      const bodyContent = content || description || '';
      const mdContent = `---\n${yamlStr}---\n\n${bodyContent}`;
      
      const safeName = (portfolio.title || id).toLowerCase().replace(/[^a-z0-9]+/g, '-');
      fs.writeFileSync(path.join(OUTPUT_DIR, 'portfolios', `${safeName}.md`), mdContent);
    }

    console.log('Migration complete!');
  } catch (err) {
    console.error('Migration failed:', err);
  }
}

migrateData();
