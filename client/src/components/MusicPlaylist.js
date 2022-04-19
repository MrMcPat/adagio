import React, {useState, useEffect} from 'react'
import axios from 'axios'
import MusicPlaylistSong from './MusicPlaylistSong'
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

function MusicPlaylist({playlist, setSpotifyUri, setHide, favedSong, play, setPlay}) {
    const [favSongList, setFavSongList] = useState([])
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        async function handleFetch() {
            const userFavSongs = await axios.get("/fav_songs")
            setFavSongList(userFavSongs.data.filter(favSong => favSong.emotion_id === playlist.id))
        }
        handleFetch()
    }, [favedSong])

    function handleDelete(id) {
        axios.delete(`/fav_songs/${id}`)
        setFavSongList(favSongList.filter(song => song.id !== id))
    }

    function handleToggle() {
        setToggle(toggle => !toggle)
      }

      async function handleSearch(e) {
        if (e.target.value.length > 0) {
            setFavSongList(favSongList.filter(favSong => favSong.song_name.toLowerCase().includes(e.target.value.toLowerCase())))
        } else {
            const userFavSongs = await axios.get("/fav_songs")
            setFavSongList(userFavSongs.data.filter(favSong => favSong.emotion_id === playlist.id))
        }
      }

  return (
    <div className="playlist">
        <h3 style={{textAlign: "center"}}>
        <OverlayTrigger
        placement="top"
        overlay={<Tooltip style={{fontSize: "15px"}}>
        {playlist.emotion}
        </Tooltip>}
        >
            <span style={{background: `${playlist.color}`, borderRadius: "20px", border:"3px solid rgba(26, 25, 25, 0.2)", cursor: "default"}}>&nbsp;&nbsp;&nbsp;&nbsp;</span> 
            </OverlayTrigger>
            </h3>
        <button onClick={handleToggle} style={{background: "transparent", border: "none"}}><FontAwesomeIcon icon={faMagnifyingGlass} color="white"/></button>
        {toggle ? <input placeholder="Search playlist" onChange={handleSearch} style={{fontSize: "15px"}} className="text-box"/> : null}
        {favSongList.length === 0 ?<p>No songs :(</p>
        : favSongList.map(song => <MusicPlaylistSong key={song.id} song={song} setSpotifyUri={setSpotifyUri} setHide={setHide} onDelete={handleDelete} play={play} setPlay={setPlay}/>)}
    </div>
  )
}

export default MusicPlaylist