import React, { useState, useEffect } from "react"
import axios from "axios"
import RecommendedTrack from "./RecommendedTrack"
import MusicPlaylist from "./MusicPlaylist"
import MusicPlayer from "./MusicPlayer"

function MusicRecommendations({token}) {
  const [userID, setUserID] = useState("")
  const [userEmotions, setUserEmotions] = useState([])
  const [userResponse, setUserResponses] = useState([])
  const [recTracks, setRecTracks] = useState([])
  const [spotifyUri, setSpotifyUri] = useState("spotify:track:64FzSxCxQ0cBlktqiMQBey")
  const [hide, setHide] = useState(true)
  const [favedSong, setFavedSong] = useState([])

  useEffect(() => {
    async function handleFetch() {
      const user = await axios.get("/me")
      setUserID(user.data.id)

      const emotions = await axios.get("/emotions")
      setUserEmotions(
        emotions.data.filter((emotion) => emotion.user_id === user.data.id)
      )

      const responses = await axios.get("/responses")
      const currentDate =
        String(new Date().getFullYear()).padStart(2, "0") +
        "-" +
        String(new Date().getMonth() + 1).padStart(2, "0") +
        "-" +
        String(new Date().getDate()).padStart(2, "0")
      const filteredResponse = responses.data.find(
        (response) =>
          response.user_id === user.data.id &&
          response.created_at.slice(0, 10) === currentDate
      )
      setUserResponses(filteredResponse)

      const musixSongs = await axios.get(`/musixmatch?emotion=${filteredResponse ? filteredResponse.emotion : ""}&page=${Math.floor(Math.random()*100)+1}&apikey=${process.env.REACT_APP_MUSIXMATCH_API_KEY}`)
      setRecTracks(musixSongs.data.message.body.track_list)
    }
    handleFetch()
  }, [])

  return (
    <div style={{textAlign: "center"}}>
      {userResponse ? (
        <div>
          <h1>
            <span style={{background: userResponse.color}}>&nbsp;&nbsp;&nbsp;&nbsp;</span>You are feeling {userResponse.emotion}
          </h1>
          <h3>Here are your music recommendations for today.</h3>
          {hide ? (
            <div style={{ display: "none" }} className="musicplayer">
              <MusicPlayer spotifyUri={spotifyUri} token={token}/>
            </div>
          ) : (
            <div className="musicplayer">
              <MusicPlayer spotifyUri={spotifyUri} token={token}/>
            </div>
          )}
          <div className="recommended-track-container">
          {recTracks.map((track) => (
            <RecommendedTrack
              key={track.track.track_id}
              track={track.track}
              setSpotifyUri={setSpotifyUri}
              setHide={setHide}
              todaysEmotion={userResponse.emotion}
              userID={userID}
              setFavedSong={setFavedSong}
              token={token}
            />
          ))}
          </div>
        </div>
      ) : (
        <div>
          <h1>You did not choose a color today.</h1>
          <h3>Tell me how you feel today, I'll fetch some music for you.</h3>
        </div>
      )}
      <br />
      <h2>Your Playlists</h2>
      <div className="playlists-container">
      {userEmotions.map((playlist) => (
        <MusicPlaylist
          key={playlist.id}
          playlist={playlist}
          setSpotifyUri={setSpotifyUri}
          setHide={setHide}
          favedSong={favedSong}
        />
      ))}
      </div>
    </div>
  );
}

export default MusicRecommendations
