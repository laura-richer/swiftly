import PropTypes from 'prop-types';

const AudioPlayer = ({ track }) => {
  const { artist, image, name, previewUrl } = track;

  return (
    <div className="audio-player">
      {image && <img className="audio-player__image" loading="lazy" src={image} alt={name} />}
      <div className="audio-player__preview">
        <div className="audio-player__meta">
          <p>{name}</p>
          <p>{artist}</p>
        </div>
        {previewUrl && <audio className="audio-player__preview" src={previewUrl} controls />}
      </div>
    </div>
  );
};

AudioPlayer.propTypes = {
  track: PropTypes.object.isRequired,
};

export default AudioPlayer;
