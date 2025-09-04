#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Helper function to copy folder recursively
function copyFolderRecursive(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }
  
  const files = fs.readdirSync(source);
  files.forEach(file => {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);
    
    if (fs.lstatSync(sourcePath).isDirectory()) {
      copyFolderRecursive(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  });
}

// This script moves German content to root after static export
const outDir = path.join(process.cwd(), 'out');
const deDir = path.join(outDir, 'de');

console.log('📦 Reorganizing static files - German as root...');

if (fs.existsSync(deDir)) {
  // Backup existing root index if exists
  const rootIndex = path.join(outDir, 'index.html');
  if (fs.existsSync(rootIndex)) {
    fs.renameSync(rootIndex, path.join(outDir, 'index.backup.html'));
  }
  
  // Copy German index.html to root
  const deIndex = path.join(deDir, 'index.html');
  if (fs.existsSync(deIndex)) {
    fs.copyFileSync(deIndex, path.join(outDir, 'index.html'));
    console.log('✅ Copied German index.html to root');
  }
  
  // Copy German services to root if not already there
  const deServices = path.join(deDir, 'services');
  const rootServices = path.join(outDir, 'services');
  
  if (!fs.existsSync(rootServices) && fs.existsSync(deServices)) {
    // If root services doesn't exist, copy from German
    copyFolderRecursive(deServices, rootServices);
    console.log('✅ Copied German services to root');
  }
  
  console.log('✅ German version also available at /de');
}

console.log('✅ Static reorganization complete!');