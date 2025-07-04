const fs = require("node:fs");

function readFile(path, callback) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      callback(err, null);
      return;
    }
    callback(null, data);
  });
}

readFile("../input.txt", (err, data) => {
  if (err) return;
  const lines = data.split(/\r?\n/).filter((line) => line.trim() !== "");

  // Find most common number
  const numberCounts = new Map();
  let mostCommonNumber = null;
  let highestCount = 0;

  for (const line of lines) {
    const num = parseInt(line);
    const count = (numberCounts.get(num) || 0) + 1;
    numberCounts.set(num, count);

    if (count > highestCount) {
      highestCount = count;
      mostCommonNumber = num;
    }
  }

  const charCounts = new Map();
  const string = lines.join("");

  for (const char of string) {
    charCounts.set(char, (charCounts.get(char) || 0) + 1);
  }

  let leastCommonChar = null;
  let lowestCount = Infinity;
  for (const [char, count] of charCounts) {
    if (count < lowestCount) {
      lowestCount = count;
      leastCommonChar = char;
    }
  }

  console.log(`${mostCommonNumber}${leastCommonChar}`);
});
