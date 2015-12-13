var jsonData = require('./input.json');

console.log(searchJsonForNumbers(jsonData));

function searchJsonForNumbers(json, count) {
  if (!count) count = 0;

  for (var key in json) {
    if (json.hasOwnProperty(key)) {
      if (json[key].constructor === Object) {
        var result = searchJsonForNumbers(json[key], count);
        count = result;
      } else if (json[key].constructor === Array) {
        count += searchArrayForNumbers(json[key]);
      } else if (typeof json[key] === "number") {
        count += json[key]
      }
    }
  }
  return count;
}

function searchArrayForNumbers(array) {
  var count = 0;

  array.forEach(function(item) {
    if (item.constructor === Array) {
      count += searchArrayForNumbers(item);
    } else if (item.constructor === Object) {
      var deeperJson = {
        count: count,
        jsonData: item
      }

      count = searchJsonForNumbers(deeperJson);
    } else if (typeof item === "number") {
      count += item;
    }
  });

  return count;
}
