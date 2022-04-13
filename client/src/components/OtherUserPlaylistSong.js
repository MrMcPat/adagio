import React from 'react'
import Modal from "react-bootstrap/Modal"

function OtherUserPlaylistSong({song, setSpotifyUri, setHide}) {

    function handleClick(e) {
        setSpotifyUri(song.spotify_uri)
        setHide(false)
    }

  return (
    <>
    <span onClick={handleClick}>{song.song_name} by {song.artist_name}</span>
    <button>Like</button><br />
    </>
  )
}

export default OtherUserPlaylistSong