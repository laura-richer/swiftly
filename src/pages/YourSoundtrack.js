import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlaylist } from '../utils/api-calls.js';
import { resetCurrentProgress } from '../utils/local-storage.js';

import Button from '../atoms/Button.js';

const YourSoundtrack = () => {
  const navigate = useNavigate();
  const { playlistId } = useParams();
  const [playlistUrl, setPlaylistUrl] = useState();

  const handleReset = () => {
    resetCurrentProgress();
    navigate('/');
  }

  useEffect(() => {
      getPlaylist(playlistId)
        .then(response => {
          setPlaylistUrl(response.external_urls.spotify);
        }).catch((error) => {
          console.log(error);
        });
    }, [playlistId])

  return (
    <div className="your-soundtrack">
      <Button tag="a" target="_blank" link={playlistUrl} text="Open in Spotify"/>
      <Button text="Start over" onClick={handleReset}/>
      <Button tag="a" target="_blank" link="https://www.facebook.com/sharer/sharer.php?u=https%3A//open.spotify.com/playlist/1C1grPOraf0hFqzXYqo6qU?si=6e72478c53b64b4d" text="Share on Facebook"/>
    </div>
  )
}

export default YourSoundtrack;
