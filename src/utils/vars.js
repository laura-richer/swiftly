export const CLIENT_ID = '82266056cc184b0faeea709c7c852cf3';
export const REDIRECT_URI = 'http://localhost:3000';
export const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
export const API_ENDPOINT = 'https://api.spotify.com/v1';
export const RESPONSE_TYPE = 'token';
export const SCOPE = 'playlist-modify-private';
export const LOGIN_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
