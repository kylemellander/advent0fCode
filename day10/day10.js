function elfSpeak(num, count) {
  var arr = num.toString().split("");

  for (var i=1; i <= count; i++) {
    var result = [];
    var repeats = 0;

    arr.forEach(function(digit, index) {
      if (parseInt(result[(index - repeats) * 2 - 1]) === parseInt(digit)) {
        result[(index - repeats) * 2 - 2] = result[(index - repeats) * 2 - 2] + 1;
        repeats += 1;
      } else {
        result.push(1);
        result.push(digit);
      }
    });
    arr = result;

  }

  return arr.length;
}


console.log(elfSpeak(3113322113, 40));
console.log(elfSpeak(3113322113, 50));
