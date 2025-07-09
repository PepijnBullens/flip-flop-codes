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

  const skySize = 1000;
  const frameSize = 500;
  const seconds = 100;

  const birds = lines.map((line) => {
    const [x, y] = line.split(",").map(Number);
    return { speedX: x, speedY: y };
  });

  let birdsInFrame = 0;

  for (let i = 0; i < birds.length; i++) {
    const bird = birds[i];

    let x = (bird.speedX * seconds) % skySize;
    let y = (bird.speedY * seconds) % skySize;

    if (x < 0) x += skySize;
    if (y < 0) y += skySize;

    const frameStart = (skySize - frameSize) / 2;
    const frameEnd = frameStart + frameSize - 1;

    if (x >= frameStart && x <= frameEnd && y >= frameStart && y <= frameEnd) {
      birdsInFrame++;
    }
  }

  console.log(birdsInFrame);
});
