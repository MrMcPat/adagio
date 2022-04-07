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
              Authorization: "Bearer BQDiLZjawXyGRVO9dwSU_Kn8ky9TbZCPrrx6Zn7E0ETxzLzi_lKfYRXq4Pxu7OA_CQH87Olver3mkosGNZq3WIBsCRanpWkndgdmS0ya6hEI_fMZF0vAbSLgPX6A75lYDVwIuxaWN0RWtF5rkLSOjZMO6fcgV7GA1thincnQW8WONkwVyllJ8L-7rMf5PdKLNTcRim43YwDWkYIFvg",
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
    axios.post("/fav_songs", {
      emotion_id: userTodayEmotion[0].id,
      song_name: track.track_name,
      artist_name: track.artist_name,
      spotify_uri: spotifySong
    })
    // .then(resp => setFavedSong([...favedSong, resp.data]))
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
