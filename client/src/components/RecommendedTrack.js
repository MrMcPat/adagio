import React, { useState, useEffect } from "react"
import axios from "axios"

function RecommendedTrack({ track, setSpotifyUri, setHide, todaysEmotion, userID}) {
    const [userTodayEmotion, setUserTodayEmotion] = useState([])
    const [spotifySong, setSpotifySong] = useState("")
    const [favedSong, setFavedSong] = useState([])

  useEffect(() => {
    async function handleFetch() {

        const emotions = await axios.get("/emotions")
        setUserTodayEmotion(emotions.data.filter(emotion => emotion.user_id === userID && emotion.emotion === todaysEmotion))

        const axiosInstance = axios.create({
          headers: {
              Accept: "application/json",
              Authorization: "Bearer BQCm5k2SagJbufxT2AJ9ugcLjgaSbqu9RY5towfdm5eG1iOEs9kEzHN9VPQz5DZSEeZ9NsxxcevRcNePZn-EzMIR5bv_3TmzgUMVwwAsTFICDA5N9VJKHf0wUJiDLWMI5VdifnuyRN6W3aebXCa5VyrzjdZPnJK0enFuAbXA8FJea0FbjjcsYyae4Xl7SdrQ6-GJhApLuO0yZRWoFg",
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
    console.log(spotifySong)
    if (spotifySong === "spotify:track:64FzSxCxQ0cBlktqiMQBey") {
      alert("Cannot add to playlist :( Song not found in spotify.")
    } else {
      axios.post("/fav_songs", {
        emotion_id: userTodayEmotion[0].id,
        song_name: track.track_name,
        artist_name: track.artist_name,
        spotify_uri: spotifySong
      })
      // .then(resp => setFavedSong([...favedSong, resp.data]))
    }

  }
  // console.log(favedSong)

  return (
    <div >
      <span onClick={handleClick}>
        {track.track_name} by {track.artist_name} 
      </span>
      <button onClick={handleFavSong}>Like</button>
    </div>
  )
}

export default RecommendedTrack
