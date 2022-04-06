import React, { useState, useEffect } from 'react'
import axios from "axios"
import MusicPlayer from "./MusicPlayer"

function DailyLyricPage() {
    const [dailyLyric, setDailyLyric] = useState([])
 
    useEffect(() => {
    async function handleFetch() {
      const res = await axios.get("/lyrics")
      const currentDate = String(new Date().getMonth()+1).padStart(2, "0") + String(new Date().getDate()).padStart(2, "0")
      const lyric = res.data.find(data => data.date_of_lyric === currentDate)
      setDailyLyric(lyric)

      const axiosInstance = axios.create({
        headers: {
            Accept: "application/json",
            Authorization: "Bearer BQBtURrP1ea-LNOtBvvcoDZTfU4-AFxmqg9EiovKNxEKrsspIsGbbjcZfDuJE7_u691q9dW4XgNDWpNM5gnjJ6ML_dYBYmlrRCuDT4bw05W9c1xscfaIiZFuFmbKfhSI5bVdbP1rxtWQqN90rUcWWgoA_ESPfZfK9JZxpGvXS1wnvOm7R3hLUh3cmA0k-NS1OTj0tJp7k6d7c3uaIQ",
            "Content-Type": "application/json"
        }
      })

      const songURI = await axios.all([axiosInstance.get("https://api.spotify.com/v1/search?q=justin%20bieber&type=track&market=us&limit=5")])
      console.log(songURI[0].data.tracks.items)
    }
    handleFetch()
  }, [])

  console.log(dailyLyric.lyric)

  return (
    <div>
        <p>{dailyLyric.lyric}</p>
        <MusicPlayer spotifyUri={dailyLyric.spotify_uri} />
    </div>
  )
}

export default DailyLyricPage