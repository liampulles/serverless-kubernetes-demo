const handler = require('./box');

const helloIn = 'hello';
const helloOut = `%%%%%%%%%
% hello %
%%%%%%%%%`;

const groceriesIn = `Need to buy:
 - Butter
 - Milk`;
const groceriesOut = `%%%%%%%%%%%%%%%%
% Need to buy: %
%  - Butter    %
%  - Milk      %
%%%%%%%%%%%%%%%%`;

function wrapInEvent(text) {
  return { data: text };
}

test('box', () => {
  [
    // Input | Expected
    [helloIn, helloOut],
    [groceriesIn, groceriesOut],
  ].forEach((testCase) => expect(handler.box(wrapInEvent(testCase[0]))).toBe(testCase[1]));
});
