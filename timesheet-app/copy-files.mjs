import { copy, emptyDirSync } from 'fs-extra';

async function copyFiles() {
  try {
    emptyDirSync('../www/assets');
    await copy('dist', '../www');
    console.log('Files copied successfully.');
  } catch (err) {
    console.error('Error copying files:', err);
  }
}

copyFiles();
