import React from "react";
import SpotifyPlayer from "react-spotify-web-playback"

function MusicPlayer({spotifyUri}) {
  
  const token =
    "BQDWY_e3I2sVjJ1ptsJbAmUmxEIORFbsWmOTCPltAK-eh9YvoycfiuIFgpPKttp8CnTAHJA_x2PDv9nlqL28k-ewpuhTGnHaNC8kM5c1ZWkAuIm5e5ZQDMz_7fX6DIfBRMA1jV2Gl9x22xKwYv6ZzI9wBc7VqVlj2PGeWHaPMMukFPCJWCD8d85BoFBTPRkjVbPR_QhqLkeUBFl96Q"
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
