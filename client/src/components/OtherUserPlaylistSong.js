import React from 'react'

function OtherUserPlaylistSong({song, setSpotifyUri, setHide}) {

    function handleClick(e) {
        setSpotifyUri(song.spotify_uri)
        setHide(false)
    }

  return (
    <>
    <p onClick={handleClick}>{song.song_name} by {song.artist_name}</p>
    </>
  )
}

export default OtherUserPlaylistSong