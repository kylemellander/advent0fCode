var fs = require('fs');

function findTheNiceKids(file) {
  fs.readFile(file, 'utf8', function(err, data) {
    var count = 0;

    if (err) {
      return console.log(err);
    }

    var children = data.split("\n");

    children.forEach(function(kid) {
      if (nice(kid)) {
        count += 1;
      }
    });

    console.log(count);
  });
}

function nice(kid) {
  return threeVowels(kid) && doubleLetters(kid) && excludesStr(kid);
}

function threeVowels(kid) {
  var vowels = kid.match(/[aeiou]/gi) || [];
  return vowels.length >= 3;
}

function doubleLetters(kid) {
  return (/([a-z])\1/i).test(kid);
}

function excludesStr(kid) {
  return kid.indexOf("ab") === -1 && kid.indexOf("cd") === -1 && kid.indexOf("pq") === -1 && kid.indexOf("xy") === -1;
}

findTheNiceKids('children.txt');
