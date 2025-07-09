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

  const visited = new Set();

  while (currentPos < sequence.length) {
    const currentTunnel = sequence[currentPos];
    visited.add(currentPos);

    let otherEnd = -1;
    for (let i = 0; i < sequence.length; i++) {
      if (i !== currentPos && sequence[i] === currentTunnel) {
        otherEnd = i;
        break;
      }
    }

    if (otherEnd != null && otherEnd !== -1) {
      visited.add(otherEnd);
      // distance between the two ends)
      const steps = Math.abs(otherEnd - currentPos);
      totalSteps += steps;

      // continue next position
      currentPos = otherEnd + 1;
    } else {
      currentPos++;
    }
  }

  // collect unvisited
  let notVisited = "";
  const seenUnvisited = new Set();
  for (let i = 0; i < sequence.length; i++) {
    if (!visited.has(i) && !seenUnvisited.has(sequence[i])) {
      notVisited += sequence[i];
      seenUnvisited.add(sequence[i]);
    }
  }

  console.log(notVisited);
});
