import React from "react"
import SpotifyPlayer from "react-spotify-web-playback"

function MusicPlayer({spotifyUri, token}) {

  return (
    <div>
      <SpotifyPlayer
        token={token}
        uris={[spotifyUri]}
        autoPlay={false}
        styles={{
          activeColor: '#1cb954',
          bgColor: 'transparent',
          color: '#1cb954"',
          loaderColor: '#fff',
          sliderColor: '#1cb954',
          trackArtistColor: '#ccc',
          trackNameColor: '#fff',
        }}
      />
    </div>
  )
}

export default MusicPlayer
