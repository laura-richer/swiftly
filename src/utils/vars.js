const CLIENT_ID = '82266056cc184b0faeea709c7c852cf3';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const SCOPE = 'playlist-modify-private';

export const API_ENDPOINT = 'https://api.spotify.com/v1';
export const LOGIN_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
