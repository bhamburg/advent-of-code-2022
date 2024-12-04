const fs = require('fs');
const path = require('path');
const readline = require('readline');

let mulString = '';
let mulArray = [];

const inputRegex = /mul\([0-9]+,[0-9]+\)/gm;
const conditionalInputRegex = /mul\([0-9]+,[0-9]+\)|do\(\)|don't\(\)/gm;
const mulRegex = /\(|,|\)/;

let doing = true;
let total = 0;
let conditionalTotal = 0

async function parseInput() {
  const pathToInput = path.join(__dirname, 'input.txt');
  const fileStream = fs.createReadStream(pathToInput);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const conditionalMul = (array) => {
    array.forEach(element => {
      if (element === "do()") {
        doing = true;
      }
      else if (element === "don't()") {
        doing = false;
      }
      else if (doing) {
        const split = element.split(mulRegex);
        conditionalTotal = conditionalTotal + (split[1] * split[2]);
      }
    });
  };

  for await (const line of rl) {
    mulString = line;

    // Part 1
    mulArray = mulString.match(inputRegex);
    mulArray.forEach(element => {
      const split = element.split(mulRegex);
      total = total + (split[1] * split[2]);
    })

    // Part 2
    conditionalMul(mulString.match(conditionalInputRegex));
  }
  
  console.log('Part 1:', total);
  console.log('Part 2:', conditionalTotal);
}

parseInput();