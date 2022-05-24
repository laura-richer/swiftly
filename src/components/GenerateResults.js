import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { fetchCategoryPlaylists, fetchPlaylist, savePlaylist } from '../utils/api-calls.js';
import { getItem, setItem, resetProgress } from '../utils/local-storage.js';

import AudioPlayer from '../atoms/AudioPlayer.js';
import Button from '../atoms/Button.js';

const getPlaylists = async (token, category) =>  {
  const response = await fetchCategoryPlaylists(token, category);
  // All available playlists for category
  const { playlists : { items }} = response;

  // Pick a random playlist and get its url
  const playlist = randomPick(items);
  const { tracks : { href }} = playlist;

  // TODO account for empty playlist
  return href;
}

const getTracks = async (token, playlist) => {
  const response = await fetchPlaylist(token, playlist);
  const { items } = response;
  const popularTracks = items.filter(item => item.track?.popularity > 40);

  // TODO account for empty track
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
  const navigate = useNavigate();

  const userId = JSON.parse(getItem('userData')).id;
  const categories = JSON.parse(getItem('answers'));

  const playlists = [];
  const tracks = [];

  const [trackData, setTrackData] = useState();
  const [trackURIs, setTrackURIs] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  // Get a random playlist for each category
  categories.forEach(category => {
    playlists.push(getPlaylists(token, category));
  });

  const handleSavePlaylist = (trackURIs) => {
    savePlaylist(token, userId, trackURIs).then(response => {
      setItem('playlist', JSON.stringify(response));
      navigate('/your-playlist');
    }).catch(error => {
      // TODO error handling
      console.log(error);
    });
  }

  const handleReset = () => {
    resetProgress();
    navigate('/');
  }

  useEffect(() => {
    // TODO dont regenerate playlist on refresh. Save to local storage and check first
    if (trackData) {
      initEventListners();
    };

    if (!trackData) {
      Promise.all(playlists).then(response => {
        const playlistData = response;

        // Get a random track from each playlist
        playlistData?.forEach(playlist => {
          tracks.push(getTracks(token, playlist));
        });

        Promise.all(tracks).then(response => {
          // TODO does this need to be state???
          setTrackURIs(response.map(({ uri }) => uri));
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
            <Button text="Save Playlist" onClick={() => handleSavePlaylist(trackURIs)}/>
            <Button btnStyle="secondary" text="Reset" onClick={handleReset}/>
          </div>
          <div className="results-container__list">
            {trackData?.map((track, index) =>
              <AudioPlayer key={track.id} track={track} />
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default GenerateResults;
