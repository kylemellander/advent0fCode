var fs = require('fs');

function turnTheLightsOn(file, lang) {
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
      lights = messWithTheLights(lights, instruction, lang);
    });

    console.log(lightsOn(lights));
  });
}

function messWithTheLights(lights, instruction, lang) {
  var firstX = parseInt(instruction[1]);
  var firstY = parseInt(instruction[2]);
  var lastX = parseInt(instruction[3]);
  var lastY = parseInt(instruction[4]);

  if (instruction[0] === "on") {
    for (var i = firstX; i <= lastX; ++i) {
      for (var j = firstY; j <= lastY; ++j) {
        if (lang === "elvish" && lights[i+','+j]) {
          lights[i+','+j] += 1;
        } else {
          lights[i+','+j] = 1;
        }
      }
    }
  } else if (instruction[0] === "off") {
    for (var i = firstX; i <= lastX; ++i) {
      for (var j = firstY; j <= lastY; ++j) {
        if (lang === "elvish" && lights[i+','+j] && lights[i+','+j] >= 0) {
            lights[i+','+j] -= 1;
        } else {
          lights[i+','+j] = 0;
        }
      }
    }
  } else {
    for (var i = firstX; i <= lastX; ++i) {
      for (var j = firstY; j <= lastY; ++j) {
        if (lang === "elvish") {
          if (lights[i+','+j]) {
            lights[i+','+j] += 2;
          } else {
            lights[i+','+j] = 2;
          }
        } else {
          if (lights[i+','+j]) {
            lights[i+','+j] = 1 - lights[i+','+j];
          } else {
            lights[i+','+j] = 1;
          }
        }
      }
    }
  }

  return lights;
}

function lightsOn(obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      size += obj[key];
    }
  }
  return size;
}

turnTheLightsOn('directions.txt', 'english');
turnTheLightsOn('directions.txt', 'elvish');
