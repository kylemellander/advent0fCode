var fs = require('fs');

console.log("Santa ended on floor " + santasFloor('input.txt'));
console.log("Santa Entered the Basement on move " + santasInTheBasement('input.txt'));

function santasFloor(file) {
  var data = fs.readFileSync(file, 'utf-8').trimRight().split("");

  return move(data);
}

function santasInTheBasement(file) {
  var data = fs.readFileSync(file, 'utf-8').trimRight().split("");

  return move(data, true);
}

function move(data, check) {
  var floor = 0;
  var lastFloor;

  data.forEach(function(move, index) {
    if (!lastFloor) {
      if (check && floor === -1) {
        lastFloor = index;
      } else if (move === "\(") {
        floor += 1;
      } else if (move === "\)") {
        floor -= 1;
      }
    }
  });

  return lastFloor || floor;
}
