const handler = require('./latin');

function wrapInEvent(text) {
  return { data: text };
}

test('pigLatinize', () => {
  [
    // Input | Expected
    ['hello', 'ellohay'],
    ['Hello', 'Ellohay'],
    ['My', 'Myay'],
    ['Hello there', 'Ellohay erethay'],
    ['Hello there!', 'Ellohay erethay!'],
    ['Don\'t. Do. It.', 'On\'tday. Oday. Itway.'],
    ['Some\nlines too', 'Omesay\nineslay ootay'],
    ['Queen', 'Eenquay'],
    ['queen', 'eenquay'],
  ].forEach((testCase) => expect(handler.pigLatinize(wrapInEvent(testCase[0]))).toBe(testCase[1]));
});
