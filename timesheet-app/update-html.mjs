import pkg from 'fs-extra';
const { readFile, writeFile } = pkg;

const htmlFilePath = 'dist/index.html';

async function updateHtmlPaths() {
  try {
    const htmlContent = await readFile(htmlFilePath, 'utf8');

    // Modify the asset paths as needed (e.g., remove leading '/')
    const updatedHtmlContent = htmlContent.replace(/.\/assets\//g, 'assets/');

    await writeFile(htmlFilePath, updatedHtmlContent, 'utf8');
    console.log('HTML file paths updated successfully.');
  } catch (error) {
    console.error('Error updating HTML file paths:', error);
  }
}

updateHtmlPaths();
