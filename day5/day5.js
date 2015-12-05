var fs = require('fs');

function findTheNiceKids(file, type) {
  fs.readFile(file, 'utf8', function(err, data) {
    var count = 0;

    if (err) {
      return console.log(err);
    }

    var children = data.split("\n");

    if (type === "old") {
      children.forEach(function(kid) {
        if (nice(kid)) {
          count += 1;
        }
      });
    } else if (type === "new") {
      children.forEach(function(kid) {
        if (theNewNice(kid)) {
          count += 1;
        }
      });
    }

    console.log(count);
  });
}

function nice(kid) {
  return threeVowels(kid) && doubleLetters(kid) && excludesStr(kid);
}

function theNewNice(kid) {
  return doublePairs(kid) && sandwichLetter(kid);;
}

function threeVowels(kid) {
  var vowels = kid.match(/[aeiou]/gi) || [];
  return vowels.length >= 3;
}

function doubleLetters(kid) {
  return (/([a-z])\1/i).test(kid);
}

function excludesStr(kid) {
  return !(/ab|cd|pq|xy/).test(kid);
}

function doublePairs(kid) {
  for (var i = 0; i < kid.length - 2; ++i) {
    var str = kid.substring(i, i + 2);
    var kidArray = kid.split(str);
    if (kidArray.length >= 3) {
      return true;
    }
  }

  return false;
}

function sandwichLetter(kid) {
  for (var i = 0; i < kid.length - 2; ++i) {
    var str = kid.substring(i, i + 3);
    if (str[0] === str[2]) {
      return true;
    }
  }

  return false;

}

findTheNiceKids('children.txt', "old");
findTheNiceKids('children.txt', "new");
