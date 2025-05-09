const fs = require('fs');
const path = require('path');
const matter = require('gray-matter'); // Using CommonJS require for a simple Node script

console.log('Attempting to test gray-matter module...');

try {
  const postFilePath = path.join(process.cwd(), '_posts', 'bai-viet-mau-1.md');
  console.log(`Reading file: ${postFilePath}`);
  
  if (!fs.existsSync(postFilePath)) {
    console.error(`Error: Markdown file not found at ${postFilePath}`);
    process.exit(1);
  }
  
  const fileContents = fs.readFileSync(postFilePath, 'utf8');
  console.log('File content read successfully.');
  
  const matterResult = matter(fileContents);
  console.log('gray-matter processed the file successfully.');
  console.log('Frontmatter data:', matterResult.data);
  
} catch (error) {
  console.error('Error during test-module.js execution:', error);
}
