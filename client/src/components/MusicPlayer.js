import React from "react";
import SpotifyPlayer from "react-spotify-web-playback"

function MusicPlayer() {
  
  const token =
  "BQBDk5_tsQJsqgq3cJjz5t0mSrX6M-wtHn1lvvg7p_e268Ec3h-LaPIKs1ftkSO7oIyaPBH1stYixNu01KjGPYzylGL7LdU9_i5UKpae94lUexdo5r-wEmCOvAqN0_2nHKhjuCL6YWLk2bi6fFn-01Ki_EYjHXe5ksk0vLtxFZxvtHjxdJ4iKSL0RpWpG4zUzfpvK5LZGZX4xBoUsA"
  return (
    <div>
      <SpotifyPlayer
        token={token}
        uris={["spotify:track:2qHGDQmfxScbqf0BAwakKI"]}
      />
    </div>
  );
}

export default MusicPlayer;
