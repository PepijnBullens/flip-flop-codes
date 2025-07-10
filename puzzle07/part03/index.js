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
  let totalPaths = BigInt(0);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const [dimensions, size] = line.split(" ").map(Number);
    const end = Array(dimensions).fill(size - 1);

    const memo = new Map();

    function countPaths(pos) {
      const key = pos.join(",");
      if (memo.has(key)) return memo.get(key);

      if (pos.every((v) => v === 0)) return BigInt(1);

      let paths = BigInt(0);

      for (let i = 0; i < pos.length; i++) {
        if (pos[i] > 0) {
          const prev = [...pos];
          prev[i]--;
          paths += countPaths(prev);
        }
      }

      memo.set(key, paths);
      return paths;
    }

    const paths = countPaths(end);
    totalPaths += paths;
  }

  console.log(Number(totalPaths.toString()));
});
