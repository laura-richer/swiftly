const AudioPlayer = ({track}) => {
  return (
    <div className="audio-player">
      {track.album?.images[0]?.url && <img className="audio-player__image" src={track.album?.images[0]?.url} alt={track.name} />}
      <div className="audio-player__preview">
        {/* <p>{track.id}</p> */}
        <div className="audio-player__meta">
          <p>{track.name}</p>
          <p>{track.artists[0].name}</p>
        </div>
        {track.preview_url && <audio className="audio-player__preview" src={track.preview_url} controls></audio>}
      </div>
    </div>
  )
}

export default AudioPlayer;
