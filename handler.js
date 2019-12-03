'use strict';

const _ = require('lodash');

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const vowels = 'aeiou';

function isLetter(char) {
  return alphabet.includes(char.toLowerCase());
}

function isWord(str) {
  // Something is considered a word if it contains any letters
  return str.split('').some(isLetter);
}

function isVowel(char) {
  return vowels.includes(char.toLowerCase());
}

function beginsWithVowel(word) {
  return word.length > 0 && isVowel(word.split('')[0]);
}

function firstCharPosMeetingPredicate(word, predicate) {
  const chars = word.split('');
  for (let i = 0; i < chars.length; i += 1) {
    if (predicate(chars[i])) {
      return i;
    }
  }
  return word.length;
}

function lastCharPosMeetingPredicate(word, predicate) {
  const chars = word.split('');
  for (let i = chars.length - 1; i >= 0; i -= 1) {
    if (predicate(chars[i])) {
      return i;
    }
  }
  return -1;
}

function moveConsonantClusterBack(word) {
  const isCapitalized = !(word === word.toLowerCase());
  let firstVowel = firstCharPosMeetingPredicate(word, isVowel);
  // qu case
  if (word.toLowerCase().startsWith('qu')) {
    firstVowel += 1;
  }
  const moved = word.substring(firstVowel, word.length)
    + word.substring(0, firstVowel);
  if (isCapitalized) {
    return _.capitalize(moved);
  }
  return moved;
}

function modifyLetters(word, callback) {
  const firstLetterPos = firstCharPosMeetingPredicate(word, isLetter);
  const restOfWord = word.substring(firstLetterPos);
  const lastLetterPos = lastCharPosMeetingPredicate(restOfWord, isLetter);
  const limitedWord = restOfWord.substring(0, lastLetterPos + 1);
  if (limitedWord.length === 0) {
    return word;
  }
  const modified = callback(limitedWord);
  return word.substring(0, firstLetterPos)
    + modified
    + restOfWord.substring(lastLetterPos + 1, restOfWord.length);
}

function wordToPigLatin(word) {
  if (!isWord(word)) {
    return word;
  }
  return modifyLetters(word, (limitedWord) => {
    if (beginsWithVowel(limitedWord)) {
      return `${limitedWord}way`;
    }
    return `${moveConsonantClusterBack(limitedWord)}ay`;
  });
}

function textToPigLatin(text) {
  return text.split(' ')
    .map((splitOnce) => splitOnce
      .split('\n')
      .map(wordToPigLatin)
      .join('\n'))
    .join(' ');
}

module.exports = {
  // eslint-disable-next-line no-unused-vars
  pigLatinize(event, context) {
    return textToPigLatin(event.data);
  },
};
