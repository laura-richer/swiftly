import PropTypes from 'prop-types';

const AudioPlayer = ({ track }) => {
  const { artist, album, name, previewUrl, url } = track;

  return (
    <div className="audio-player">
      {album.image && (
        <a href={album.url} target="_blank" rel="noreferrer">
          <img className="audio-player__image" loading="lazy" src={album.image} alt={album.image} />
        </a>
      )}
      <div className="audio-player__preview">
        <div className="audio-player__meta">
          <p>
            <a href={url} target="_blank" rel="noreferrer">
              {name}
            </a>
          </p>
          <p>
            <a href={artist.url} target="_blank" rel="noreferrer">
              {artist.name}
            </a>
          </p>
        </div>
        {previewUrl && (
          <audio
            className="audio-player__preview"
            src={previewUrl}
            controls
            controlsList="nodownload noplaybackrate"
          />
        )}
      </div>
    </div>
  );
};

AudioPlayer.propTypes = {
  track: PropTypes.object.isRequired,
};

export default AudioPlayer;
