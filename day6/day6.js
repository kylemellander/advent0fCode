var fs = require('fs');

function turnTheLightsOn(file) {
  fs.readFile(file, 'utf8', function(err, data) {
    var lights = {};

    if (err) {
      return console.log(err);
    }

    var formattedData = data.replace(/turn on /g, "on,")
                            .replace(/turn off /g, "off,")
                            .replace(/toggle /g, "toggle,")
                            .replace(/ through /g, ",");

    var rawInstructions = formattedData.split("\n");

    var instructions = rawInstructions.map(function(instruction) {
      return instruction.split(",");
    });

    instructions.forEach(function(instruction) {
      instruction == [] ? lights = lights : lights = messWithTheLights(lights, instruction);
    });

    console.log(lightsOn(lights));
  });
}

function messWithTheLights(lights, instruction) {
  var firstX = parseInt(instruction[1]);
  var firstY = parseInt(instruction[2]);
  var lastX = parseInt(instruction[3]);
  var lastY = parseInt(instruction[4]);

  if (instruction[0] === "on") {
    for (var i = firstX; i <= lastX; ++i) {
      for (var j = firstY; j <= lastY; ++j) {
        lights[i+','+j] = true;
      }
    }
  } else if (instruction[0] === "off") {
    for (var i = firstX; i <= lastX; ++i) {
      for (var j = firstY; j <= lastY; ++j) {
        lights[i+','+j] = false;
      }
    }
  } else {
    for (var i = firstX; i <= lastX; ++i) {
      for (var j = firstY; j <= lastY; ++j) {
        lights[i+','+j] = !lights[i+','+j];
      }
    }
  }

  return lights;
}

function lightsOn(obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key) && obj[key]) size++;
  }
  return size;
}

turnTheLightsOn('directions.txt');
