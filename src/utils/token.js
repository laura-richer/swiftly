import { setItem } from './local-storage.js';

export const checkToken = (token, tokenExpires) => {
  const currentDateTime = new Date().getTime();
  const tokenExpiresDate = new Date(tokenExpires);
  const tokenExpired = currentDateTime > tokenExpiresDate;

  return token && !tokenExpired ? true : false;
}

export const getToken = () => {
  const hash = window.location?.hash;

  if (!hash) return;

  const token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
  const expiresIn = hash.substring(1).split("&").find(elem => elem.startsWith("expires_in")).split("=")[1];
  setItem('tokenExpires', getExpiryTime(expiresIn));
  setItem('token', token);

  return token;
}

export const getExpiryTime = (tokenExpires, date = new Date()) => {
  const expiresInHours = Math.floor(tokenExpires / 3600);
  date.setTime(date.getTime() + expiresInHours * 60 * 60 * 1000);

  return date;
}
