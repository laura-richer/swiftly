/* eslint-disable camelcase */
import { useState, useEffect, useContext, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCategoryPlaylists, fetchPlaylist, savePlaylist } from '../utils/api-calls';
import { getItem, resetCurrentProgress } from '../utils/local-storage';
import { UserDataContext } from '../contextProviders/UserDataContext';

import LoadingSpinner from '../atoms/LoadingSpinner';

import '../../scss/pages/get-soundtrack.scss';

const AudioPlayer = lazy(() => import('../atoms/AudioPlayer'));
const Button = lazy(() => import('../atoms/Button'));
const Error = lazy(() => import('../atoms/Error'));

const promiseResolveAll = async promise => Promise.all(promise);

const randomPick = items => items[Math.floor(Math.random() * items.length)];

const fetchPlaylistFromCategory = async category => {
  const response = await fetchCategoryPlaylists(category);
  const { items } = response.playlists;

  try {
    // Pick a random playlist from a category
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

    // Pick a random track in a playlist
    // If theres no popular tracks in a playlist, use all tracks from playlist
    return popularTracks.length > 0 ? randomPick(popularTracks).track : randomPick(items).track;
  } catch (error) {
    console.error(`Error getting playlist track - ${error}`);
  }
};

const buildSoundtrackFromAnswers = async categories => {
  const playlistsAsPromised = [];
  const tracksAsPromised = [];

  try {
    // Get random playlist for each category
    categories.forEach(category => playlistsAsPromised.push(fetchPlaylistFromCategory(category)));
    const playlists = await promiseResolveAll(playlistsAsPromised);

    // Get random track from each playlist
    playlists.forEach(playlist => tracksAsPromised.push(fetchTrackFromPlaylist(playlist)));
    const tracks = await promiseResolveAll(tracksAsPromised);

    return tracks.map(({ album, artists, id, name, preview_url, uri, external_urls }) => {
      return {
        artist: {
          name: artists?.[0].name,
          url: artists?.[0].external_urls.spotify,
        },
        album: {
          image: album.images?.[0].url,
          url: album.external_urls.spotify,
        },
        id,
        url: external_urls.spotify,
        name,
        previewUrl: preview_url,
        uri,
      };
    });
  } catch (error) {
    console.error(error, 'Error building soundtrack');
    throw error;
  }
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

  const [buildingSoundtrack, setBuildingSoundtrack] = useState(true);
  const [soundtrackError, setSoundtrackError] = useState();
  const [soundtrackData, setSoundtrackData] = useState();
  const [savingPlaylist, setSavingPlaylist] = useState(false);

  const errorMessage = 'Error building your soundtrack, refresh the page to try again';

  const handleSaveAsPlaylist = async tracks => {
    setSavingPlaylist(true);
    const trackUris = tracks.map(({ uri }) => uri);

    try {
      const response = await savePlaylist(userData.id, trackUris);
      navigate(`/your-soundtrack/${response.id}`);
    } catch {
      navigate(`/your-soundtrack/error`);
    }
  };

  const handleRefreshSoundtrack = async () => {
    setBuildingSoundtrack(true);
    try {
      const response = await buildSoundtrackFromAnswers(categoriesForQuestionAnswers);
      setSoundtrackData(response);
    } catch {
      setSoundtrackError(errorMessage);
    } finally {
      setBuildingSoundtrack(false);
    }
  };

  const handleReset = () => {
    resetCurrentProgress();
    navigate('/');
  };

  useEffect(() => {
    if (soundtrackData) initEventListners();

    if (!soundtrackData) {
      buildSoundtrackFromAnswers(categoriesForQuestionAnswers)
        .then(response => {
          setSoundtrackData(response);
        })
        .catch(() => {
          setSoundtrackError(errorMessage);
        })
        .then(() => setBuildingSoundtrack(false));
    }
  });

  if (buildingSoundtrack) return <LoadingSpinner />;

  return (
    <div className="get-soundtrack">
      <div className="get-soundtrack__ctas">
        <Button
          disabled={savingPlaylist || !!soundtrackError}
          text="Save to Spotify"
          onClick={() => handleSaveAsPlaylist(soundtrackData)}
        />
        <Button text="Refresh soundtrack" onClick={handleRefreshSoundtrack} />
        <Button btnStyle="secondary" text="Start over" onClick={handleReset} />
      </div>
      <div className="get-soundtrack__list">
        {soundtrackError ? (
          <Error message={soundtrackError} />
        ) : (
          <div>
            {soundtrackData?.map(track => (
              <AudioPlayer key={track.id} track={track} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GetSoundtrack;
