#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const IMAGES_DIR = path.join(process.cwd(), 'public/images');
const OPTIMIZED_DIR = path.join(IMAGES_DIR, 'optimized');
const SIZES = {
  thumbnail: 400,
  mobile: 768,
  tablet: 1024,
  desktop: 1920
};

// Quality settings
const JPEG_QUALITY = 85;
const WEBP_QUALITY = 85;

// Ensure optimized directory exists
if (!fs.existsSync(OPTIMIZED_DIR)) {
  fs.mkdirSync(OPTIMIZED_DIR, { recursive: true });
}

// Check if ImageMagick is installed
function checkDependencies() {
  try {
    execSync('which convert', { stdio: 'pipe' });
    console.log('✅ ImageMagick found');
    return true;
  } catch {
    console.error('❌ ImageMagick not found. Installing...');
    try {
      execSync('sudo apt-get update && sudo apt-get install -y imagemagick', { stdio: 'inherit' });
      return true;
    } catch (error) {
      console.error('Failed to install ImageMagick. Please install it manually: sudo apt-get install imagemagick');
      return false;
    }
  }
}

// Get all image files
function getAllImages(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !filePath.includes('optimized')) {
      getAllImages(filePath, fileList);
    } else if (stat.isFile() && /\.(jpg|jpeg|png)$/i.test(file)) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Optimize single image
function optimizeImage(inputPath) {
  const relativePath = path.relative(IMAGES_DIR, inputPath);
  const parsedPath = path.parse(relativePath);
  const outputDir = path.join(OPTIMIZED_DIR, parsedPath.dir);
  
  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const baseName = parsedPath.name;
  const ext = parsedPath.ext.toLowerCase();
  
  console.log(`📸 Processing: ${relativePath}`);
  
  try {
    // Original optimized version
    const outputPath = path.join(outputDir, `${baseName}${ext}`);
    const resizeCmd = `convert "${inputPath}" -strip -quality ${JPEG_QUALITY} -resize "1920x1920>" "${outputPath}"`;
    execSync(resizeCmd);
    
    // WebP version
    const webpPath = path.join(outputDir, `${baseName}.webp`);
    const webpCmd = `convert "${inputPath}" -strip -quality ${WEBP_QUALITY} -resize "1920x1920>" -define webp:method=6 "${webpPath}"`;
    execSync(webpCmd);
    
    // Get file sizes for comparison
    const originalSize = fs.statSync(inputPath).size / 1024 / 1024;
    const optimizedSize = fs.statSync(outputPath).size / 1024 / 1024;
    const webpSize = fs.statSync(webpPath).size / 1024 / 1024;
    
    console.log(`  ✅ Original: ${originalSize.toFixed(2)}MB → Optimized: ${optimizedSize.toFixed(2)}MB → WebP: ${webpSize.toFixed(2)}MB`);
    console.log(`  💾 Saved: ${(originalSize - webpSize).toFixed(2)}MB (${((1 - webpSize/originalSize) * 100).toFixed(0)}%)`);
    
    return {
      original: originalSize,
      optimized: optimizedSize,
      webp: webpSize
    };
  } catch (error) {
    console.error(`  ❌ Failed to optimize ${relativePath}:`, error.message);
    return null;
  }
}

// Main function
async function main() {
  console.log('🚀 Starting image optimization...\n');
  
  // Check dependencies
  if (!checkDependencies()) {
    process.exit(1);
  }
  
  // Get all images
  const images = getAllImages(IMAGES_DIR);
  console.log(`Found ${images.length} images to optimize\n`);
  
  let totalOriginal = 0;
  let totalOptimized = 0;
  let totalWebP = 0;
  let successCount = 0;
  
  // Process each image
  for (const imagePath of images) {
    const result = optimizeImage(imagePath);
    if (result) {
      totalOriginal += result.original;
      totalOptimized += result.optimized;
      totalWebP += result.webp;
      successCount++;
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Optimization Summary:');
  console.log('='.repeat(60));
  console.log(`✅ Successfully optimized: ${successCount}/${images.length} images`);
  console.log(`📦 Original total size: ${totalOriginal.toFixed(2)}MB`);
  console.log(`📦 Optimized JPEG/PNG size: ${totalOptimized.toFixed(2)}MB`);
  console.log(`📦 WebP size: ${totalWebP.toFixed(2)}MB`);
  console.log(`💾 Total savings with WebP: ${(totalOriginal - totalWebP).toFixed(2)}MB (${((1 - totalWebP/totalOriginal) * 100).toFixed(0)}%)`);
  console.log('\n✨ Image optimization complete!');
}

// Run the script
main().catch(console.error);