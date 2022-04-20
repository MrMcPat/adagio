import React, { useState, useEffect } from "react"
import axios from "axios"
import OtherUserPlaylistSong from "./OtherUserPlaylistSong"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"

function OtherUserPlaylist({emotion, setSpotifyUri, setHide, play, setPlay}) {
    const [userFavSongs, setUserFavSongs] = useState([])

    useEffect(() => {
        async function handleFetch() {
            const favSongData = await axios.get("/fav_songs")
            setUserFavSongs(favSongData.data.filter(song => song.emotion_id === emotion.id))
        }
        handleFetch()
    }, [])

  return (
    <div className="other-playlist">
        <OverlayTrigger
        placement="top"
        overlay={<Tooltip style={{fontSize: "15px"}}>
        {emotion.emotion}
        </Tooltip>}
        >
          <h3><span style={{background: `${emotion.color}`, borderRadius: "20px", border:"3px solid rgba(26, 25, 25, 0.2)", cursor: "default"}}>&nbsp;&nbsp;&nbsp;&nbsp;</span></h3>
        </OverlayTrigger>
        {userFavSongs.length === 0 ? <p>No songs :(</p> : userFavSongs.map(song => <OtherUserPlaylistSong key={song.id} song={song} setSpotifyUri={setSpotifyUri} setHide={setHide} play={play} setPlay={setPlay}/>)}
    </div>
  )
}

export default OtherUserPlaylist