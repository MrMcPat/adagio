import React, { useState, useEffect } from "react"
import axios from "axios"
import RecommendedTrack from "./RecommendedTrack"
import MusicPlaylist from "./MusicPlaylist"
import MusicPlayer from "./MusicPlayer"

function MusicRecommendations() {
  const [userID, setUserID] = useState("")
  const [userEmotions, setUserEmotions] = useState([])
  const [userResponse, setUserResponses] = useState([])
  const [recTracks, setRecTracks] = useState([])
  const [spotifyUri, setSpotifyUri] = useState("")
  const [hide, setHide] = useState(true)

  useEffect(() => {
    async function handleFetch() {
      const user = await axios.get("/me")
      setUserID(user.data.id)

      const emotions = await axios.get("/emotions")
      setUserEmotions(emotions.data.filter(emotion => emotion.user_id === user.data.id))

      const responses = await axios.get("/responses")
      const currentDate = String(new Date().getFullYear()).padStart(2, "0") + "-" + String(new Date().getMonth()+1).padStart(2, "0") + "-" + String(new Date().getDate()).padStart(2, "0")
      const filteredResponse = responses.data.find(response => response.user_id === user.data.id && response.created_at.slice(0, 10) ===  currentDate)
      setUserResponses(filteredResponse)
      
      const musixSongs = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_lyrics=${filteredResponse ? filteredResponse.emotion : ""}&page_size=2&page=${Math.floor(Math.random()*100)+1}&s_track_rating=desc&f_music_genre_id&apikey=5bb8bab45c1e697b6ef3000e9c00bc1b`)
      setRecTracks(musixSongs.data.message.body.track_list)
    }
    handleFetch()
  }, [])

  function handleReload() {
    window.location.reload(false)
  }
    
  return <div className="music-recommendations-container">
    {userResponse ? 
    <>
        <h1>You are feeling {userResponse.color} {userResponse.emotion}</h1> 
        <h3>Here are your music recommendations for today. <button onClick={handleReload}>Add to playlist</button></h3>
        {hide ? <div style={{display: "none"}}><MusicPlayer spotifyUri={spotifyUri}/></div> : <div><MusicPlayer spotifyUri={spotifyUri}/></div>}
        {recTracks.map(track => <RecommendedTrack key={track.track.track_id} track={track.track} setSpotifyUri={setSpotifyUri} setHide={setHide} todaysEmotion={userResponse.emotion} userID={userID}/>)}
    </>
    : <>
        <h1>You did not choose a color today.</h1>
        <h3>Tell me how you feel today, I'll fetch some music for you.</h3>
    </>
    }
    <br/>
    <h3>Your Playlists</h3>
  {userEmotions.map(playlist => <MusicPlaylist key={playlist.id} playlist={playlist} setSpotifyUri={setSpotifyUri} setHide={setHide}/>)}
  </div>
}

export default MusicRecommendations