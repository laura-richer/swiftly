import { getItem, setItem } from './local-storage.js';

export const checkToken = (token) => {
  const currentDateTime = new Date().getTime();
  const tokenExpires = new Date(getItem('tokenExpires'));
  const tokenExpired = currentDateTime > tokenExpires;

  return !token || tokenExpired ? false : true
}

export const getToken = () => {
  const hash = window.location.hash;

  if (hash) {
    const token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
    const expiresIn = hash.substring(1).split("&").find(elem => elem.startsWith("expires_in")).split("=")[1];

    setItem('tokenExpires', getExpiryTime(expiresIn));
    setItem('token', token);
  };

  return;
}

export const getExpiryTime = (tokenExpires, date = new Date()) => {
  const expiresInHours = Math.floor(tokenExpires / 3600);
  date.setTime(date.getTime() + expiresInHours * 60 * 60 * 1000);

  return date;
}
