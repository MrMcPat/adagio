import React, {useState, useEffect} from 'react'
import axios from 'axios'
import MusicPlaylistSong from './MusicPlaylistSong'

function MusicPlaylist({playlist, setSpotifyUri, setHide}) {
    const [favSongList, setFavSongList] = useState(playlist.fav_songs)

    function handleDelete(id) {
        axios.delete(`/fav_songs/${id}`)
        setFavSongList(favSongList.filter(song => song.id !== id))
    }

  return (
    <div>
        <h3>{playlist.color} {playlist.emotion}</h3>
        {playlist.fav_songs.length === 0 ? <p>Go add some songs!</p>
        : favSongList.map(song => <MusicPlaylistSong key={song.id} song={song} setSpotifyUri={setSpotifyUri} setHide={setHide} onDelete={handleDelete}/>)}
    </div>
  )
}

export default MusicPlaylist