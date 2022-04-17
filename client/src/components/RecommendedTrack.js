import React, { useState, useEffect } from "react"
import axios from "axios"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons"
import { faHeart } from "@fortawesome/free-solid-svg-icons"

function RecommendedTrack({ track, setSpotifyUri, setHide, todaysEmotion, userID, setFavedSong, token, play, setPlay}) {
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
      setPlay(track.track_name)
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
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip style={{fontSize: "10px"}}>
      {track.track_name} by {track.artist_name}
    </Tooltip>}
      >
      <div>
      <span onClick={handleClick} style={{cursor: "pointer"}}>
        {track.track_name === play ? <FontAwesomeIcon icon={faVolumeHigh} color="#1cb954"/> : null} {`${track.track_name} by ${track.artist_name}`.length > 60 ? `${track.track_name} by ${track.artist_name}`.substring(0, 60) + "..." : `${track.track_name} by ${track.artist_name}`}
      </span>
      <button onClick={handleFavSong} style={{background: "transparent", border: "none"}}><FontAwesomeIcon icon={faHeart} color="#DB7093"/></button>
      </div>
      </OverlayTrigger>

    </div>
  )
}

export default RecommendedTrack
