const fs = require('fs');
const path = require('path');
const readline = require('readline');

let counter = 0;
let columns = [];
let diagonalDown = [];
let diagonalUp = [];

async function parseInput() {
  const pathToInput = path.join(__dirname, 'sample.txt');
  const fileStream = fs.createReadStream(pathToInput);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    // Do horizontal checks
    counter = counter + countXmas(line);

    // Create columns and diagonal arrays
    

    // Do the rest of the checks
    checkStrings(columns);
    checkStrings(diagonalDown);
    checkStrings(diagonalUp);
  }
}

const countXmas = (string) => {
  const substrings = findSubstrings(string);
  const xmasStrings = substrings.filter(string => string === 'XMAS' || string === 'SAMX');
  return xmasStrings.length;
}

const checkStrings = (array) => {
  array.forEach(string => {
    counter = counter + countXmas(string);
  });
};

const findSubstrings = (str) => {
  let result = [];
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      result.push(str.substring(i, j));
    }
  }
  return result;
}

console.log('Part 1: ', counter);

parseInput();