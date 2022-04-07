import React from 'react'
import MusicPlaylistSong from './MusicPlaylistSong'

function MusicPlaylist({playlist, setSpotifyUri, setHide}) {

  return (
    <div>
        <h3>{playlist.color} {playlist.emotion}</h3>
        {playlist.fav_songs.length === 0 ? <p>Go add some songs!</p>
        : playlist.fav_songs.map(song => <MusicPlaylistSong key={song.id} song={song} setSpotifyUri={setSpotifyUri} setHide={setHide} />)}
    </div>
  )
}

export default MusicPlaylist