// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd
if (!String.prototype.padEnd) {
  String.prototype.padEnd = function padEnd(targetLength,padString) {
      targetLength = targetLength>>0; //floor if number or convert non-number to 0;
      padString = String((typeof padString !== 'undefined' ? padString : ' '));
      if (this.length > targetLength) {
          return String(this);
      }
      else {
          targetLength = targetLength-this.length;
          if (targetLength > padString.length) {
              padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
          }
          return String(this) + padString.slice(0,targetLength);
      }
  };
}

function maxLength(lines) {
  return lines
    .map((line) => line.length)
    .reduce((a, b) => Math.max(a, b));
}

function surround(lines, str) {
  return lines
    .map((line) => str.concat(line, str));
}

function pad(lines) {
  const longest = maxLength(lines);
  return lines
    .map((line) => {
      console.log(line);
      return line.padEnd(longest, ' ');
    });
}

function surroundLines(lines, repeatStr) {
  const longest = maxLength(lines);
  const linesClone = Array.from(lines);
  const toAdd = ''.padEnd(longest, repeatStr);
  linesClone.unshift(toAdd);
  linesClone.push(toAdd);
  return linesClone;
}

function box(str) {
  console.log(str);
  const lines = str.split('\n');
  const padded = surround(pad(lines), ' ');
  return surroundLines(surround(padded, '%'), '%').join('\n');
}

module.exports = {
  // eslint-disable-next-line no-unused-vars
  box(event, context) {
    return box(event.data);
  },
};
