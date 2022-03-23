const fs = require('fs');
const prompt = require('prompt-sync')({sigint: true});
const axios = require('axios');
const { cat } = require('./step1');
const { isTxtFile, webCat } = require('./step2');


/**
 * Writes contents of the inputFile to the outputFile.
 * outputFile: path of file to output contents to
 * inputFile: path of file to copy
 */
const catWrite = (outputFile, inputFile) => {
  try {
    const contents = fs.readFileSync(inputFile, 'utf8');
    fs.writeFileSync(`./outputs/${outputFile}`, contents);

  } catch (e) {
    console.error(`Couldn't write ${outputFile}/n${e}`);
  }
}

/**
 * Writes contents of the webpage's HTML to the outputFile.
 * outputFile: path of file to output webpage contents to
 * url: url of webpage
 */
const webCatWrite = (outputFile, url) => {
  axios.get(url)
    .then(resp => {
      const contents = resp.data;
      fs.writeFileSync(`./outputs/${outputFile}`, contents);
    })
    .catch(e => {
      console.error(`Error fetching ${url}\n${e}`);
      process.exit(1);
    });
}

const numArgs = process.argv.length;

if (process.argv[2] === '--out') {
  if (numArgs === 5) {
    const outputFile = process.argv[3];
    const input = process.argv[4];
    isTxtFile(input) ? catWrite(outputFile, input) : webCatWrite(outputFile, input);

  } else {
    console.log('Not enough args given.');
  }
  
} else {
  // asks for user input if 3rd arg isn't provided
  const input = numArgs < 3 ? prompt('Enter a file path or url: ') : process.argv[2];

  // if arg is url print webpage, else print text file contents
  isTxtFile(input) ? cat(input) : webCat(input);
}

