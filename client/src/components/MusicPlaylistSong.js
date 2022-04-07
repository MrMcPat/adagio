import React from 'react'

function MusicPlaylistSong({song, setSpotifyUri, setHide}) {

    function handleClick () {
        setSpotifyUri(song.spotify_uri)
        setHide(false)
    }

  return (
    <div>
        <span onClick={handleClick}>{song.song_name} by {song.artist_name}</span>
        <button>Delete</button>
    </div>
  )
}

export default MusicPlaylistSong