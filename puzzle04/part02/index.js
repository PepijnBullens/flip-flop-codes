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

  const coordinates = [];
  for (let i = 0; i < lines.length; i++) {
    const [xStr, yStr] = lines[i].split(",");
    const x = parseInt(xStr, 10);
    const y = parseInt(yStr, 10);
    if (Number.isInteger(x) && Number.isInteger(y)) {
      coordinates.push([x, y]);
    }
  }

  let totalSteps = 0;
  let currentX = 0;
  let currentY = 0;

  for (let i = 0; i < coordinates.length; i++) {
    const [targetX, targetY] = coordinates[i];

    const steps = Math.max(
      Math.abs(targetX - currentX),
      Math.abs(targetY - currentY)
    );
    totalSteps += steps;

    currentX = targetX;
    currentY = targetY;
  }

  console.log(`Total steps: ${totalSteps}`);
});
