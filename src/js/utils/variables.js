const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const SCOPE = 'playlist-modify-private';

export const API_ENDPOINT = 'https://api.spotify.com/v1';
export const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

export const buildLoginUrl = codeChallenge => {
  const parameters = new URLSearchParams({
    client_id: process.env.REACT_APP_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_REDIRECT_URI,
    response_type: 'code',
    scope: SCOPE,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
  });
  return `${AUTH_ENDPOINT}?${parameters.toString()}`;
};
