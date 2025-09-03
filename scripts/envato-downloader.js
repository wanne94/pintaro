const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const https = require('https');

class EnvatoDownloader {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.downloadDir = path.join(__dirname, '../public/images/envato');
  }

  async init() {
    // Create download directory if it doesn't exist
    if (!fs.existsSync(this.downloadDir)) {
      fs.mkdirSync(this.downloadDir, { recursive: true });
    }

    this.browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    this.page = await this.browser.newPage();
  }

  async login() {
    console.log('Logging in to Envato Elements...');
    await this.page.goto('https://elements.envato.com/sign-in', { waitUntil: 'networkidle2' });
    
    // Enter credentials
    await this.page.type('#username', this.username);
    await this.page.type('#password', this.password);
    
    // Click login button
    await this.page.click('button[type="submit"]');
    
    // Wait for navigation
    await this.page.waitForNavigation({ waitUntil: 'networkidle2' });
    console.log('Login successful!');
  }

  async searchAndDownload(searchTerm, limit = 10) {
    console.log(`Searching for: ${searchTerm}`);
    
    // Navigate to search
    await this.page.goto(`https://elements.envato.com/photos/${encodeURIComponent(searchTerm)}`, {
      waitUntil: 'networkidle2'
    });

    // Wait for images to load
    await this.page.waitForSelector('.search-results-grid', { timeout: 10000 });

    // Get image URLs
    const images = await this.page.evaluate(() => {
      const imgs = document.querySelectorAll('.search-results-grid img');
      return Array.from(imgs).slice(0, 10).map(img => ({
        src: img.src,
        alt: img.alt || 'image'
      }));
    });

    console.log(`Found ${images.length} images`);

    // Download images
    for (let i = 0; i < Math.min(images.length, limit); i++) {
      const img = images[i];
      const filename = `${searchTerm.replace(/\s+/g, '-')}-${i + 1}.jpg`;
      await this.downloadImage(img.src, filename);
    }
  }

  async downloadImage(url, filename) {
    return new Promise((resolve, reject) => {
      const filePath = path.join(this.downloadDir, filename);
      const file = fs.createWriteStream(filePath);

      https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded: ${filename}`);
          resolve();
        });
      }).on('error', (err) => {
        fs.unlink(filePath, () => {});
        console.error(`Error downloading ${filename}:`, err.message);
        reject(err);
      });
    });
  }

  async close() {
    await this.browser.close();
  }
}

// Usage
async function main() {
  const downloader = new EnvatoDownloader('sehovickenan', '062511871Kenan!');
  
  try {
    await downloader.init();
    await downloader.login();
    
    // Search and download images - customize these searches as needed
    await downloader.searchAndDownload('business professional', 5);
    await downloader.searchAndDownload('modern office', 5);
    await downloader.searchAndDownload('technology', 5);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await downloader.close();
  }
}

// Run the script
main();