var fs = require('fs');

function shortestRoute(file) {
  var data = fs.readFileSync(file, 'utf-8').trimRight().split('\n');

  return data;
}

console.log(shortestRoute('distances.txt'))
