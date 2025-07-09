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

  const sequence = lines[0].trim();
  let totalSteps = 0;
  let currentPos = 0;

  while (currentPos < sequence.length) {
    const currentTunnel = sequence[currentPos];

    // OTher end of this tunnel
    let otherEnd = -1;
    for (let i = 0; i < sequence.length; i++) {
      if (i !== currentPos && sequence[i] === currentTunnel) {
        otherEnd = i;
        break;
      }
    }

    if (otherEnd != null && otherEnd !== -1) {
      const steps = Math.abs(otherEnd - currentPos);
      totalSteps += steps;

      // continue next position
      currentPos = otherEnd + 1;
    } else {
      currentPos++;
    }
  }

  console.log(`Total steps: ${totalSteps}`);
});
