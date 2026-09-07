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
    if (!url || !url.startsWith('http')) {
      return resolve(false);
    }
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        fs.unlink(dest, () => {});
        return resolve(false);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(true));
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      resolve(false);
    });
  });
}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  console.log('Downloading official logo...');
  const logoUrl = 'https://lh3.googleusercontent.com/aida/AEtjO1Xm2tyd2NDmuCqLhgOkOTr-x1ncPMCRYDMV8Dcy0bd9Q4sH4eatAe3cmpg8LrW5pvuk7uznM57oZduljsGv5ruks4M15rDQhozXA73OWqg6PuDDnpgJ93_Ea_2uSGmW61AlcbyXg_yNJ25e3xPh8SMbPr46TZRNSL-XO2oYVYag_PpDdUoQ27EmUfS8eTs3u2XuEOGdl-5ZbypHmilBOWRPonKhKhisQ_y5nVeDqPZJLtSoPJu6mlD_moG0CLSEkkEJQeEE5v9lQ4I';
  await downloadFile(logoUrl, path.join(__dirname, '../public/assets/logo.png'));
  console.log('Logo saved to public/assets/logo.png');

  const screenUrls = [
    'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1YTIwMzI4MmE5MTAwNWYxMDMwMGY0M2IzODZhEgsSBxCJ7ZruuRAYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTAwMTg3Mzc4NDU1NDQyNjc4Mg&filename=&opi=89354086',
    'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1YTIwMzJkNTIwNTgwNGU3NTgwZTZkMWNkOGJjEgsSBxCJ7ZruuRAYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTAwMTg3Mzc4NDU1NDQyNjc4Mg&filename=&opi=89354086',
    'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1YTIwMzJmMTQwNWEwNGU3NGE1OTI1MDBmZWI1EgsSBxCJ7ZruuRAYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTAwMTg3Mzc4NDU1NDQyNjc4Mg&filename=&opi=89354086',
    'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1YTIwMzI5OTdhMjkwMjNiZTQzZTgxMzhlZTI4EgsSBxCJ7ZruuRAYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTAwMTg3Mzc4NDU1NDQyNjc4Mg&filename=&opi=89354086'
  ];

  const allImages = [];
  for (const url of screenUrls) {
    try {
      const html = await fetchUrl(url);
      const imgRegex = /<img[^>]+src="([^">]+)"/g;
      let match;
      while ((match = imgRegex.exec(html)) !== null) {
        if (match[1].startsWith('http') && !allImages.includes(match[1])) {
          allImages.push(match[1]);
        }
      }
    } catch (e) {
      console.error('Error fetching screen html:', e.message);
    }
  }

  console.log(`Found ${allImages.length} images across Stitch screens.`);

  // Map images to specific local asset names
  const assetMappings = [
    { dest: 'hero-banner.webp', index: 3 },
    { dest: 'about-campus.webp', index: 4 },
    { dest: 'courses/ingilizce.webp', index: 5 },
    { dest: 'courses/almanca.webp', index: 6 },
    { dest: 'courses/romence.webp', index: 7 },
    { dest: 'courses/korece.webp', index: 8 },
    { dest: 'courses/italyanca.webp', index: 9 },
    { dest: 'courses/hizli-okuma.webp', index: 10 },
    { dest: 'courses/diksiyon.webp', index: 11 },
    { dest: 'instructors/instructor-1.webp', index: 12 },
    { dest: 'instructors/instructor-2.webp', index: 13 },
    { dest: 'instructors/instructor-3.webp', index: 14 },
    { dest: 'instructors/instructor-4.webp', index: 15 },
    { dest: 'instructors/instructor-5.webp', index: 16 },
    { dest: 'reviews/student-1.webp', index: 17 },
    { dest: 'reviews/student-2.webp', index: 18 },
    { dest: 'reviews/student-3.webp', index: 19 },
    { dest: 'reviews/student-4.webp', index: 20 },
  ];

  for (const item of assetMappings) {
    const targetPath = path.join(__dirname, '../public/assets', item.dest);
    if (allImages[item.index]) {
      console.log(`Downloading ${item.dest} from image #${item.index}...`);
      await downloadFile(allImages[item.index], targetPath);
    }
  }

  console.log('Asset downloading completed.');
}

run();
