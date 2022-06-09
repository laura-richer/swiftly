import PropTypes from 'prop-types';

const AudioPlayer = ({ track }) => {
  return (
    <div className="audio-player">
      {track.album?.images[0]?.url && (
        <img
          className="audio-player__image"
          loading="lazy"
          src={track.album?.images[0]?.url}
          alt={track.name}
        />
      )}
      <div className="audio-player__preview">
        <div className="audio-player__meta">
          <p>{track.name}</p>
          <p>{track.artists[0].name}</p>
        </div>
        {track.preview_url && (
          <audio className="audio-player__preview" src={track.preview_url} controls />
        )}
      </div>
    </div>
  );
};

AudioPlayer.propTypes = {
  track: PropTypes.object.isRequired,
};

export default AudioPlayer;
