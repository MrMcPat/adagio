import React, { useState, useEffect } from 'react'
import axios from "axios"
import MusicPlayer from "./MusicPlayer"

function DailyLyricPage() {
    const [dailyLyric, setDailyLyric] = useState([])
    const [myEmotions, setMyEmotions] = useState([])

    useEffect(() => {
    async function handleFetch() {

      const user = await axios.get("/me")
      const lyrics = await axios.get("/lyrics")
      const currentDate = String(new Date().getMonth()+1).padStart(2, "0") + String(new Date().getDate()).padStart(2, "0")
      const lyric = lyrics.data.find(data => data.date_of_lyric === currentDate)
      setDailyLyric(lyric)

      const emotions = await axios.get("/emotions")
      const userEmotions = emotions.data.filter(emotion => emotion.user_id === user.data.id)
      setMyEmotions(userEmotions)

      // const axiosInstance = axios.create({
      //   headers: {
      //       Accept: "application/json",
      //       Authorization: "Bearer BQBdAf1sOizYLAhz0jjI5UI4p1PD8OfTkHDv7hgjMVFu7ZINIUJih7ljlP72V-pQuRRfGfRN2B1939P61uwMd3Oea69jDP8aqK1ciRtr7PoWnSMowf16ZmIwPosuL9dBnLZGecSj2E3ww2MfcekSi3hfeLbEvA4vaZ2HRENlUNyIMvqZaIFdkDLiClEbzyAYoH2V07KuMz9qJiIgug",
      //       "Content-Type": "application/json"
      //   }
      // })

      // const songURI = await axios.all([axiosInstance.get("https://api.spotify.com/v1/search?q=justin%20bieber&type=track&market=us&limit=5")])
      // console.log(songURI[0].data.tracks.items)
    }
    handleFetch()
  }, [])

  console.log(myEmotions)

    function handleSubmit (e) {
      e.preventDefault()
      
    }    

  return (
    <div>
        <h1>{dailyLyric.lyric}</h1>
        <MusicPlayer spotifyUri={dailyLyric.spotify_uri} />
        <p>{dailyLyric.song_name} by {dailyLyric.artist_name}</p>
        <form onSubmit={handleSubmit}>
          <input placeholder="Enter your response..."></input>
          {myEmotions.map(emotion => {
            return <button key={emotion.id} style={{background: `#${emotion.color}`}} value={`#${emotion.color}`} onClick={e => console.log(e.target.value)}>{emotion.emotion}</button>
          })}
          <button type="submit">Share</button>
        </form>
    </div>
  )
}

export default DailyLyricPage