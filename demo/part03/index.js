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

  let highest = [0, null];
  let commonness = new Map();
  for (let i = 0; i < lines.length; i++) {
    let num = parseInt(lines[i]);
    if (commonness.has(num)) {
      commonness.set(num, commonness.get(num) + 1);
    } else {
      commonness.set(num, 1);
    }

    if (commonness.get(num) > highest[0]) {
      highest[0] = commonness.get(num);
      highest[1] = num;
    }
  }

  const string = lines.join("");
  let charCommonness = new Map();
  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    if (charCommonness.has(char)) {
      charCommonness.set(char, charCommonness.get(char) + 1);
    } else {
      charCommonness.set(char, 1);
    }
  }

  let lowest = [Infinity, null];
  for (const [char, count] of charCommonness.entries()) {
    if (count < lowest[0]) {
      lowest[0] = count;
      lowest[1] = char;
    }
  }
  console.log(`${highest[1]}${lowest[1]}`);
});
