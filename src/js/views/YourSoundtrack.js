import { useEffect, useState, lazy } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSoundtrack } from '../utils/api-calls';
import { resetCurrentProgress } from '../utils/local-storage';

import Button from '../atoms/Button';

const Error = lazy(() => import('../atoms/Error'));
const LoadingSpinner = lazy(() => import('../atoms/LoadingSpinner'));

const YourSoundtrack = () => {
  const navigate = useNavigate();
  const { playlistId } = useParams();

  const [fetchError, setFetchError] = useState();
  const [isFetchingSoundtrack, setIsFetchingSoundtrack] = useState(true);
  const [playlistUrl, setPlaylistUrl] = useState();

  const handleReset = () => {
    resetCurrentProgress();
    navigate('/');
  };

  useEffect(() => {
    fetchSoundtrack(playlistId)
      .then(response => {
        setPlaylistUrl(response.external_urls.spotify);
      })
      .catch(() => {
        setFetchError('Cant find your soundtrack');
      })
      .then(() => {
        setIsFetchingSoundtrack(false);
      });
  }, [playlistId]);

  if (isFetchingSoundtrack) return <LoadingSpinner />;
  if (fetchError) return <Error message={fetchError} />;

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
      <div className="your-soundtrack__embed">
        <iframe
          title={playlistId}
          src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
          width="100%"
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
      </div>
    </div>
  );
};

export default YourSoundtrack;
