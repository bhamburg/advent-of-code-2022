const fs = require('fs');
const path = require('path');
const readline = require('readline');

let counter = 0;
let rows = [];
let columns = [];
let diagonalDown = [];
let diagonalUp = [];

async function parseInput() {
  const pathToInput = path.join(__dirname, 'input.txt');
  const fileStream = fs.createReadStream(pathToInput);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    // Create rows
    rows.push(line);

    // Create and test columns
    line.split('').forEach((char, index) => {
      if (columns[index]) {
        columns[index] = columns[index].concat(char);
      }
      else {
        columns.push(char);
      }
    })
  }

  checkStrings(rows);
  checkStrings(columns);

  // diagonal checks
  for (let k = 0; k < rows[0].length * 2; k++) {
    let stringUp = '';
    let stringDown = '';
    for (let j = 0; j <= k; j++) {
      let i = k - j;
      if (i < rows[0].length && j < rows[0].length) {
        stringUp = stringUp + rows[i][j];
        stringDown = stringDown + rows[j].split('').reverse()[i];
      }
    }
    diagonalUp.push(stringUp);
    diagonalDown.push(stringDown);
  }
  checkStrings(diagonalUp);
  checkStrings(diagonalDown);

  console.log('Part 1: ', counter);
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

parseInput();