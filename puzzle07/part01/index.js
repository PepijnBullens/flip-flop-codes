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
  let totalPaths = 0;

  for (let line of lines) {
    const [rows, cols] = line.split(" ").map(Number);

    const grid = [];

    for (let i = 0; i < rows; i++) {
      grid[i] = [];
      for (let j = 0; j < cols; j++) {
        if (i === 0 || j === 0) {
          grid[i][j] = 1;
        } else {
          grid[i][j] = grid[i - 1][j] + grid[i][j - 1];
        }
      }
    }

    const numPaths = grid[rows - 1][cols - 1];
    totalPaths += numPaths;
  }

  console.log(totalPaths);
});
