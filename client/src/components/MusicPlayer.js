import React from "react";
import SpotifyPlayer from "react-spotify-web-playback"

function MusicPlayer({spotifyUri}) {
  
  const token =
    "BQBdAf1sOizYLAhz0jjI5UI4p1PD8OfTkHDv7hgjMVFu7ZINIUJih7ljlP72V-pQuRRfGfRN2B1939P61uwMd3Oea69jDP8aqK1ciRtr7PoWnSMowf16ZmIwPosuL9dBnLZGecSj2E3ww2MfcekSi3hfeLbEvA4vaZ2HRENlUNyIMvqZaIFdkDLiClEbzyAYoH2V07KuMz9qJiIgug"
  return (
    <div>
      <SpotifyPlayer
        token={token}
        uris={[spotifyUri]}
      />
    </div>
  );
}

export default MusicPlayer;
