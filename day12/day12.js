var jsonData = require('./input.json');

// searchJsonForNumbers takes 1 required json object and an optional check (for part2) to omit any objects that have a value of the included string.

console.log(searchJsonForNumbers(jsonData));
console.log(searchJsonForNumbers(jsonData, "red"));

function searchJsonForNumbers(json, check) {
  var count = 0;

  if (!check || untainted(json, check)) {
    for (var key in json) {
      if (json.hasOwnProperty(key)) {
        if (json[key].constructor === Object) {
          count += searchJsonForNumbers(json[key], check);
        } else if (json[key].constructor === Array) {
          count += searchArrayForNumbers(json[key], check);
        } else if (typeof json[key] === "number") {
          count += json[key]
        }
      }
    }
  }

  return count;
}

function searchArrayForNumbers(array, check) {
  var count = 0;

  array.forEach(function(item) {
    if (item.constructor === Array) {
      count += searchArrayForNumbers(item, check);
    } else if (item.constructor === Object) {
      count += searchJsonForNumbers(item, check);
    } else if (typeof item === "number") {
      count += item;
    }
  });

  return count;
}

function untainted(json, check) {
  for (key in json) {
    if (json[key] === check) {
      return false;
    }
  }

  return true;
}
