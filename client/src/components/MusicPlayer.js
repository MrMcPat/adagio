import React from "react";
import SpotifyPlayer from "react-spotify-web-playback"

function MusicPlayer({spotifyUri}) {
  
  const token =
    "BQBtURrP1ea-LNOtBvvcoDZTfU4-AFxmqg9EiovKNxEKrsspIsGbbjcZfDuJE7_u691q9dW4XgNDWpNM5gnjJ6ML_dYBYmlrRCuDT4bw05W9c1xscfaIiZFuFmbKfhSI5bVdbP1rxtWQqN90rUcWWgoA_ESPfZfK9JZxpGvXS1wnvOm7R3hLUh3cmA0k-NS1OTj0tJp7k6d7c3uaIQ"
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
