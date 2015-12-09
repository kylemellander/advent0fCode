var fs = require('fs');

function countStringCode(c) {
  return c.length;
}

function countStringDisplay(c) {
  return c.replace(/\\\\|\\"|\\x[a-f0-9]{2}/g, "a").length - 2;
}

function spaceSaved(file) {
  var data = fs.readFileSync(file, 'utf-8').trimRight().split('\n');
  var result = 0;

  data.forEach(function(line) {
    result += countStringCode(line);
    result -= countStringDisplay(line);
  });

  return result;
}

console.log("Space Saved: " + spaceSaved('sleigh.txt'));
