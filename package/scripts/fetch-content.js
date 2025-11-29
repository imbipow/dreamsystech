// Script to fetch content from Google Drive and save it locally before build
const fs = require('fs');
const path = require('path');
const https = require('https');

const GOOGLE_DRIVE_URL = process.env.NEXT_PUBLIC_CONTENT_JSON_URL || 'https://drive.google.com/uc?export=download&id=1rBGPr7qSDz5SWKwthips60t2WaxwMEEY';
const OUTPUT_PATH = path.join(__dirname, '..', 'src', 'data', 'content.json');

console.log('Fetching content from Google Drive...');
console.log('URL:', GOOGLE_DRIVE_URL);

function fetchWithRedirect(url, depth = 0) {
  if (depth > 5) {
    console.error('Too many redirects');
    console.log('Using existing local content.json');
    process.exit(0);
    return;
  }

  const urlModule = url.startsWith('https') ? https : require('http');

  urlModule.get(url, (response) => {
    // Handle redirects
    if ([301, 302, 303, 307, 308].includes(response.statusCode)) {
      const redirectUrl = response.headers.location;
      console.log(`Redirect (${response.statusCode}) to:`, redirectUrl);
      fetchWithRedirect(redirectUrl, depth + 1);
      return;
    }

    handleResponse(response);
  }).on('error', (error) => {
    console.error('Error fetching content:', error);
    console.log('Using existing local content.json');
    process.exit(0);
  });
}

fetchWithRedirect(GOOGLE_DRIVE_URL);

function handleResponse(response) {
  if (response.statusCode !== 200) {
    console.error('Failed to fetch content. Status code:', response.statusCode);
    console.log('Using existing local content.json');
    process.exit(0);
    return;
  }

  let data = '';

  response.on('data', (chunk) => {
    data += chunk;
  });

  response.on('end', () => {
    try {
      // Verify it's valid JSON
      const jsonData = JSON.parse(data);

      // Ensure output directory exists
      const outputDir = path.dirname(OUTPUT_PATH);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Write to file
      fs.writeFileSync(OUTPUT_PATH, JSON.stringify(jsonData, null, 2));
      console.log('✅ Content successfully fetched and saved to:', OUTPUT_PATH);
      process.exit(0);
    } catch (error) {
      console.error('Error parsing or saving JSON:', error);
      console.log('Using existing local content.json');
      process.exit(0);
    }
  });
}
