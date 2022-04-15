import React, { useState, useEffect } from 'react'
import axios from "axios"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import MusicPlayer from "./MusicPlayer"
import DailyLyricResponses from './DailyLyricResponses'

function DailyLyricPage({token}) {
    const [userID, setUserID] = useState("")
    const [dailyLyric, setDailyLyric] = useState([])
    const [userEmotions, setUserEmotions] = useState([])
    const [userResponses, setUserResponses] = useState([])
    const [inputResponse, setInputResponse] = useState("")
    const [inputColor, setInputColor] = useState("")
    const [inputEmotion, setInputEmotion] = useState("")

    useEffect(() => {
    async function handleFetch() {
      const user = await axios.get("/me")
      setUserID(user.data.id)

      const lyrics = await axios.get("/lyrics")
      const dateWithoutYear = String(new Date().getMonth()+1).padStart(2, "0") + String(new Date().getDate()).padStart(2, "0")
      const lyric = lyrics.data.find(data => data.date_of_lyric === dateWithoutYear)
      setDailyLyric(lyric)

      const emotions = await axios.get("/emotions")
      setUserEmotions(emotions.data.filter(emotion => emotion.user_id === user.data.id))

      const responses = await axios.get("/responses")
      setUserResponses(responses.data.filter(response => response.lyric_id === lyric.id))
    }
    handleFetch()
  }, [])

    function handleChange (e) {
      setInputColor(e.target.value)
      setInputEmotion(e.target.id)
    }

    function handleSubmit (e) {
      e.preventDefault()
      if (!inputColor) {
        alert("Please pick a color.")
      } else {
        axios.post("/responses", {
        user_id: userID,
        lyric_id: dailyLyric.id,
        color: inputColor,
        emotion: inputEmotion,
        response: inputResponse
      })
      .then(resp => setUserResponses([...userResponses, resp.data]))
      setInputResponse("")
      }
    }

    function handleLike() {
      axios.post("/fav_songs", {
        emotion_id: userEmotions.filter(emotion => emotion.emotion === userResponses[0].emotion)[0].id,
        song_name: dailyLyric.song_name,
        artist_name: dailyLyric.artist_name,
        spotify_uri: dailyLyric.spotify_uri
      })
    }

    const currentDate = String(new Date().getFullYear()).padStart(2, "0") + "-" + String(new Date().getMonth()+1).padStart(2, "0") + "-" + String(new Date().getDate()).padStart(2, "0")
    const hasUserResponse = userResponses.filter(response => response.user_id === userID && response.created_at.slice(0, 10) ===  currentDate)

  return (
    <Container fluid >
      <Row>
      <Col className="daily-lyric-container">
      <h1>{dailyLyric.lyric}</h1>
        <MusicPlayer spotifyUri={dailyLyric.length === 0 ? "spotify:track:64FzSxCxQ0cBlktqiMQBey" : dailyLyric.spotify_uri} token={token}/>
        <p>{dailyLyric.song_name} by {dailyLyric.artist_name}</p>
        {hasUserResponse.length === 0 ? 
              <form onSubmit={handleSubmit}>
                <input placeholder="Enter your response..." onChange={e => setInputResponse(e.target.value)}></input>
                {userEmotions.length === 0 ? <p>You don't have any colors, please add some.</p> :userEmotions.map(emotion => {
                  return (
                    <div key={emotion.id}>
                      <label  htmlFor={emotion.id} style={{background: `${emotion.color}`}}>{emotion.emotion}</label>
                      <input type="radio" id={emotion.emotion} name="colors" value={emotion.color} onChange={handleChange}/>
                    </div>
                  )
                })}
                <button type="submit">Share</button>
              </form>
        : <><p>You posted for the day.</p><button onClick={handleLike}>Like song</button></>}
      </Col>
        <Col className="daily-lyric-responses">
          {userResponses.map(response => <DailyLyricResponses key={response.id} response={response} userID={userID}/>)}
        </Col>
      </Row>
    </Container>
  )
}

export default DailyLyricPage