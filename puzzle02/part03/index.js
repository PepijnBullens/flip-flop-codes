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

function fib(n) {
  return n < 1 ? 0 : n <= 2 ? 1 : fib(n - 1) + fib(n - 2);
}

readFile("../input.txt", (err, data) => {
  if (err) return;

  let hight = 0;
  let highest = 0;

  let prev = "";

  for (let i = 0; i < data.length; i++) {
    if (prev.slice(-1) == data[i] || prev.length == 0) {
      prev += data[i];
    } else {
      if (prev.slice(-1) == "^") hight += fib(prev.length);
      else if (prev.slice(-1) == "v") hight -= fib(prev.length);
      prev = data[i];
    }

    if (highest < hight) highest = hight;
  }

  if (prev.length > 0) {
    if (prev.slice(-1) == "^") hight += fib(prev.length);
    else if (prev.slice(-1) == "v") hight -= fib(prev.length);
    if (highest < hight) highest = hight;
  }

  console.log(highest);
});
