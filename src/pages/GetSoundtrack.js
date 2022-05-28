import { useState, useEffect, useContext, lazy } from 'react';
import { useNavigate } from "react-router-dom";
import { fetchCategoryPlaylists, fetchPlaylist, savePlaylist } from '../utils/api-calls.js';
import { getItem, resetProgress } from '../utils/local-storage.js';
import { UserDataContext } from '../components/UserDataContext.js';

import LoadingSpinner from '../atoms/LoadingSpinner.js';

const AudioPlayer = lazy(() => import('../atoms/AudioPlayer.js'));
const Button = lazy(() => import('../atoms/Button.js'));

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

const randomPick = (items) => items[Math.floor(Math.random() * items.length)];

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

const GetSoundtrack = ({token}) => {
  const navigate = useNavigate();
  const userData = useContext(UserDataContext);
  const categories = JSON.parse(getItem('answers'));

  const playlists = [];
  const tracks = [];

  const [trackData, setTrackData] = useState();
  const [trackURIs, setTrackURIs] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  // TODO why is the component re rendering 5 times?
  console.log(userData);

  // Get a random playlist for each category
  categories.forEach(category => playlists.push(getPlaylists(token, category)));

  const handleSaveAsPlaylist = (trackURIs) => {
    savePlaylist(token, userData.id, trackURIs).then(response => {
      navigate(`/your-soundtrack/${response.id}`);
    }).catch(error => {
      // TODO error handling
      console.log(error);
    });
  }

  const handleRefreshSoundtrack = () => {
    // TODO Do this better by just re calling the functions or re rendering the component
    window.location.reload();
  }

  const handleReset = () => {
    resetProgress();
    navigate('/');
  }

  useEffect(() => {
    if (trackData) initEventListners();

    if (!trackData) {
      Promise.all(playlists).then(response => {
        const playlistData = response;

        // Get a random track from each playlist
        playlistData?.forEach(playlist => tracks.push(getTracks(token, playlist)));

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

  if (!isLoaded) return <LoadingSpinner />


  return (
    <div className="get-soundtrack">
      <div className="get-soundtrack__ctas">
        <Button btnStyle="secondary" text="Start over" onClick={handleReset}/>
        <Button text="Refresh soundtrack" onClick={handleRefreshSoundtrack}/>
        <Button text="Save to Spotify" onClick={() => handleSaveAsPlaylist(trackURIs)}/>
      </div>
      <div className="get-soundtrack__list">
        {trackData?.map((track, index) =>
          <AudioPlayer key={track.id} track={track} />
        )}
      </div>
    </div>
  )
}

export default GetSoundtrack;
