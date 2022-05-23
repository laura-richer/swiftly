const AudioPlayer = ({track}) => {
  return (
    <div className="audio-player">
      <p>{track.id}</p>
      <p>{track.name}</p>
      {track.album?.images[0]?.url && <img className="audio-player__image" src={track.album?.images[0]?.url} alt={track.name} />}
      <p>{track.artists[0].name}</p>
      {track.preview_url && <audio src={track.preview_url} controls></audio>}
    </div>
  )
}

export default AudioPlayer;
