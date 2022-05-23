import { useState, useEffect } from 'react';
import { fetchCategoryPlaylists, fetchPlaylist } from '../utils/api-calls.js';
import { getItem } from '../utils/local-storage.js';

import AudioPlayer from '../atoms/AudioPlayer.js';
import Button from '../atoms/Button.js';

const getPlaylists = async (token, category) =>  {
  const response = await fetchCategoryPlaylists(token, category);
  // All available playlists for category
  const { playlists : { items }} = response;

  // Pick a random playlist and get its url
  const playlist = randomPick(items);
  const { tracks : { href }} = playlist;

  return href || undefined;
}

const getTracks = async (token, playlist) => {
  const response = await fetchPlaylist(token, playlist);
  const { items } = response;
  const popularTracks = items.filter(item => item.track?.popularity > 40);

  return randomPick(popularTracks).track;
}

const randomPick = (items) => {
  return items[Math.floor(Math.random() * items.length)];
}

const initEventListners = () => {
  // Toggle audio players to pause when another is played
  document.addEventListener('play', (e) => {
    const audioElements = document.getElementsByTagName('audio');

    for (let i = 0, length = audioElements.length; i < length; i++) {
      if (audioElements[i] !== e.target) {
        audioElements[i].pause();
      }
    }
  }, true);
}

const GenerateResults = ({token}) => {
  const categories = JSON.parse(getItem('answers'));
  const [trackData, setTrackData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const playlists = [];
  const tracks = [];

  // Get a random playlist for each category
  categories.forEach(category => {
    playlists.push(getPlaylists(token, category));
  });

  const handleSavePlaylist = () => {
    console.log('save')
  }

  const handleReset = () => {
    console.log('reset');
  }

  useEffect(() => {
    if (trackData) initEventListners();

    if (!trackData) {
      Promise.all(playlists).then(response => {
        const playlistData = response;

        // Get a random track from each playlist
        playlistData?.forEach(playlist => {
          tracks.push(getTracks(token, playlist));
        });

        Promise.all(tracks).then(response => {
          setTrackData(response);
        }).then(() => {
          setIsLoaded(true);
        }).catch(error => console.log(`Error in Tracks ${error}`));
      }).catch(error => console.log(`Error in Playlists ${error}`));
    }
  }, [playlists]);

  return (
    <div>
      {isLoaded &&
        <div className="results-container">
          <div>
            {trackData?.map((track, index) =>
              <AudioPlayer key={track.id} track={track} />
            )}
          </div>
          <div>
            <Button text="Save Playlist" onClick={handleSavePlaylist}/>
            <Button btnStyle="secondary" text="Reset" onClick={handleReset}/>

          </div>
        </div>
      }
    </div>
  )
}

export default GenerateResults;
