var fs = require('fs');

function christmasLights(file, iterations, stuckOn) {
  var data = fs.readFileSync(file, 'utf-8').trimRight().replace(/\n/g, "").split("");

  for (var i = 1; i <= iterations; i++) {
    data = adjustLights(data, stuckOn);
  }

  return countLights(data);
}

function countLights(data) {
  return data.filter(function(x) {return x === "#";}).length;
}

function adjustLights(data, stuckOn) {
  var newData = [];

  for (var x = 0; x < 100; x++) {
    for (var y = 0; y < 100; y++) {
      var neighborsOn = 0;
      var status;
      var i = x + y * 100;

      if (stuckOn) {
        if ((data[0] === "." && x <= 1 && y <= 1) && !(x === 0 && y === 0)) neighborsOn += 1;
        if ((data[99] === "." && x <= 1 && y > 97) && !(x === 0 && y === 99)) neighborsOn += 1;
        if ((data[9900] === "." && x > 97 && y <= 1) && !(x === 99 && y === 0)) neighborsOn += 1;
        if ((data[9999] === "." && x > 97 && y > 97) && !(x === 99 && y === 99)) neighborsOn += 1;
      }
      if (x > 0 && y > 0 && data[i-101] === "#") neighborsOn += 1;
      if (y > 0 && data[i-100] === "#") neighborsOn += 1;
      if (x < 99 && y > 0 && data[i-99] === "#") neighborsOn += 1;
      if (x > 0 && data[i-1] === "#") neighborsOn += 1;
      if (x < 99 && data[i+1] === "#") neighborsOn += 1;
      if (x > 0 && y < 99 && data[i+99] === "#") neighborsOn += 1;
      if (y < 99 && data[i+100] === "#") neighborsOn += 1;
      if (x < 99 && y < 99 && data[i+101] === "#") neighborsOn += 1;
      if (data[i] === "#") {
        if (stuckOn && ((x === 0 && y === 0) || ((x === 0 && y === 99)) || (x === 99 && y === 0) || (x === 99 && y === 99))) {
          status = "#";
        } else if (neighborsOn === 2 || neighborsOn ===3) {
          status = "#";
        } else {
          status = ".";
        }
      } else {
        if (neighborsOn === 3) {
          status = "#";
        } else {
          status = ".";
        }
      }
      newData.push(status);
    }
  }

  return newData;
}

console.log(christmasLights('input.txt', 100));
console.log(christmasLights('input.txt', 100, true));
