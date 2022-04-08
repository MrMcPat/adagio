import React from "react"
import SpotifyPlayer from "react-spotify-web-playback"

function MusicPlayer({spotifyUri}) {

  const token = process.env.REACT_APP_SPOTIFY_ACCESS_TOKEN

  return (
    <div>
      <SpotifyPlayer
        token={token}
        uris={[spotifyUri]}
        autoPlay={false}
      />
    </div>
  );
}

export default MusicPlayer
