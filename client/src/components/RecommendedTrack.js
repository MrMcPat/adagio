import React, { useState, useEffect } from "react"
import axios from "axios"

function RecommendedTrack({ track, setSpotifyUri, setHide, todaysEmotion, userID, setFavedSong, token}) {
    const [userTodayEmotion, setUserTodayEmotion] = useState([])
    const [spotifySong, setSpotifySong] = useState("")

  useEffect(() => {
    async function handleFetch() {

        const emotions = await axios.get("/emotions")
        setUserTodayEmotion(emotions.data.filter(emotion => emotion.user_id === userID && emotion.emotion === todaysEmotion))

        const axiosInstance = axios.create({
          headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
          }
        })
        const spotifySongs = await axios.all([axiosInstance.get(`https://api.spotify.com/v1/search?q=${track.track_name}%20artist%3A${track.artist_name}&type=track&market=us&limit=1`)])
        const spotifyTrack = spotifySongs[0].data.tracks.items[0] ? spotifySongs[0].data.tracks.items[0].uri : "spotify:track:64FzSxCxQ0cBlktqiMQBey"
        setSpotifySong(spotifyTrack)
    }
    handleFetch()
  }, [])
 
  if (!userTodayEmotion[0]) return null

  function handleClick() {
      setSpotifyUri(spotifySong)
      setHide(false)
  }

  function handleFavSong () {
    if (spotifySong === "spotify:track:64FzSxCxQ0cBlktqiMQBey") {
      alert("Cannot add to playlist :( Song not found in spotify.")
    } else {
      axios.post("/fav_songs", {
        emotion_id: userTodayEmotion[0].id,
        song_name: track.track_name,
        artist_name: track.artist_name,
        spotify_uri: spotifySong
      })
      .then(resp => setFavedSong(resp.data))
    }
  }

  return (
    <div className="recommended-track">
      <span onClick={handleClick}>
        {track.track_name} by {track.artist_name} 
      </span>
      <button onClick={handleFavSong}>Like</button>
    </div>
  )
}

export default RecommendedTrack
