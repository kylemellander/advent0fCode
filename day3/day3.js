var fs = require('fs');

Array.prototype.contains = function ( needle ) {
   for (i in this) {
     if (this[i][0] == needle[0] && this[i][1] == needle[1]) return true;
   }
   return false;
}

function deliver(file) {

  fs.readFile(file, 'utf8', function(err, data) {
    var location = [0,0];
    var luckyHouses = [[0,0]];

    if (err) {
      return console.log(err);
    }

    var directions = data.split("");
    directions.pop();

    directions.forEach(function(move) {
      location = goToNewHouse(move, location);

      if (!(luckyHouses.contains(location))) {
        luckyHouses.push(location);
      }

      console.log(luckyHouses.length);
    });

    return console.log(luckyHouses.length);
  });
}

function goToNewHouse(move, location) {

  const data = { "<": [-1,0], ">": [1,0], "^": [0,1], "v": [0,-1] };

  var direction = data[move];

  var newLocation = location.map(function(coor, index) {
    return direction ? coor + direction[index] : coor;
  });

  return newLocation;

}

deliver('directions.txt');
