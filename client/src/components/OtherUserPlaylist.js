import React, { useState, useEffect } from "react"
import axios from "axios"
import OtherUserPlaylistSong from "./OtherUserPlaylistSong"

function OtherUserPlaylist({emotion, setSpotifyUri, setHide}) {
    const [userFavSongs, setUserFavSongs] = useState([])

    useEffect(() => {
        async function handleFetch() {
            const favSongData = await axios.get("/fav_songs")
            setUserFavSongs(favSongData.data.filter(song => song.emotion_id === emotion.id))
        }
        handleFetch()
    }, [])

  return (
    <div>
        <h3><span style={{background: `${emotion.color}`}}>&nbsp;&nbsp;&nbsp;&nbsp;</span>{emotion.emotion}</h3>
        {userFavSongs.length === 0 ? <p>No songs :(</p> : userFavSongs.map(song => <OtherUserPlaylistSong key={song.id} song={song} setSpotifyUri={setSpotifyUri} setHide={setHide}/>)}
    </div>
  )
}

export default OtherUserPlaylist