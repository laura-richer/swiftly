import { useState, useEffect, useContext, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCategoryPlaylists, fetchPlaylist, savePlaylist } from '../utils/api-calls';
import { getItem, resetCurrentProgress } from '../utils/local-storage';
import { UserDataContext } from '../components/UserDataContext';

import LoadingSpinner from '../atoms/LoadingSpinner';

const AudioPlayer = lazy(() => import('../atoms/AudioPlayer'));
const Button = lazy(() => import('../atoms/Button'));

const randomPick = items => items[Math.floor(Math.random() * items.length)];

const getPlaylistFromCategory = async category => {
  const response = await fetchCategoryPlaylists(category);
  // All available playlists for category
  const {
    playlists: { items },
  } = response;

  try {
    // Pick a random playlist and get its url
    const playlist = randomPick(items);
    const {
      tracks: { href },
    } = playlist;

    return href;
  } catch (error) {
    console.log(`Error getting playlist - ${error}`);
  }
};

const getTrackFromPlaylist = async playlist => {
  const response = await fetchPlaylist(playlist);
  const { items } = response;

  try {
    const popularTracks = items.filter(item => item.track?.popularity > 40);

    // If theres no popular tracks in a playlist, use all tracks from playlist
    return popularTracks.length > 0 ? randomPick(popularTracks).track : randomPick(items).track;
  } catch (error) {
    console.log(`Error getting playlist track - ${error}`);
  }
};

const handleRefreshSoundtrack = () => {
  window.location.reload();
};

const initEventListners = () => {
  // Toggle audio players to pause when another is played
  document.addEventListener(
    'play',
    event => {
      const audioElements = document.querySelectorAll('audio');

      for (let index = 0, { length } = audioElements; index < length; index++) {
        if (audioElements[index] !== event.target) {
          audioElements[index].pause();
        }
      }
    },
    true
  );
};

const GetSoundtrack = () => {
  const navigate = useNavigate();
  const userData = useContext(UserDataContext);
  const categoriesForQuestionAnswers = JSON.parse(getItem('answers'));

  const playlists = [];
  const tracks = [];

  const [trackData, setTrackData] = useState();
  const [trackURIs, setTrackURIs] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  const handleSaveAsPlaylist = trackURIs => {
    savePlaylist(userData.id, trackURIs)
      .then(response => {
        navigate(`/your-soundtrack/${response.id}`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleReset = () => {
    resetCurrentProgress();
    navigate('/');
  };

  useEffect(() => {
    if (trackData) initEventListners();

    if (!trackData) {
      // Get a random playlist for each category
      categoriesForQuestionAnswers.forEach(category =>
        playlists.push(getPlaylistFromCategory(category))
      );

      try {
        Promise.all(playlists)
          .then(response => {
            const playlistData = response;

            // Get a random track from each playlist
            playlistData?.forEach(playlist => tracks.push(getTrackFromPlaylist(playlist)));

            Promise.all(tracks)
              .then(response => {
                setTrackURIs(response.map(({ uri }) => uri));
                setTrackData(response);
              })
              .then(() => {
                setIsLoaded(true);
              })
              .catch(error => console.log(`Error in Tracks - ${error}`));
          })
          .catch(error => console.log(`Error in Playlists - ${error}`));
      } catch (error) {
        console.log(error);
      }
    }
  }, [playlists]);

  if (!isLoaded) return <LoadingSpinner />;

  return (
    <div className="get-soundtrack">
      <div className="get-soundtrack__ctas">
        <Button btnStyle="secondary" text="Start over" onClick={handleReset} />
        <Button text="Refresh soundtrack" onClick={handleRefreshSoundtrack} />
        <Button text="Save to Spotify" onClick={() => handleSaveAsPlaylist(trackURIs)} />
      </div>
      <div className="get-soundtrack__list">
        {trackData?.map(track => (
          <AudioPlayer key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
};

export default GetSoundtrack;
