const { getAccessToken } = require('../src/App.js');

describe("Get access token", () => {
  test("Should return undefined if no callback url is provided", () => {
    const input = '';
    const output = undefined;
    expect(getAccessToken(input)).toEqual(output);
  });
});
