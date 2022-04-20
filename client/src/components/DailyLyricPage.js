import React, { useState, useEffect } from 'react'
import axios from "axios"
import MusicPlayer from "./MusicPlayer"
import DailyLyricResponses from './DailyLyricResponses'
import { Link } from "react-router-dom"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { ToastContainer, toast } from 'react-toastify'

function DailyLyricPage({token}) {
    const [userID, setUserID] = useState("")
    const [dailyLyric, setDailyLyric] = useState([])
    const [userEmotions, setUserEmotions] = useState([])
    const [userResponses, setUserResponses] = useState([])
    const [inputResponse, setInputResponse] = useState("")
    const [inputColor, setInputColor] = useState("")
    const [inputEmotion, setInputEmotion] = useState("")
    const [random, setRandom] = useState(Math.floor(Math.random() * 4) + 1)

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

    function handleChange(e) {
      setInputColor(e.target.value)
      setInputEmotion(e.target.id)
    }

    function handleSubmit (e) {
      e.preventDefault()
      if (!inputColor) {
        toast.error("Please pick a color.", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })
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
    console.log(userResponses)
  return (
      <div className={`daily-lyric-page-container random-background-${random}`}>
      <div className="daily-lyric-container">
      <h1 className="daily-lyric">{dailyLyric.lyric}</h1>
      <div className="daily-lyric-delay">
      <MusicPlayer spotifyUri={dailyLyric.length === 0 ? "spotify:track:64FzSxCxQ0cBlktqiMQBey" : dailyLyric.spotify_uri} token={token}/>
        <p style={{fontSize: "20px", letterSpacing: "2px"}}>{dailyLyric.song_name} by {dailyLyric.artist_name}</p>
      </div>
      <div className="daily-lyric-delay-2">
      {hasUserResponse.length === 0 ? 
              <form onSubmit={handleSubmit}>
                <input className="text-box" placeholder="Enter your response..." onChange={e => setInputResponse(e.target.value)}></input>
                {userEmotions.length === 0 ? <p>You don't have any colors, please add some.</p> :
                <div className="color-container">
                {userEmotions.map(emotion => {
                  return (
                    <div key={emotion.id} className="radio-toolbar">
                    <input type="radio" style={{display: "none"}} id={emotion.emotion} name="colors" value={emotion.color} onChange={handleChange}></input>
                    <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip style={{fontSize: "15px"}}>
                    {emotion.emotion}
                    </Tooltip>}
                    >
                      <label  htmlFor={emotion.emotion} style={{background: `${emotion.color}`, borderRadius: "20px", border:`3px solid rgba(26, 25, 25, 0.2)`, cursor: "default"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    </OverlayTrigger>
                    </div>
                  )
                })}
                </div>
                }
                <button className="login-input" type="submit" style={{color: "white", border: "none", width: "250px", height: "60px"}}>Share</button>
              </form>
        : <>
        <span>You posted for the day. Like this song?</span><button onClick={handleLike} style={{background: "transparent", border: "none"}}><FontAwesomeIcon className="icon" icon={faHeart} style={{fontSize: "25px"}} color="#DB7093"/></button>
        <Link to="/musicrecommendations"><button className="response-input" style={{width: "500px"}}>See your music recommendations</button></Link>
        </>}
      </div>
      </div>
        <div className="daily-lyric-responses">
          {userResponses.map(response => <DailyLyricResponses key={response.id} response={response} userID={userID}/>)}
        </div>

        <ToastContainer
        theme="dark"
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      </div>
  )
}

export default DailyLyricPage