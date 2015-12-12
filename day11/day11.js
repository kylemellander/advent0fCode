function newPassword(oldPassword) {
  var passwordArr = oldPassword.split("");
  var invalidPassword = true;

  while (invalidPassword) {
    passwordArr = incrementPassword(passwordArr);

    for (var i = 8; i > passwordArr.length;) {
      passwordArr.push("a");
    }

    invalidPassword = passwordInvalid(passwordArr);
  }

  return passwordArr.join("");
}

function incrementPassword(passwordArr) {
  var lastChar = passwordArr.pop();
  var newChar = String.fromCharCode(lastChar.charCodeAt(0)+1);

  if (newChar === "{") {
    incrementPassword(passwordArr);
  } else {
    passwordArr.push(newChar);
  }

  return passwordArr;
}

function passwordInvalid(passwordArr) {
  if (noBadLetters(passwordArr) && threeLetters(passwordArr) && twoPairs(passwordArr)) {
    return false;
  } else {
    return true;
  }
}

function noBadLetters(passwordArr) {
  return passwordArr.indexOf("i") === -1 && passwordArr.indexOf("l") === -1 && passwordArr.indexOf("o") === -1;
}

function threeLetters(passwordArr) {
  var arr = passwordArr.map(function(char) {
    return char.charCodeAt(0);
  });
  for (var i = 0; i < arr.length - 2; i++) {
    if (arr[i] + 1 === arr[i + 1] && arr[i] + 2 === arr[i + 2]) {
      return true;
    }
  }
  return false;
}

function twoPairs(passwordArr) {
  var skip = false;
  var pairs = 0;

  for (var i = 0; i < passwordArr.length - 1; i++) {
    if (skip) {
      skip = false;
    } else if (passwordArr[i] === passwordArr[i + 1]) {
      pairs += 1;
      skip = true;
    }
  }

  return pairs >= 2;
}

console.log(newPassword("hxbxwxba"));
console.log(newPassword(newPassword("hxbxwxba")));
