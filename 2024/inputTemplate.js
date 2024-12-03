const fs = require('fs');
const path = require('path');
const readline = require('readline');

async function parseInput() {
  const pathToInput = path.join(__dirname, 'input.txt');
  const fileStream = fs.createReadStream(pathToInput);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    console.log(line);
  }
}

parseInput();