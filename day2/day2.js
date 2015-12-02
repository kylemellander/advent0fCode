var fs = require('fs');

function surface(l, h, w) {
  return 2*l*w + 2*w*h + 2*h*l;
}

function slack(l, h, w) {
  return Math.min(l*w, l*h, w*h);
}

function bow(l, h, w) {
  return l*w*h;
}

function ribbonForBox(l, h, w) {
  return 2 * (l + h + w - Math.max(l, h, w));
}

function sqFtForPackage(arr) {
  var l = parseInt(arr[0]);
  var h = parseInt(arr[1]);
  var w = parseInt(arr[2]);
  return surface(l, h, w) + slack(l, h, w);
}

function totalRibbon(arr) {
  var l = parseInt(arr[0]);
  var h = parseInt(arr[1]);
  var w = parseInt(arr[2]);
  return bow(l, h, w) + ribbonForBox(l, h, w);
}

function calculateSqFtForAllPackages(file) {
  var packages;
  var wrappingPaper = 0;
  var ribbon = 0;

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
      wrappingPaper += sqFtForPackage(package);
      ribbon += totalRibbon(package);
    });

    console.log("Square Feet of Wrapping Paper Required: " + wrappingPaper);
    console.log("Length of Ribbon Required: " + ribbon + " feet");
  });
}

calculateSqFtForAllPackages('packages.txt');
