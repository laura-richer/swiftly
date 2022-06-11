import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlaylist } from '../utils/api-calls';
import { resetCurrentProgress } from '../utils/local-storage';

import Button from '../atoms/Button';

const YourSoundtrack = () => {
  const navigate = useNavigate();
  const { playlistId } = useParams();
  const [playlistUrl, setPlaylistUrl] = useState();

  const handleReset = () => {
    resetCurrentProgress();
    navigate('/');
  };

  useEffect(() => {
    getPlaylist(playlistId)
      .then(response => {
        setPlaylistUrl(response.external_urls.spotify);
      })
      .catch(error => {
        console.error(error);
      });
  }, [playlistId]);

  return (
    <div className="your-soundtrack">
      <div className="your-soundtrack__ctas">
        <Button tag="a" target="_blank" link={playlistUrl} text="Open in Spotify" />
        <Button
          tag="a"
          target="_blank"
          link={`https://www.facebook.com/sharer/sharer.php?u=https%3A//open.spotify.com/playlist/${playlistId}?si=cb34f8ddc1224cea`}
          text="Share on Facebook"
        />
        <Button text="Start over" onClick={handleReset} />
      </div>

      <iframe
        className="your-soundtrack__embed"
        title={playlistId}
        src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
        width="100%"
        height="380"
        frameBorder="0"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      ></iframe>
    </div>
  );
};

export default YourSoundtrack;
