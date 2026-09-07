const fs = require('fs');
const path = require('path');
const https = require('https');

const dirs = [
  path.join(__dirname, '../public/assets'),
  path.join(__dirname, '../public/assets/courses'),
  path.join(__dirname, '../public/assets/instructors'),
  path.join(__dirname, '../public/assets/reviews'),
];

dirs.forEach(d => {
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d, { recursive: true });
  }
});

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('Downloading official Ata Akademi logo...');
  const logoUrl = 'https://lh3.googleusercontent.com/aida/AEtjO1Xm2tyd2NDmuCqLhgOkOTr-x1ncPMCRYDMV8Dcy0bd9Q4sH4eatAe3cmpg8LrW5pvuk7uznM57oZduljsGv5ruks4M15rDQhozXA73OWqg6PuDDnpgJ93_Ea_2uSGmW61AlcbyXg_yNJ25e3xPh8SMbPr46TZRNSL-XO2oYVYag_PpDdUoQ27EmUfS8eTs3u2XuEOGdl-5ZbypHmilBOWRPonKhKhisQ_y5nVeDqPZJLtSoPJu6mlD_moG0CLSEkkEJQeEE5v9lQ4I';
  const logoDest = path.join(__dirname, '../public/assets/logo.png');
  
  try {
    await downloadFile(logoUrl, logoDest);
    console.log('Official logo downloaded successfully to public/assets/logo.png');
  } catch (err) {
    console.error('Error downloading logo:', err.message);
  }

  // Also download hero banner from Stitch screen
  const heroUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqVv9b_UZl_Z7jAeAmnCzody6dqcg8Q4m9Ge8raAB0ET1WqVSgerFh5KaOZx789GSkZKvFO4-s1OVQB6bXCk0sSl9dq3nsZ1JvsdOLuLUwdrEpR-U4LJltmJAvfKawkJUfhMDYW0IbyCcQpIkVsVzUeVD44rFGh2vTBojOrTANm3P_lMZ78BpZ-ZHpFJJrI8L-g7Dqp-5lJFaIICKpWMtS9cS9ZxJNWbFUmqpqExHNClpkLe_h2ILy3g';
  const heroDest = path.join(__dirname, '../public/assets/hero-banner.webp');
  try {
    await downloadFile(heroUrl, heroDest);
    console.log('Hero banner downloaded successfully to public/assets/hero-banner.webp');
  } catch (err) {
    console.error('Error downloading hero banner:', err.message);
  }

  // Download About campus image
  const aboutUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDF_Jc0j4pG5j2Kz0pXG8v5b9uX_1g1r0t9';
  // Let's create SVG fallback or sample placeholder images for all courses, instructors, reviews if needed
}

main();
