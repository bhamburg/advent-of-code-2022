const fs = require('fs');
const path = require('path');
const readline = require('readline');

let columnA = [];
let columnB = [];
let distance = 0;
let similarity = 0;

async function parseInput() {
  const pathToInput = path.join(__dirname, 'input.txt');
  const fileStream = fs.createReadStream(pathToInput);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    columnA.push(parseInt(line.substring(0, 5)));
    columnB.push(parseInt(line.substring(8)));
  }

  // calculate cumulative distance
  columnA.sort().forEach((element, index) => {
    distance = distance + Math.abs(element - columnB.sort()[index]);
  });

  // calculate cumulative similarity score
  columnA.forEach(elA => {
    const matches = columnB.filter(elB => elB === elA);
    if (matches.length) {
      similarity = similarity + (matches[0] * matches.length);
    }
  });

  console.log('Part 1:', distance);
  console.log('Part 2:', similarity);
}

parseInput();