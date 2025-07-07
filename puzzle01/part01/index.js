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

  let count = 0;

  for (let i = 0; i < lines.length; i++) {
    let prev = null;

    for (let j = 0; j < lines[i].length; j++) {
      if (
        (prev == "b" && lines[i][j] == "a") ||
        (prev == "n" && lines[i][j] == "e") ||
        (prev == "n" && lines[i][j] == "a")
      ) {
        count++;
      }

      prev = lines[i][j];
    }
  }

  console.log(count);
});
