const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

// Get all JS/JSX files
const files = getAllFiles(path.join(__dirname, 'src'));

// Recursive function to fix imports for any folder inside src/components
function fixImportsForFolder(folderPath) {
  const components = fs.readdirSync(folderPath);

  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    components.forEach(component => {
      const regex = new RegExp(`(['"].*\\/cards\\/)${component.toLowerCase()}(['"])`, 'gi');
      content = content.replace(regex, `$1${component}$2`);
    });

    fs.writeFileSync(file, content, 'utf8');
  });
}

// Fix imports in cards folder
fixImportsForFolder(path.join(__dirname, 'src/components/cards'));

console.log('All import paths fixed!');
