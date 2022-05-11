import { useEffect, useState } from 'react';
import { fetchCategoryPlaylists, fetchPlaylist } from '../utils/api-calls.js';
import { getItem } from '../utils/local-storage.js';

const getPlaylists = async (token, category) =>  {
  const response = await fetchCategoryPlaylists(token, category);
  // All available playlists for category
  const { playlists : { items }} = response;

  // Pick a random playlist and get its url
  const playlist = randomPick(items);
  const { tracks : { href }} = playlist;

  return href;
}

const getTracks = async (token, playlist) => {
  const response = await fetchPlaylist(token, playlist);
  const { items } = response;
  return randomPick(items).track;
}

const randomPick = (items) => {
  return items[Math.floor(Math.random() * items.length)];
}

const GenerateResults = ({token}) => {
  const categories = JSON.parse(getItem('answers'));
  const [playlistData, setPlaylistData] = useState();
  const [trackData, setTrackData] = useState();
  const playlists = [];
  const tracks = [];

  // Get playlists for each category
  categories.forEach(category => {
    playlists.push(getPlaylists(token, category));
  });

  useEffect(() => {
    Promise.all(playlists).then(response => {
      setPlaylistData(response);
    }).catch(error => console.log(`Error in promises ${error}`));
  }, []);

  useEffect(() => {
    playlistData?.forEach(playlist => {
      tracks.push(getTracks(token, playlist));
    });

    // setTrackData(tracks);
  }, [playlistData]);

  useEffect(() => {
    Promise.all(tracks).then(response => {
      console.log(response);
    }).catch(error => console.log(`Error in promises ${error}`));
  }, [tracks]);

  return <p>get soundtrack

  </p>;
}

export default GenerateResults;
