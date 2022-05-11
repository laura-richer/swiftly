const { checkToken, getToken } = require('../src/utils/token.js');
const accessToken = 'BQDQXGcJu77Xc4xdu3biwwV8azRPWuCKbauIkHLw6Iy2SejbxtbQtmDeWBX6_BdrCMRQP_q-2heo3zGvGEQ0REO5FdehaBYy5hlNg3xFhQxhwg2Bc8YhMYcpydL1FfjJV3aooEGNSqpIoYA';

describe("Check for valid token", () => {
  test("it should return false if no token provided", () => {
    const token = '';
    const tokenExpires = ''
    const output = false;
    expect(checkToken(token, tokenExpires)).toEqual(output);
  });

  test("it should return false if token is provided and token is expired", () => {
    const token = accessToken;
    const tokenExpires = 'Tue May 10 2022 16:59:13 GMT+0100 (British Summer Time)'
    const output = false;
    expect(checkToken(token, tokenExpires)).toEqual(output);
  });

  test("it should return true if token is provided and token is not expired", () => {
    const token = accessToken;
    const tokenExpires = 'Tue May 10 2050 17:59:13 GMT+0100 (British Summer Time)'
    const output = true;
    expect(checkToken(token, tokenExpires)).toEqual(output);
  });
});

// describe("Get access token", () => {
//   test("it should return undefined if no url hash", () => {
//     const hash = '';
//     const output = undefined;
//     expect(getToken(hash)).toEqual(output);
//   })

//   test("it should return an access token if url hash", () => {
//     const hash = '#access_token=BQDQXGcJu77Xc4xdu3biwwV8azRPWuCKbauIkHLw6Iy2SejbxtbQtmDeWBX6_BdrCMRQP_q-2heo3zGvGEQ0REO5FdehaBYy5hlNg3xFhQxhwg2Bc8YhMYcpydL1FfjJV3aooEGNSqpIoYA&token_type=Bearer&expires_in=3600';
//     const output = accessToken;
//     expect(getToken(hash)).toEqual(output);
//   })
// });
