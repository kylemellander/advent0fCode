var fs = require('fs');
var result = [];
var usedCities = [];

function compare(a,b) {
  if (a.distance < b.distance)
    return -1;
  if (a.distance > b.distance)
    return 1;
  return 0;
}

function permute(cities) {

  var i, city;

  for (i = 0; i < cities.length; i++) {
    city = cities.splice(i, 1)[0];
    usedCities.push(city);
    if (cities.length === 0) {
      result.push(usedCities.slice());
    }
    permute(cities);
    cities.splice(i, 0, city);
    usedCities.pop();
  }

  return result;
}

function createDistances(data) {
  var distances = {};
  var cities = [];

  data.forEach(function(line) {
    var arr = line.split(" ");

    if (cities.indexOf(arr[0]) === -1) {
      cities.push(arr[0]);
      distances[arr[0]] = {};
    }

    if (cities.indexOf(arr[2]) === -1) {
      cities.push(arr[2]);
      distances[arr[2]] = {};
    }

    distances[arr[0]][arr[2]] = parseInt(arr[4]);
    distances[arr[2]][arr[0]] = parseInt(arr[4]);
  });

  return [distances, cities];
}

function shortestRoute(file) {
  var data = fs.readFileSync(file, 'utf-8').trimRight().split('\n');
  var cities = [],
      shortest = 100000;

  var parsedData = createDistances(data);
  var distances = parsedData[0];
  var cities = parsedData[1];

  var permutations = permute(cities);
  var length = cities.length;

  permutations.forEach(function(route) {
    var count = 0;

    for (var i = 0; i < length-1; ++i) {
      count += distances[route[i]][route[i+1]];
    }

    if (shortest > count) shortest = count;
  });

  return shortest;
}

function longestRoute(file) {
  var data = fs.readFileSync(file, 'utf-8').trimRight().split('\n');
  var distances = {},
      cities = [],
      longest = 0;

  var parsedData = createDistances(data);
  var distances = parsedData[0];
  var cities = parsedData[1];

  var permutations = permute(cities);
  var length = cities.length;

  permutations.forEach(function(route) {
    var count = 0;

    for (var i = 0; i < length-1; ++i) {
      count += distances[route[i]][route[i+1]];
    }

    if (longest < count) longest = count;
  });

  return longest;
}

console.log(shortestRoute('distances.txt'));
console.log(longestRoute('distances.txt'));
