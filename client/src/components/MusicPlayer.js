import React from "react"
import SpotifyPlayer from "react-spotify-web-playback"

function MusicPlayer({spotifyUri}) {
  const token =
    "BQA3WtT8Y4hKzhscnf7YUIDO3BoGXZSNMN_raorjV26p9wzdiqsp9eXK8uzkY07dOLws-noUwE0djS-NKJ75kUVS6eMHcjjQEsAQUttKFqccnIjMAeTgPgD7E0dzezyDmOvSJqEfMgnGqE3Cvh96D7Fij0V-bc4aBU236GyeidaV2JEi-D5tdCgPet4IYfJxPE2chL12ZBbn4pZRYg"

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
