var fs = require('fs');

function eggNogCombos(file, amount, minimum) {
  var data = fs.readFileSync(file, 'utf-8').trimRight().split('\n')
               .map(function(x) {return parseInt(x);});
  var binary = "";
  var bottles = [];
  var smallestCount;

  for (var i = 0; i < data.length; i++) {
    binary += "1";
  }

  var combos = parseInt(binary, 2);

  for (var i = 0; i <= combos; i++) {
    var filled = 0;
    var bottleCount = 0;
    var arr = i.toString(2).split("").reverse();

    arr.forEach(function(val, index) {
      if (val === "1") bottleCount += 1;
      filled += data[index] * val;
    });

    if (filled === amount) {
      bottles.push(bottleCount);
      if (!smallestCount || smallestCount > bottleCount)
        smallestCount = bottleCount;
    }
  }

  return minimum ? bottles.filter(function(x){return x === smallestCount;}).length : bottles.length;
}

console.log(eggNogCombos('input.txt', 150));
console.log(eggNogCombos('input.txt', 150, true));
