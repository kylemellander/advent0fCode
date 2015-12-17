var fs = require('fs');
var ticker = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1
};

function findSue(file, ticker, catsAndTrees) {
  var data = fs.readFileSync(file, 'utf-8').trimRight().split('\n');
  var sues = [];
  var realSue;

  data.forEach(function(sue) {
    var sueParts = sue.split(" ");
    sues.push([
      [sueParts[2].replace(/:/, ""), parseInt(sueParts[3].replace(/,/, ""))],
      [sueParts[4].replace(/:/, ""), parseInt(sueParts[5].replace(/,/, ""))],
      [sueParts[6].replace(/:/, ""), parseInt(sueParts[7])]
    ]);
  });

  sues.forEach(function(sue, index) {
    var sueTest = true;
    for (var i = 0; i < 3; i++) {
      if (!catsAndTrees) {
        if (ticker[sue[i][0]] !== sue[i][1]) {
          sueTest = false;
        }
      } else {
        if (sue[i][0] === "cats" || sue[i][0] === "trees") {
          if (ticker[sue[i][0]] >= sue[i][1]) sueTest = false;
        } else if (sue[i][0] === "pomeranians" || sue[i][0] === "goldfish") {
          if (ticker[sue[i][0]] <= sue[i][1]) sueTest = false;
        } else if (ticker[sue[i][0]] !== sue[i][1]) {
          sueTest = false;
        }
      }
    }

    if (sueTest) realSue = index + 1;
  });

  return realSue;
}

console.log(findSue('input.txt', ticker));
console.log(findSue('input.txt', ticker, true));
