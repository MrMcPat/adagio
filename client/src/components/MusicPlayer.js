import React from "react";
import SpotifyPlayer from "react-spotify-web-playback"

function MusicPlayer({spotifyUri}) {
  
  const token =
    "BQBVDQyC8osXzhwG7yJwBGCC_bMICTBn9YUHa-_pgBIIXrb-EcFjzAZ8lcvSzyV3AkYBhbE2P9hRUQt-fU_5AWGzdYhc2d5l18dRmdmkiX91uFCQKr4LPgglq5vlDiIT2cvQF-fu_5DvaI3dTcRJx59c2yVTSOSw56XENJ3Azyh40X7hY1Ol8fMt5a2NRlJ9lX4i3yJBKL4NUKMtqQ"
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
