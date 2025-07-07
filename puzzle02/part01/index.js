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

  for (let i = 0; i < data.length; i++) {
    if (data[i] == "^") hight++;
    if (data[i] == "v") hight--;

    if (highest < hight) highest = hight;
  }

  console.log(highest);
});
