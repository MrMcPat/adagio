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
            Authorization: "Bearer BQBDk5_tsQJsqgq3cJjz5t0mSrX6M-wtHn1lvvg7p_e268Ec3h-LaPIKs1ftkSO7oIyaPBH1stYixNu01KjGPYzylGL7LdU9_i5UKpae94lUexdo5r-wEmCOvAqN0_2nHKhjuCL6YWLk2bi6fFn-01Ki_EYjHXe5ksk0vLtxFZxvtHjxdJ4iKSL0RpWpG4zUzfpvK5LZGZX4xBoUsA",
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
        <MusicPlayer />
    </div>
  )
}

export default DailyLyricPage