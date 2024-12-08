/* eslint-disable @typescript-eslint/no-require-imports */
// this is a scripts file so disable es lint require imports
const fs = require('fs');
const path = require('path');
/* eslint-enable @typescript-eslint/no-require-imports */

// folder path
const genFolder = path.join(__dirname, '..', 'public', 'gen');

// Maximum number of files allowed
const maxFiles = 100; 

 // 7 days in milliseconds
const maxAgeMs = 7 * 24 * 60 * 60 * 1000;

function cleanupGenFolder() {
    const files = fs.readdirSync(genFolder)
        .map(file => ({
            name: file,
            time: fs.statSync(path.join(genFolder, file)).mtime.getTime(),
        }))
        .sort((a, b) => a.time - b.time);

    // Delete oldest files if limit exceeded
    if (files.length > maxFiles) {
        const excessFiles = files.slice(0, files.length - maxFiles);
        excessFiles.forEach(file => {
            fs.unlinkSync(path.join(genFolder, file.name));
            console.log(`Deleted old file: ${file.name}`);
        });
    }

    // Delete files older than maxAgeMs
    const now = Date.now();
    files.forEach(file => {
        if (now - file.time > maxAgeMs) {
            fs.unlinkSync(path.join(genFolder, file.name));
            console.log(`Deleted expired file: ${file.name}`);
        }
    });
}

cleanupGenFolder();
