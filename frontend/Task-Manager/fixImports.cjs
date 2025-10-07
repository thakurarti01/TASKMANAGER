const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

// Get all JS/JSX files
const files = getAllFiles(path.join(__dirname, 'src'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Example: fix InfoCard imports
  content = content.replace(/(['"])\.\.\/\.\.\/components\/cards\/infocard(['"])/gi, '$1../../components/cards/InfoCard$2');

  fs.writeFileSync(file, content, 'utf8');
});

console.log('Import paths fixed!');
