import axios from 'axios';
import { API_ENDPOINT } from './vars.js';

export const fetchUserData = async (token) => {
  const { data } = await axios.get('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return data;
}

export const fetchCategoryPlaylists = async (token, category) => {
  const { data } = await axios.get(`${API_ENDPOINT}/browse/categories/${category}/playlists?limit=50`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return data;
}

export const fetchPlaylist = async (token, playlist) => {
  const { data } = await axios.get(playlist, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return data;
}

// const serialize = function(obj) {
//   var str = [];
//   for (var p in obj) {
//       if (obj.hasOwnProperty(p)) {
//           str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
//       }
//   }
//   return str.join("&");
// }
