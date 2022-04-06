import React, { useState, useEffect } from 'react'
import axios from "axios"
import MusicPlayer from "./MusicPlayer"
import DailyLyricResponses from './DailyLyricResponses'

function DailyLyricPage() {
    const [userID, setUserID] = useState("")
    const [dailyLyric, setDailyLyric] = useState([])
    const [myEmotions, setMyEmotions] = useState([])
    const [inputResponse, setInputResponse] = useState("")
    const [inputColor, setInputColor] = useState("")
    const [userResponses, setUserResponses] = useState([])

    useEffect(() => {
    async function handleFetch() {

      const user = await axios.get("/me")
      setUserID(user.data.id)
      const lyrics = await axios.get("/lyrics")
      const currentDate = String(new Date().getMonth()+1).padStart(2, "0") + String(new Date().getDate()).padStart(2, "0")
      const lyric = lyrics.data.find(data => data.date_of_lyric === currentDate)
      setDailyLyric(lyric)

      const emotions = await axios.get("/emotions")
      const userEmotions = emotions.data.filter(emotion => emotion.user_id === user.data.id)
      setMyEmotions(userEmotions)

      const responses = await axios.get("/responses")
      setUserResponses(responses.data)

      // const axiosInstance = axios.create({
      //   headers: {
      //       Accept: "application/json",
      //       Authorization: "Bearer BQDWY_e3I2sVjJ1ptsJbAmUmxEIORFbsWmOTCPltAK-eh9YvoycfiuIFgpPKttp8CnTAHJA_x2PDv9nlqL28k-ewpuhTGnHaNC8kM5c1ZWkAuIm5e5ZQDMz_7fX6DIfBRMA1jV2Gl9x22xKwYv6ZzI9wBc7VqVlj2PGeWHaPMMukFPCJWCD8d85BoFBTPRkjVbPR_QhqLkeUBFl96Q",
      //       "Content-Type": "application/json"
      //   }
      // })

      // const songURI = await axios.all([axiosInstance.get("https://api.spotify.com/v1/search?q=justin%20bieber&type=track&market=us&limit=5")])
      // console.log(songURI[0].data.tracks.items)
    }
    handleFetch()
  }, [])

    function handleSubmit (e) {
      e.preventDefault()
      axios.post("/responses", {
        user_id: userID,
        lyric_id: dailyLyric.id,
        color: inputColor,
        response: inputResponse
    })
    .then(resp => setUserResponses([...userResponses, resp.data]))
    setInputResponse("")
    }

    // console.log(new Date())
    // console.log(userResponses)

  return (
    <div>
        <h1>{dailyLyric.lyric}</h1>
        <MusicPlayer spotifyUri={dailyLyric.spotify_uri} />
        <p>{dailyLyric.song_name} by {dailyLyric.artist_name}</p>
        <form onSubmit={handleSubmit}>
          <input placeholder="Enter your response..." onChange={e => setInputResponse(e.target.value)}></input>
          {myEmotions.map(emotion => {
            return (
              <div key={emotion.id}>
                <label  htmlFor={emotion.id} style={{background: `${emotion.color}`}}>{emotion.emotion}</label>
                <input type="radio" id={emotion.id} name="colors" value={emotion.color} onChange={e => setInputColor(e.target.value)}/>
              </div>
            )
          })}
          <button type="submit">Share</button>
        </form>
        <div>
          {userResponses.map(response => <DailyLyricResponses key={response.id} response={response}/>)}
        </div>
    </div>
  )
}

export default DailyLyricPage