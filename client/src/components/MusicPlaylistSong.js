import React from 'react'
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons"
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons"

function MusicPlaylistSong({song, setSpotifyUri, setHide, onDelete, play, setPlay}) {

    function handleClick () {
        setSpotifyUri(song.spotify_uri)
        setHide(false)
        setPlay(song.song_name)
    }

    function handleDelete() {
        onDelete(song.id)
    }

  return (
    <div>
      <OverlayTrigger
      placement="top"
      overlay={<Tooltip style={{fontSize: "10px"}}>
      {song.song_name} by {song.artist_name}
    </Tooltip>}
      >
        <div>
        <span onClick={handleClick} style={{cursor: "pointer"}}>{song.song_name === play ? <FontAwesomeIcon icon={faVolumeHigh} color="#1cb954"/> : null} {`${song.song_name} by ${song.artist_name}`.length > 20 ? `${song.song_name} by ${song.artist_name}`.substring(0, 20) + "..." : `${song.song_name} by ${song.artist_name}`}</span>
        <button onClick={handleDelete} style={{background: "transparent", border: "none"}}><FontAwesomeIcon icon={faHeartBroken} color="#DB7093"/></button>
        </div>
      </OverlayTrigger>
    </div>
  )
}

export default MusicPlaylistSong