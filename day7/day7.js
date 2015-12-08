var lr = require('line-reader');

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

function wireShift(a, opp, val) {
  if (opp === "L") {
    return parseInt(a.toString(2) * Math.pow(10, val), 2);
  } else if (opp === "R") {
    return parseInt(Math.floor(a.toString(2) / Math.pow(10, val)), 2);
  }
}

function wireNot(a) {
  return 65535 - a;
}

function wireSystem(file) {
  lr.eachLine('system.txt', function(line) {
    line
  });
}
