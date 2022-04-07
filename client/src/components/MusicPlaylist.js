import React from 'react'
import MusicPlaylistSong from './MusicPlaylistSong'

function MusicPlaylist({playlist, setSpotifyUri, setHide, favedSong}) {

    console.log([...playlist.fav_songs, favedSong])
  return (
    <div>
        <h3>{playlist.color} {playlist.emotion}</h3>
        {playlist.fav_songs.length === 0 ? <p>Go add some songs!</p>
        : [...playlist.fav_songs, favedSong].map(song => <MusicPlaylistSong key={song.id} song={song} setSpotifyUri={setSpotifyUri} setHide={setHide} />)}
    </div>
  )
}

export default MusicPlaylist