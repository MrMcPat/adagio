import React from "react"
import SpotifyPlayer from "react-spotify-web-playback"

function MusicPlayer({spotifyUri}) {
  const token =
    "BQBVXj6Z1FbHU-eIOUwGFX9pdWSZFQiTKVYJ0ceBn2SZT0Qb1O-pGbuaq8OepgpeS9cktugao0ClemK9yVnakVQI9ElWOXzCf-IAmWPxDukX38Rpap2Sc8ZyI6FZj-dOA8aJ9sq2UqwRjcJHPBknUClvkf6bqCpJGeSSBLkC0yl9Aiq1t24703lm49ve2b11rgKnwsVUE1BEFKDUDA"
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
