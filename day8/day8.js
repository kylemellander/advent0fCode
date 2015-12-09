var fs = require('fs');

function countStringCode(c) {
  if (c.indexOf("\\") !== -1) {
    var i = c.match(/\\/g).length;
    return c.length + i + 2;
  } else if (c.indexOf("\"") !== -1) {
    var i = c.match(/\"/g).length;
    return c.length + i + 2;
  } else if (c.match(/[\x00-\xzz]/g)) {
    var i = c.match(/[\x00-\xzz]/g).length;
    return c.length + i * 3 + 2;
  } else {
    return c.length + 2;
  }
}

function countStringDisplay(c) {
  return c.length;
}

console.log(countStringCode(""));
console.log(countStringCode("abc"));
console.log(countStringCode("aaa\"aaa"));
console.log(countStringCode("\\\\\\"));
console.log(countStringCode("\x27"));
console.log(countStringDisplay(""));
console.log(countStringDisplay("abc"));
console.log(countStringDisplay("aaa\"aaa"));
console.log(countStringDisplay("\\\\\\"));
console.log(countStringDisplay("\x27"));
