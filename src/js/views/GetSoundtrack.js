/* eslint-disable camelcase */
import { useState, useEffect, useContext, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCategoryPlaylists, fetchPlaylist, savePlaylist } from '../utils/api-calls';
import { getItem, resetCurrentProgress } from '../utils/local-storage';
import { UserDataContext } from '../contextProviders/UserDataContext';

import LoadingSpinner from '../atoms/LoadingSpinner';

const AudioPlayer = lazy(() => import('../atoms/AudioPlayer'));
const Button = lazy(() => import('../atoms/Button'));

const promiseResolveAll = async promise => Promise.all(promise);

const randomPick = items => items[Math.floor(Math.random() * items.length)];

const fetchPlaylistFromCategory = async category => {
  const response = await fetchCategoryPlaylists(category);
  const { items } = response.playlists;

  try {
    // Pick a random playlist and get its url
    const playlist = randomPick(items);
    return playlist.tracks.href;
  } catch (error) {
    console.error(`Error getting playlist - ${error}`);
  }
};

const fetchTrackFromPlaylist = async playlist => {
  const response = await fetchPlaylist(playlist);
  const { items } = response;

  try {
    const popularTracks = items.filter(item => item.track?.popularity > 40);

    // If theres no popular tracks in a playlist, use all tracks from playlist
    return popularTracks.length > 0 ? randomPick(popularTracks).track : randomPick(items).track;
  } catch (error) {
    console.error(`Error getting playlist track - ${error}`);
  }
};

const buildSoundtrackFromAnswers = async categories => {
  const playlistsAsPromised = [];
  const tracksAsPromised = [];

  categories.forEach(category => playlistsAsPromised.push(fetchPlaylistFromCategory(category)));
  const playlists = await promiseResolveAll(playlistsAsPromised);

  playlists.forEach(playlist => tracksAsPromised.push(fetchTrackFromPlaylist(playlist)));
  const tracks = await promiseResolveAll(tracksAsPromised);

  return tracks.map(({ album, artists, id, name, preview_url, uri }) => {
    return {
      artist: artists?.[0].name,
      id,
      image: album?.images?.[0].url,
      name,
      previewUrl: preview_url,
      uri,
    };
  });
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

  const [trackData, setTrackData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  const handleSaveAsPlaylist = async tracks => {
    const trackUris = tracks.map(({ uri }) => uri);
    const response = await savePlaylist(userData.id, trackUris);
    navigate(`/your-soundtrack/${response.id}`);
  };

  const handleRefreshSoundtrack = async () => {
    setIsLoaded(false);

    const response = await buildSoundtrackFromAnswers(categoriesForQuestionAnswers);
    setTrackData(response);
    setIsLoaded(true);
  };

  const handleReset = () => {
    resetCurrentProgress();
    navigate('/');
  };

  useEffect(() => {
    if (trackData) initEventListners();

    if (!trackData) {
      buildSoundtrackFromAnswers(categoriesForQuestionAnswers)
        .then(response => {
          setTrackData(response);
        })
        .then(() => setIsLoaded(true));
    }
  });

  if (!isLoaded) return <LoadingSpinner />;

  return (
    <div className="get-soundtrack">
      <div className="get-soundtrack__ctas">
        <Button text="Save to Spotify" onClick={() => handleSaveAsPlaylist(trackData)} />
        <Button text="Refresh soundtrack" onClick={handleRefreshSoundtrack} />
        <Button btnStyle="secondary" text="Start over" onClick={handleReset} />
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
