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

function labelBush(r, g, b) {
  const red = parseInt(r);
  const green = parseInt(g);
  const blue = parseInt(b);

  if (red === green || red === blue || green === blue) {
    return "special";
  }

  if (red > green && red > blue) {
    return "red";
  } else if (green > red && green > blue) {
    return "gren";
  } else if (blue > red && blue > green) {
    return "blue";
  }

  return "unknown";
}

readFile("../input.txt", (err, data) => {
  if (err) return;
  const lines = data.split(/\r?\n/).filter((line) => line.trim() !== "");

  let totalPrice = 0;

  for (let i = 0; i < lines.length; i++) {
    const values = lines[i].split(",");
    const r = values[0];
    const g = values[1];
    const b = values[2];

    const label = labelBush(r, g, b);

    if (label === "red") {
      totalPrice += 5;
    } else if (label === "gren") {
      totalPrice += 2;
    } else if (label === "blue") {
      totalPrice += 4;
    } else if (label === "special") {
      totalPrice += 10;
    }
  }

  console.log(totalPrice);
});
