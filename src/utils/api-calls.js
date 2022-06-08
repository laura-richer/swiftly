import axios from 'axios';
import Cookies from 'js-cookie'
import { API_ENDPOINT } from './vars.js';

const headers = () => {
  return { Authorization: `Bearer ${Cookies.get('accessToken')}` }
};

export const fetchUserData = async (token) => {
  try {
    const { data } = await axios.get(`${API_ENDPOINT}/me`, {
      headers: headers(),
    });

    return data;
  } catch(error) {
    console.log(`Error fetching user data - ${error}`);
  }
}

export const fetchCategoryPlaylists = async (category) => {
  try {
    const { data } = await axios.get(`${API_ENDPOINT}/browse/categories/${category}/playlists?limit=50`, {
      headers: headers(),
    });

    return data;
  } catch(error) {
    console.log(`Error fetching category playlists - ${error}`);
  }
}

export const fetchPlaylist = async (playlist) => {
  try {
    const { data } = await axios.get(playlist, {
      headers: headers(),
    });

    return data;
  } catch(error) {
    console.log(`Error fetching playlist - ${error}`);
  }
}

export const getPlaylist = async (playlistId) => {
  try {
    const { data } = await axios.get(`${API_ENDPOINT}/playlists/${playlistId}`, {
      headers: headers(),
    });

    return data;
  } catch(error) {
    console.log(`Error fetching soundtrack - ${error}`);
  }
}

export const savePlaylist = async (userId, tracks) => {
  const newPlaylist = await createPlaylist(userId);
  await addTracksToPlaylist(newPlaylist.id, tracks);
  return newPlaylist;
}

const createPlaylist = async (userId) => {
  const requestBody = {
    name: `SwiftLY Daily soundtrack - ${new Date().toDateString()}`,
    public: false,
  };

  try {
    const { data } = await axios.post(`${API_ENDPOINT}/users/${userId}/playlists`, requestBody, {
      headers: headers(),
    });

    return data;
  } catch(error) {
    console.log(`Error creating new playlist - ${error}`);
  }

}

const addTracksToPlaylist = async (playlistId, tracks) => {
  const requestBody = {
    uris: [
      ...tracks
    ],
  }

  try {
    const { data } = await axios.post(`${API_ENDPOINT}/playlists/${playlistId}/tracks`, requestBody, {
      headers: headers(),
    });

    return data;
  } catch(error) {
    console.log(`Error adding tracks to playlist - ${error}`)
  }
}
