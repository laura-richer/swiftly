import axios from 'axios';
import { API_ENDPOINT } from './vars.js';

// TODO once token has been got globally, make header object and apply to each api call
// const headers = () => {
//   // TODO get token here rather than sending from each component

//   return {
//     Authorization: `Bearer ${token}`
//   }
// }

export const fetchUserData = async (token) => {
  const { data } = await axios.get(`${API_ENDPOINT}/me`, {
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

export const getPlaylist = async (token, playlistId) => {
  const { data } = await axios.get(`${API_ENDPOINT}/playlists/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return data;
}

export const savePlaylist = async (token, userId, tracks) => {
  const newPlaylist = await createPlaylist(token, userId);
  await addTracksToPlaylist(token, newPlaylist.id, tracks);
  return newPlaylist;
}

const createPlaylist = async (token, userId) => {
  const requestBody = {
    name: `SwiftLY Daily soundtrack - ${new Date().toDateString()}`,
    public: false,
  };

  const { data } = await axios.post(`${API_ENDPOINT}/users/${userId}/playlists`, requestBody, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return data;
}

const addTracksToPlaylist = async (token, playlistId, tracks) => {
  const requestBody = {
    uris: [
      ...tracks
    ],
  }

  const { data } = await axios.post(`${API_ENDPOINT}/playlists/${playlistId}/tracks`, requestBody, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return data;
}
