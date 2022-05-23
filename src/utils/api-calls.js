import axios from 'axios';
import { API_ENDPOINT } from './vars.js';

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

export const savePlaylist = async (token, playlist, userId) => {
  console.log(new Date());
  const { data } = await axios.post(`${API_ENDPOINT}/users/1112152777/playlists`, {
    name: `SwiftLY Daily soundtrack - ${new Date()}`,
    description: 'New playlist description',
    public: false

  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return data;
}
