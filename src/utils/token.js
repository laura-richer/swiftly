import { fetchAccessToken, fetchRefreshedToken } from './api-calls.js';

export const checkToken = () => {
  const token = window.localStorage.getItem("token");
  const currentDateTime = new Date().getTime();
  const tokenExpires = new Date(window.localStorage.getItem("tokenExpires"));

  if (!token || !tokenExpires) return false;

  // if token is expired, refresh and set new token
  if (currentDateTime > tokenExpires) {
    fetchRefreshedToken().then(response => {
      console.log(response);
      // Get and set new token & return true

      return true;
    }).catch(error => {
      console.log(error);
    })
  }

  // If theres already a valid token, nothing to do, return true
  return true;
}


export const getToken = async () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  })
  let code = params.code;

  if (!code) return;

  await fetchAccessToken(code).then(response => {
    const token = response.access_token;
    const refreshToken = response.refresh_token;
    const expiresIn = getExpiryTime(response.expires_in);

    window.localStorage.setItem("token", token);
    window.localStorage.setItem("refreshToken", refreshToken);
    window.localStorage.setItem("tokenExpires", expiresIn)

    return token;
  }).catch(error => {
    console.log(error);
  });

  return;
}

export const getExpiryTime = (tokenExpires, date = new Date()) => {
  const expiresInHours = Math.floor(tokenExpires / 3600);
  date.setTime(date.getTime() + expiresInHours * 60 * 60 * 1000);

  return date;
}
