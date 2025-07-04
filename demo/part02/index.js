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
  let sum = 0;
  for (let i = 0; i < lines.length; i++) {
    sum += parseInt(lines[i]);
  }
  console.log(Math.round(sum / lines.length));
});
