var fs = require('fs');

function surface(l, h, w) {
  return 2*l*w + 2*w*h + 2*h*l;
}

function slack(l, h, w) {
  return Math.min(l*w, l*h, w*h);
}

function sqFtForPackage(l, h, w) {
  return surface(l, h, w) + slack(l, h, w);
}

function calculateSqFtForAllPackages(file) {
  var packages;
  var result = 0;
  fs.readFile(file, 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }

    var rawDataArray = data.split("\n");

    packages = rawDataArray.map(function(package) {
      return package.split("x");
    });

    packages.pop();

    packages.forEach(function(package) {
      result += sqFtForPackage(package[0], package[1], package[2]);
    });

    console.log("Square Feet of Wrapping Paper Required: " + result);
  });
}

calculateSqFtForAllPackages('packages.txt');
