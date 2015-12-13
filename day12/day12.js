var jsonData = require('./input.json');

/*  searchJsonForNumbers takes 1 required json object and
    an optional check (for part2) to omit any object that
    have a value of the included string. */

console.log(searchJsonForNumbers(jsonData));
console.log(searchJsonForNumbers(jsonData, "red"));

function searchJsonForNumbers(json, check) {
  var count = 0;

  if (!check || untainted(json, check)) {
    for (var key in json) {
      if (json.hasOwnProperty(key)) {
        if (typeof json[key] === "object") {
          count += searchJsonForNumbers(json[key], check);
        } else if (typeof json[key] === "number") {
          count += json[key]
        }
      }
    }
  }

  return count;
}

function untainted(json, check) {
  if (json.constructor !== Array) {
    for (key in json) {
      if (json[key] === check) {
        return false;
      }
    }
  }

  return true;
}
