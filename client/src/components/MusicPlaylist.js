import React, {useState, useEffect} from 'react'
import axios from 'axios'
import MusicPlaylistSong from './MusicPlaylistSong'

function MusicPlaylist({playlist, setSpotifyUri, setHide, favedSong}) {
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
    <div>
        <h3><span style={{background: `${playlist.color}`}}>&nbsp;&nbsp;&nbsp;&nbsp;</span> {playlist.emotion}</h3>
        <button onClick={handleToggle}>Search</button>
        {toggle ? <input placeholder="Filter your journal entries." onChange={handleSearch}/> : null}
        {favSongList.length === 0 ? <p>No songs :(</p>
        : favSongList.map(song => <MusicPlaylistSong key={song.id} song={song} setSpotifyUri={setSpotifyUri} setHide={setHide} onDelete={handleDelete}/>)}
    </div>
  )
}

export default MusicPlaylist