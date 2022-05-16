import { useState } from 'react';
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
  const popularTracks = items.filter(item => item.track?.popularity > 50);
  return randomPick(popularTracks).track;
}

const randomPick = (items) => {
  return items[Math.floor(Math.random() * items.length)];
}

const GenerateResults = ({token}) => {
  const categories = JSON.parse(getItem('answers'));
  const [trackData, setTrackData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const playlists = [];
  const tracks = [];

  // Get playlist for each category
  categories.forEach(category => {
    playlists.push(getPlaylists(token, category));
  });

  Promise.all(playlists).then(response => {
    const playlistData = response;

    // Get track from each playlist
    playlistData?.forEach(playlist => {
      tracks.push(getTracks(token, playlist));
    });

    Promise.all(tracks).then(response => {
      setTrackData(response);
    }).then(() => {
      setIsLoaded(true);
    }).catch(error => console.log(`Error in Tracks ${error}`));
  }).catch(error => console.log(`Error in Playlists ${error}`));

  return (
    <div>
      {isLoaded ?
        trackData?.map((track, index) =>
          <div key={track.id}>
            <p>{track.id}</p>
          </div>
        )
        : <p>loading</p>
      }

    </div>
  )
}

export default GenerateResults;
