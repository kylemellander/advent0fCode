var fs = require('fs');

function makeCookies(file, countCalories) {
  var data = fs.readFileSync(file, 'utf-8').trimRight().split('\n');
  var parsedData = [];

  data.forEach(function(line) {
    var arr = line.split(" ");
    parsedData.push({
      capacity: parseInt(arr[2].replace(/,/, "")),
      durability: parseInt(arr[4].replace(/,/, "")),
      flavor: parseInt(arr[6].replace(/,/, "")),
      texture: parseInt(arr[8].replace(/,/, "")),
      calories: parseInt(arr[10].replace(/,/, "")),
    });
  });

  var topScore = 0;
  
  for (var a = 0; a <= 100; a++) {
    for (var b = 0; b <= 100; b++) {
      for (var c = 0; c <= 100; c++) {
        for (var d = 0; d <= 100; d++) {
          if (a + b + c + d === 100) {
            var capacity =    a * parsedData[0].capacity +
                              b * parsedData[1].capacity +
                              c * parsedData[2].capacity +
                              d * parsedData[3].capacity;
            var durability =  a * parsedData[0].durability +
                              b * parsedData[1].durability +
                              c * parsedData[2].durability +
                              d * parsedData[3].durability;
            var flavor =      a * parsedData[0].flavor +
                              b * parsedData[1].flavor +
                              c * parsedData[2].flavor +
                              d * parsedData[3].flavor;
            var texture =     a * parsedData[0].texture +
                              b * parsedData[1].texture +
                              c * parsedData[2].texture +
                              d * parsedData[3].texture;
            var calories =    a * parsedData[0].calories +
                              b * parsedData[1].calories +
                              c * parsedData[2].calories +
                              d * parsedData[3].calories;
            var score = capacity * durability * flavor * texture;

            if (capacity < 0 || durability < 0 || texture < 0 || flavor < 0) score = 0;
            if ((countCalories && calories === 500 && score > topScore) || (!countCalories && score > topScore)) {
              topScore = score;
            }
          }
        }
      }
    }
  }

  return topScore;
}

console.log(makeCookies('input.txt'));
console.log(makeCookies('input.txt', true));
