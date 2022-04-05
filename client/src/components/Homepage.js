import React, { useState, useEffect } from 'react'
import axios from "axios"
import MusicPlayer from "./MusicPlayer"

function Homepage() {
    const [dailyLyric, setDailyLyric] = useState([])
 
    useEffect(() => {
    async function handleFetch() {
      const res = await axios.get("/lyrics")
      const currentDate = String(new Date().getMonth()+1).padStart(2, "0") + String(new Date().getDate()).padStart(2, "0")
      const lyric = res.data.find(data => data.date_of_lyric === currentDate)
      setDailyLyric(lyric)
    }
    handleFetch()
  }, [])

  console.log(dailyLyric)

  return (
    <div>
        <p>{dailyLyric.lyric}</p>
        <MusicPlayer />
    </div>
  )
}

export default Homepage