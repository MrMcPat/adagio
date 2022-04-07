import React, { useState, useEffect } from "react"
import axios from "axios"

function RecommendedTrack({ track, setSpotifyUri, setHide}) {
    const [spotifySong, setSpotifySong] = useState("")

  useEffect(() => {
    async function handleFetch() {
        const axiosInstance = axios.create({
          headers: {
              Accept: "application/json",
              Authorization: "Bearer BQA4786yli6LwSX869pVSBEBIyhgq2lc6x8yllqGhxuBhUg3myJND0CJpJLRk_VVSurOl-40poIP7iSOG9PmVls_X_eBEUuhIzi6011GWQtKb71rHR6QXoporJhMTZOPHZM-tNCkZRg0JkHMBXEPCtzBB5a1Kvr3fd57zDYWMmjIUSsflh1boMyRmUwwkPrp8O8GBzRA4cH7O-ZowQ",
              "Content-Type": "application/json"
          }
        })
        const spotifySongs = await axios.all([axiosInstance.get(`https://api.spotify.com/v1/search?q=${track.track_name}%20artist%3A${track.artist_name}&type=track&market=us&limit=1`)])
        const spotifyTrack = spotifySongs[0].data.tracks.items[0] ? spotifySongs[0].data.tracks.items[0].uri : "spotify:track:64FzSxCxQ0cBlktqiMQBey"
        setSpotifySong(spotifyTrack)
    }
    handleFetch()
  })


  function handleClick() {
      setSpotifyUri(spotifySong)
      setHide(false)
  }

  return (
    <div onClick={handleClick}>
      <p>
        {track.track_name} by {track.artist_name}
      </p>
    </div>
  )
}

export default RecommendedTrack
