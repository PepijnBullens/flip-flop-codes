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

  let hight = 0;
  let highest = 0;

  let count = 1;

  let lastDir = null;
  for (let i = 0; i < data.length; i++) {
    const curr = data[i];
    if (curr !== "^" && curr !== "v") continue;

    if (lastDir !== curr) {
      count = 1;
    } else {
      count++;
    }

    if (curr === "^") {
      hight += count;
    } else if (curr === "v") {
      hight -= count;
    }

    lastDir = curr;

    if (highest < hight) highest = hight;
  }

  console.log(highest);
});
