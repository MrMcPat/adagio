import React from "react"
import SpotifyPlayer from "react-spotify-web-playback"

function MusicPlayer({spotifyUri}) {
  const token =
    "BQCm5k2SagJbufxT2AJ9ugcLjgaSbqu9RY5towfdm5eG1iOEs9kEzHN9VPQz5DZSEeZ9NsxxcevRcNePZn-EzMIR5bv_3TmzgUMVwwAsTFICDA5N9VJKHf0wUJiDLWMI5VdifnuyRN6W3aebXCa5VyrzjdZPnJK0enFuAbXA8FJea0FbjjcsYyae4Xl7SdrQ6-GJhApLuO0yZRWoFg"
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
