const fs = require('fs');
const prompt = require('prompt-sync')({sigint: true});

/**
 * Reads the text file with the given path and prints the contents of that file.
 */

const cat = path => {
  try {
    const contents = fs.readFileSync(path, 'utf8');
    console.log(contents);
  } catch(e) {
    console.error(`Error reading ${path}\n${e}`);
    process.exit(1);
  }
}

if (process.argv.length < 3) {
  const path = prompt('Enter a file path: ');
  cat(path);

} else {
  cat(process.argv[2]);
}