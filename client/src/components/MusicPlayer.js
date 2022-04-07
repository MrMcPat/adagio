import React from "react";
import SpotifyPlayer from "react-spotify-web-playback"

function MusicPlayer({spotifyUri}) {
  const token =
    "BQA4786yli6LwSX869pVSBEBIyhgq2lc6x8yllqGhxuBhUg3myJND0CJpJLRk_VVSurOl-40poIP7iSOG9PmVls_X_eBEUuhIzi6011GWQtKb71rHR6QXoporJhMTZOPHZM-tNCkZRg0JkHMBXEPCtzBB5a1Kvr3fd57zDYWMmjIUSsflh1boMyRmUwwkPrp8O8GBzRA4cH7O-ZowQ"
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
