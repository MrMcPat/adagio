import React from 'react'

function MusicPlaylistSong({song, setSpotifyUri, setHide, onDelete}) {

    function handleClick () {
        setSpotifyUri(song.spotify_uri)
        setHide(false)
    }

    function handleDelete() {
        onDelete(song.id)
    }

  return (
    <div>
        <span onClick={handleClick}>{song.song_name} by {song.artist_name}</span>
        <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default MusicPlaylistSong