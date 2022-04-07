import React from "react"
import SpotifyPlayer from "react-spotify-web-playback"

function MusicPlayer({spotifyUri}) {
  const token =
    "BQDoLMHqpseX1qL40t7E0zeM37gvyDswpAZ4gSFzUjmM2UkRP3NaOMfAIiszdNj6Wtx4pIOvnmwKRnoX9Pyq4vkr5EPc6l7o_SzyioyFcsTXmBwFHygNa3_xh69Kj7d7CwNh98b5hGIgaBt3Rt09o3jeDjs8mz5dA-U-nn_xePusau4gFxgQXTZvllgc45CgKDjKUU7HgvjuvYL-vQ"
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
