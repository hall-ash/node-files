const prompt = require('prompt-sync')({sigint: true});
const axios = require('axios');
const { cat } = require('./step1');

// checks if string is a txt file
const isTxtFile = file => {
  const ext =  file.split('.').pop();
  return ext === 'txt';
}

/**
 * Reads the content of the given url and prints it to the console.
 */
const webCat = url => {
  axios.get(url)
    .then(resp => console.log(resp.data))
    .catch(e => {
      console.error(`Error fetching ${url}\n${e}`);
      process.exit(1);
    });
}

// asks for user input if 3rd arg isn't provided
//const input = process.argv.length < 3 ? prompt('Enter a file path or url: ') : process.argv[2];

// if arg is url print webpage, else print text file contents
//isTxtFile(input) ? cat(input) : webCat(input);

module.exports = {
  isTxtFile,
  webCat
}
