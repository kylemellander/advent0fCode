var jsonData = require('./input.json');

console.log(searchJsonForNumbers(jsonData));
console.log(searchJsonForNumbers(jsonData, 0, true));

function searchJsonForNumbers(json, count, untaintedCheck) {
  if (!count) count = 0;

  if (!untaintedCheck || untainted(json)) {
    for (var key in json) {
      if (json.hasOwnProperty(key)) {
        if (json[key].constructor === Object) {
          var result = searchJsonForNumbers(json[key], count, untaintedCheck);

          count = result;
        } else if (json[key].constructor === Array) {
          count += searchArrayForNumbers(json[key], untaintedCheck);
        } else if (typeof json[key] === "number") {
          count += json[key]
        }
      }
    }
  }

  return count;
}

function searchArrayForNumbers(array, untaintedCheck) {
  var count = 0;

  array.forEach(function(item) {
    if (item.constructor === Array) {
      count += searchArrayForNumbers(item, untaintedCheck);
    } else if (item.constructor === Object) {
      var result = searchJsonForNumbers(item, count, untaintedCheck);

      count = result;
    } else if (typeof item === "number") {
      count += item;
    }
  });

  return count;
}

function untainted(json) {
  for (key in json) {
    if (json[key] === "red") {
      return false;
    }
  }

  return true;
}
