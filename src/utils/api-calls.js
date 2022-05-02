import axios from 'axios';
import * as config from './vars.js';

const token = window.localStorage.getItem("token");
const refreshToken = window.localStorage.getItem("refreshToken");
const headers = {
  Authorization: `Bearer ${token}`
};
const tokenHeaders = {
  'Authorization': 'Basic ' + btoa(`${config.CLIENT_ID}:${config.CLIENT_SECRET}`)
}

export const fetchAccessToken = async (code) => {
  const { data } = await axios.post('https://accounts.spotify.com/api/token',
    serialize({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: config.REDIRECT_URI
    }), {
      headers: tokenHeaders,
    });

  return data;
}

export const fetchRefreshedToken = async () => {
  const { data } = await axios.post('https://accounts.spotify.com/api/token',
    serialize({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }), {
      headers: tokenHeaders,
    });

  console.log(data);

  return data;
}

export const fetchUserData = async () => {
  const { data } = await axios.get('https://api.spotify.com/v1/me', {
    headers
  });

  return data;
}


const serialize = function(obj) {
  var str = [];
  for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
  }
  return str.join("&");
}
