const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const IMAGE_CONFIG = {
  hero: { width: 1920, height: 1080, quality: 85 },
  card: { width: 800, height: 600, quality: 85 },
  gallery: { width: 1200, height: 800, quality: 85 },
  thumbnail: { width: 400, height: 300, quality: 80 }
};

const SOURCE_DIR = path.join(__dirname, '../public/images/services');
const OUTPUT_DIR = path.join(__dirname, '../public/images/optimized');

async function optimizeImage(inputPath, outputName, config) {
  const formats = ['jpeg', 'webp'];
  
  for (const format of formats) {
    const outputPath = path.join(OUTPUT_DIR, `${outputName}.${format}`);
    
    await sharp(inputPath)
      .resize(config.width, config.height, {
        fit: 'cover',
        position: 'center'
      })
      .toFormat(format, { 
        quality: config.quality,
        mozjpeg: format === 'jpeg'
      })
      .toFile(outputPath);
    
    const stats = await fs.stat(outputPath);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
    console.log(`✓ Created ${outputName}.${format} (${sizeMB}MB)`);
  }
}

async function generateBlurPlaceholder(inputPath, outputName) {
  const outputPath = path.join(OUTPUT_DIR, `${outputName}-placeholder.jpg`);
  
  const { data, info } = await sharp(inputPath)
    .resize(20, null, { 
      withoutEnlargement: true 
    })
    .blur(5)
    .toBuffer({ resolveWithObject: true });
  
  const base64 = `data:image/${info.format};base64,${data.toString('base64')}`;
  
  // Save placeholder data
  const placeholderPath = path.join(OUTPUT_DIR, 'placeholders.json');
  let placeholders = {};
  
  try {
    const existing = await fs.readFile(placeholderPath, 'utf-8');
    placeholders = JSON.parse(existing);
  } catch (e) {
    // File doesn't exist yet
  }
  
  placeholders[outputName] = base64;
  await fs.writeFile(placeholderPath, JSON.stringify(placeholders, null, 2));
  
  console.log(`✓ Generated blur placeholder for ${outputName}`);
}

async function main() {
  // Create output directory
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  
  // Image optimization map
  const imageMap = {
    // Hero image
    'hero-renovation.jpg': {
      sizes: ['hero'],
      name: 'hero-renovation'
    },
    
    // Service card images
    'painting-female-painter.jpg': {
      sizes: ['card', 'gallery'],
      name: 'painting-main'
    },
    'plastering-worker-wall.jpg': {
      sizes: ['card', 'gallery'],
      name: 'plastering-main'
    },
    'facade-building.jpg': {
      sizes: ['card', 'gallery'],
      name: 'facade-main'
    },
    'painting-tools.jpg': {
      sizes: ['card', 'gallery'],
      name: 'decorative-main'
    },
    'general-renovation-planks.jpg': {
      sizes: ['card', 'gallery'],
      name: 'mold-main'
    },
    'flooring-oak-wood.jpg': {
      sizes: ['card', 'gallery'],
      name: 'flooring-main'
    },
    
    // Gallery images
    'painting-brush-bucket.jpg': {
      sizes: ['gallery', 'thumbnail'],
      name: 'painting-gallery-1'
    },
    'plastering-hand-glove.jpg': {
      sizes: ['gallery', 'thumbnail'],
      name: 'plastering-gallery-1'
    },
    'facade-bricklaying.jpg': {
      sizes: ['gallery', 'thumbnail'],
      name: 'facade-gallery-1'
    },
    'flooring-laminate-samples.jpg': {
      sizes: ['gallery', 'thumbnail'],
      name: 'flooring-gallery-1'
    },
    'flooring-laminate-tools.jpg': {
      sizes: ['gallery', 'thumbnail'],
      name: 'flooring-gallery-2'
    },
    'general-tile-installation.jpg': {
      sizes: ['gallery', 'thumbnail'],
      name: 'mold-gallery-1'
    }
  };
  
  console.log('Starting image optimization...\n');
  
  for (const [filename, config] of Object.entries(imageMap)) {
    const inputPath = path.join(SOURCE_DIR, filename);
    
    try {
      const stats = await fs.stat(inputPath);
      const originalSizeMB = (stats.size / 1024 / 1024).toFixed(2);
      console.log(`\nProcessing ${filename} (${originalSizeMB}MB):`);
      
      // Generate different sizes
      for (const size of config.sizes) {
        const outputName = `${config.name}-${size}`;
        await optimizeImage(inputPath, outputName, IMAGE_CONFIG[size]);
      }
      
      // Generate blur placeholder
      await generateBlurPlaceholder(inputPath, config.name);
      
    } catch (error) {
      console.error(`Error processing ${filename}:`, error.message);
    }
  }
  
  console.log('\n✅ Image optimization complete!');
  
  // Calculate total size reduction
  const originalFiles = await fs.readdir(SOURCE_DIR);
  let originalTotal = 0;
  
  for (const file of originalFiles) {
    if (file.endsWith('.jpg') || file.endsWith('.png')) {
      const stats = await fs.stat(path.join(SOURCE_DIR, file));
      originalTotal += stats.size;
    }
  }
  
  const optimizedFiles = await fs.readdir(OUTPUT_DIR);
  let optimizedTotal = 0;
  
  for (const file of optimizedFiles) {
    if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.webp')) {
      const stats = await fs.stat(path.join(OUTPUT_DIR, file));
      optimizedTotal += stats.size;
    }
  }
  
  const reduction = ((1 - optimizedTotal / originalTotal) * 100).toFixed(1);
  console.log(`\n📊 Size reduction: ${(originalTotal / 1024 / 1024).toFixed(1)}MB → ${(optimizedTotal / 1024 / 1024).toFixed(1)}MB (${reduction}% smaller)`);
}

main().catch(console.error);