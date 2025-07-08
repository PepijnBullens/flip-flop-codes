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
    return "Special";
  }

  if (red > green && red > blue) {
    return "Red";
  } else if (green > red && green > blue) {
    return "Green";
  } else if (blue > red && blue > green) {
    return "Blue";
  }

  return "Unknown";
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

    if (label === "Red") {
      totalPrice += 5;
    } else if (label === "Green") {
      totalPrice += 2;
    } else if (label === "Blue") {
      totalPrice += 4;
    } else if (label === "Special") {
      totalPrice += 10;
    }
  }

  console.log(totalPrice);
});
