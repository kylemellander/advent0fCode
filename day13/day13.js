var fs = require('fs');
var result = [];
var usedPeople = [];

function seatingArrangement(file, name) {
  var people = [];
  var happiest = 0;
  var happiestArrangement;
  var parsedData = {};
  if (name) parsedData[name] = {};
  var data = fs.readFileSync(file, 'utf-8').trimRight().split('\n');

  data.forEach(function(line) {
    var parsedLine = line.replace(/\./g, "").split(" ");
    var i = parseInt(parsedLine[3]);

    if (parsedLine[2] === "lose") i = -i;
    if (people.indexOf(parsedLine[0]) === -1) people.push(parsedLine[0]);

    if(!parsedData[parsedLine[0]]) parsedData[parsedLine[0]] = {};
    parsedData[parsedLine[0]][parsedLine[10]] = i;
  });

  if (name) {
    people.push(name);
    people.forEach(function(person) {
      parsedData[person][name] = 0;
      parsedData[name][person] = 0;
    });
  }

  var permutations = permute(people);

  permutations.forEach(function(arrangement) {
    var count = 0;

    for (var i = 0; i < arrangement.length - 1; ++i) {
      count += parsedData[arrangement[i]][arrangement[i+1]];
      count += parsedData[arrangement[i+1]][arrangement[i]];
    }

    if (happiest < count) {
      happiest = count;
      arrangement.pop();
      happiestArrangement = arrangement;
    }
  });

  return happiest;

}

function permute(people) {

  var i, person;

  for (i = 0; i < people.length; i++) {
    person = people.splice(i, 1)[0];
    usedPeople.push(person);
    if (people.length === 0) {
      usedPeople.push(usedPeople[0]);
      result.push(usedPeople.slice());
      usedPeople.pop();
    }
    permute(people);
    people.splice(i, 0, person);
    usedPeople.pop();
  }

  return result;
}

console.log(seatingArrangement('input.txt', "Kyle"));
