import React from "react"
import SpotifyPlayer from "react-spotify-web-playback"

function MusicPlayer({spotifyUri}) {
  const token =
    "BQDeYT-gdOV-GUfTzPf6mP-cnJQfof7FRocpLGgmtkVzN8-Kw21dV8F5sgtaKUPRT7uioqd883sT1gopMME8CqhfVzCNrWRcCpW4qgeLqMDiOaIQ2lhi4vZXiZ0XdLkzYnNE-Rr_YuDoCcOUwEntR_thw8MOB8MCTgwOMiuEOoIzkXGsD5vri_hrTXV4keHNmKqDXTA_DTF_IevT3Q"
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
