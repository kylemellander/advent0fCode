var fs = require('fs');

function wireOpp(a, b, opp) {
  var aArr, bArr, resultArr = [];

  if (a > b) {
    aArr = a.toString(2).split("").reverse();
    bArr = b.toString(2).split("").reverse();
  } else {
    aArr = b.toString(2).split("").reverse();
    bArr = a.toString(2).split("").reverse();
  }

  for (i in aArr) {
    switch (opp) {
      case "AND":
        aArr[i] == 1 && bArr[i] == 1 ? resultArr.push(1) : resultArr.push(0);
        break;
      case "OR":
        aArr[i] == 1 || bArr[i] == 1 ? resultArr.push(1) : resultArr.push(0);
        break;
    }
  }

  return parseInt(resultArr.reverse().join(""), 2);
}

function wireShift(a, direction, val) {
  if (direction === "L") {
    return parseInt(a.toString(2) * Math.pow(10, val), 2);
  } else if (direction === "R") {
    return parseInt(Math.floor(a.toString(2) / Math.pow(10, val)), 2);
  }
}

function wireNot(a) {
  return 65535 - a;
}

function formatData(file, override, num) {
  var instructions = {};
  var count = 0;
  var limit = 0;

  var data = fs.readFileSync(file, 'utf-8').trimRight().split('\n');
  data.forEach(function(line) {
    var arr = line.split(" -> ");
    var key = arr[1],
        value = arr[0],
        vArr;

    if (override === key) {
      instructions[key] = num;
      count += 1;
    } else {
      if (value.indexOf("SHIFT") !== -1) {
        vArr = value.replace("SHIFT", "").split(" ");
        instructions[key] = {
          "opp": "SHIFT",
          "direction": vArr[1],
          "val": parseInt(vArr[2]),
          "a": vArr[0]
        };
      } else if (value.indexOf("OR") !== -1) {
        vArr = value.split(" OR ");
        instructions[key] = {
          "opp": "OR",
          "a": vArr[0],
          "b": vArr[1]
        };
      } else if (value.indexOf("AND") !== -1) {
        vArr = value.split(" AND ");
        instructions[key] = {
          "opp": "AND",
          "a": vArr[0],
          "b": vArr[1]
        };
      } else if (value.indexOf("NOT") !== -1) {
        value = value.replace("NOT ", "");
        instructions[key] = {
          "opp": "NOT",
          "a": value
        };
      } else if (parseInt(value) == value) {
        instructions[key] = parseInt(value);
        count += 1;
      } else {
        instructions[key] = {
          "opp": "EQ",
          "a": value
        };
      }
    }

    limit += 1;
  });

  return [instructions, count, limit];
}

function wireSystem(file, override, num) {
  var response = formatData(file, override, num);

  var instructions = response[0];
  var count = response[1];
  var limit = response[2];

  while (count < limit) {
    for (keyA in instructions) {
      var line = instructions[keyA];
      if (instructions.hasOwnProperty(keyA) && line.opp) {
        for (keyB in instructions) {
          if (instructions.hasOwnProperty(keyB) && Number.isInteger(instructions[keyB]) && (keyB === line.a || parseInt(line.a))) {
            var a = parseInt(line.a) ? parseInt(line.a) : instructions[line.a];
            var b = parseInt(line.b) ? parseInt(line.b) : instructions[line.b];
            if (Number.isInteger(b)) {
              instructions[keyA] = wireOpp(a, b, line.opp);
              count += 1;
              break;
            } else if (line.opp === "NOT") {
              instructions[keyA] = wireNot(a);
              count += 1;
              break;
            } else if (line.opp === "SHIFT") {
              instructions[keyA] = wireShift(a, line.direction, line.val);
              count += 1;
              break;
            } else if (line.opp === "EQ") {
              instructions[keyA] = a;
              count += 1;
              break;
            }
          }
        }
      }
    }
  }

  return instructions["a"];
}

// wireSystem('system.txt')
console.log(wireSystem('system.txt', "", 0));
console.log(wireSystem('system.txt', "b", wireSystem('system.txt', "", 0)));
// console.log(wireSystem('test.txt'));
