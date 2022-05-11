const { checkToken } = require('../src/utils/token.js');

describe("Filter function", () => {
  test("it should return false if no token provided", () => {
    const input = '';
    const output = false;
    expect(checkToken(input)).toEqual(output);
  });
});
