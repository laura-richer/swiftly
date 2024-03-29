import axios from 'axios';
import Cookies from 'js-cookie';
import { API_ENDPOINT } from './variables';

const headers = () => {
  return { Authorization: `Bearer ${Cookies.get('accessToken')}` };
};

export const fetchUserData = async () => {
  try {
    const { data } = await axios.get(`${API_ENDPOINT}/me`, {
      headers: headers(),
    });

    return data;
  } catch (error) {
    console.error(`Error fetching user data - ${error}`);
  }
};

export const fetchCategories = async () => {
  try {
    const { data } = await axios.get(`${API_ENDPOINT}/browse/categories?limit=50`, {
      headers: headers(),
    });

    return data;
  } catch {
    console.error('Cant fetch categories');
  }
};

export const fetchCategoryPlaylists = async category => {
  try {
    const { data } = await axios.get(`${API_ENDPOINT}/browse/categories/${category}/playlists`, {
      headers: headers(),
    });

    return data;
  } catch (error) {
    console.error(`Error fetching category playlists - ${error}`);
  }
};

export const fetchPlaylist = async playlist => {
  try {
    const { data } = await axios.get(playlist, {
      headers: headers(),
    });

    return data;
  } catch (error) {
    console.error(`Error fetching playlist - ${error}`);
  }
};

export const fetchSoundtrack = async playlistId => {
  try {
    const { data } = await axios.get(`${API_ENDPOINT}/playlists/${playlistId}`, {
      headers: headers(),
    });

    return data;
  } catch (error) {
    console.error(`Error fetching soundtrack - ${error}`);
  }
};

const createPlaylist = async userId => {
  const requestBody = {
    name: `SwiftLY Daily soundtrack - ${new Date().toDateString()}`,
    public: false,
  };

  try {
    const { data } = await axios.post(`${API_ENDPOINT}/users/${userId}/playlists`, requestBody, {
      headers: headers(),
    });

    return data;
  } catch (error) {
    console.error(`Error creating new playlist - ${error}`);
  }
};

const addTracksToPlaylist = async (playlistId, tracks) => {
  const requestBody = {
    uris: [...tracks],
  };

  try {
    const { data } = await axios.post(
      `${API_ENDPOINT}/playlists/${playlistId}/tracks`,
      requestBody,
      {
        headers: headers(),
      }
    );

    return data;
  } catch (error) {
    console.error(`Error adding tracks to playlist - ${error}`);
  }
};

export const savePlaylist = async (userId, tracks) => {
  try {
    const newPlaylist = await createPlaylist(userId);
    await addTracksToPlaylist(newPlaylist.id, tracks);
    return newPlaylist;
  } catch (error) {
    console.error(error, 'Error saving soundtrack');
  }
};
