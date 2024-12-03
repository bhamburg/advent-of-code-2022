const fs = require('fs');
const path = require('path');
const readline = require('readline');

let reports = [];
let dampenedSafeReports = 0;
let safeReports = 0;

async function parseInput() {
  const pathToInput = path.join(__dirname, 'input.txt');
  const fileStream = fs.createReadStream(pathToInput);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    reports.push(line.split(/\s+/));
  }

  const problemCheck = (report) => {
    let problems = [];
    report.forEach((level, index) => {
      // distance check
      if (index < report.length) {
        const diff = Math.abs(level - (report[index + 1]));
        if (diff < 1 || diff > 3) {
          problems.push(index);
        }
      }
      // direction check
      if (index > 0 && index < report.length) {
        if (
          (report[index - 1] - level > 0) !== (level - report[index + 1] > 0) &&
          (report[index - 1] - level < 0) !== (level - report[index + 1] < 0)
        ) {
            problems.push(index);
        }
      }
    });
    return problems;
  };

  const dampenedProblemCheck = (report) => {
    let safe = 0;
    report.forEach((level, index) => {
      const dampenedReport = [
        ...report.slice(0, index),
        ...report.slice(index + 1)
      ];
      problemCheck(dampenedReport);
      if (problemCheck(dampenedReport).length === 0) {
        safe++;
      }
    });
    return safe > 0;
  };

  // Part 1
  reports.forEach(report => {
    if (problemCheck(report).length === 0) {
      safeReports++;
    }
  });

  console.log('Part 1:', safeReports);

  // Part 2
  reports.forEach(report => {
    if (dampenedProblemCheck(report)) {
      dampenedSafeReports++;
    }
  });
  console.log('Part 2:', dampenedSafeReports);
}

parseInput();