import React from "react"
import SpotifyPlayer from "react-spotify-web-playback"

function MusicPlayer({spotifyUri}) {
  const token =
    "BQDiLZjawXyGRVO9dwSU_Kn8ky9TbZCPrrx6Zn7E0ETxzLzi_lKfYRXq4Pxu7OA_CQH87Olver3mkosGNZq3WIBsCRanpWkndgdmS0ya6hEI_fMZF0vAbSLgPX6A75lYDVwIuxaWN0RWtF5rkLSOjZMO6fcgV7GA1thincnQW8WONkwVyllJ8L-7rMf5PdKLNTcRim43YwDWkYIFvg"
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
