import React from "react";
import SpotifyPlayer from "react-spotify-web-playback"

function MusicPlayer({spotifyUri}) {
  
  const token =
    "BQCFeHF8L9EvCOj_mUVPkzrDbhMpUIOdN3Tm3grRVU4yuHwC4BknhNaUY-24-6SaoFwbQv0gPhhy3ddYihQFseD8BXlOx70MJivCfiGHqM9MRtSHsgodUfna3xjU2SDZ-VTHJm9RtQqXphklJOlC-UT5QNeFveT6_tBQCP3GeAs1ikUb33_0PYR-p8vqqIN7V7HMNEPv8lNC_3_s2w"
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
