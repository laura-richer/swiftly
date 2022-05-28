import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlaylist } from '../utils/api-calls.js';
import { resetProgress } from '../utils/local-storage.js';

import Button from '../atoms/Button.js';

const YourSoundtrack = ({token}) => {
  const navigate = useNavigate();
  const { playlistId } = useParams();
  const [playlistUrl, setPlaylistUrl] = useState();

  const handleReset = () => {
    resetProgress();
    navigate('/');
  }

  useEffect(() => {
      getPlaylist(token, playlistId)
        .then(response => {
          setPlaylistUrl(response.external_urls.spotify);
        }).catch((error) => {
          // TODO if playlist doesnt exist start over
          console.log(error);
        });
    }, [playlistId])

  return (
    <div className="your-soundtrack">
      <Button tag="a" target="_blank" link={playlistUrl} text="Open in Spotify"/>
      <Button text="Start over" onClick={handleReset}/>
      <div>
        <p>share your soundtrack</p>
      </div>
    </div>
  )
}

export default YourSoundtrack;
