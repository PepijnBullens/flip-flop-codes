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
    const [xSize, ySize] = line.split(" ").map(Number);
    const zSize = xSize;

    const grid = [];

    for (let x = 0; x < xSize; x++) {
      grid[x] = [];
      for (let y = 0; y < ySize; y++) {
        grid[x][y] = [];
        for (let z = 0; z < zSize; z++) {
          if (x === 0 && y == 0 && z === 0) {
            grid[x][y][z] = 1;
          } else {
            let paths = 0;
            if (x > 0) paths += grid[x - 1][y][z];
            if (y > 0) paths += grid[x][y - 1][z];
            if (z > 0) paths += grid[x][y][z - 1];
            grid[x][y][z] = paths;
          }
        }
      }
    }

    const numPaths = grid[xSize - 1][ySize - 1][zSize - 1];
    totalPaths += numPaths;
  }

  console.log(totalPaths);
});
