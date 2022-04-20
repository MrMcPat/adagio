import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Modal from "react-bootstrap/Modal"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons"
import { faHeart } from "@fortawesome/free-solid-svg-icons"

function OtherUserPlaylistSong({song, setSpotifyUri, setHide, play, setPlay}) {
  const [userEmotions, setUserEmotions] = useState([])
  const [inputEmotion, setInputEmotion] = useState("")
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    async function handleFetch() {
      const userData = await axios.get("/me")
      const emotionData = await axios.get("/emotions")
      setUserEmotions(emotionData.data.filter(emotion => emotion.user_id === userData.data.id))
    }
    handleFetch()
  }, [])

    function handleClick() {
        setSpotifyUri(song.spotify_uri)
        setHide(false)
        setPlay(song.song_name)
    }

    function handleChange(e) {
      setInputEmotion(e.target.id)
    }

    function handleLike() {
      axios.post("/fav_songs", {
        emotion_id: userEmotions.filter(emotion => emotion.emotion === inputEmotion)[0].id,
        song_name: song.song_name,
        artist_name: song.artist_name,
        spotify_uri: song.spotify_uri
      })
      handleClose()
    }

  return (
    <>
    <span onClick={handleClick} style={{cursor: "pointer"}}>{song.song_name === play ? <FontAwesomeIcon className="icon" icon={faVolumeHigh} color="#1cb954"/> : null} {`${song.song_name} by ${song.artist_name}`.length > 20 ? `${song.song_name} by ${song.artist_name}`.substring(0, 20) + "..." : `${song.song_name} by ${song.artist_name}`}</span>
    <button onClick={handleShow} style={{background: "transparent", border: "none"}}><FontAwesomeIcon className="icon" icon={faHeart} color="#FF6363"/></button>
    <br />

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{background: "rgb(40, 40, 39)"}}>
          <Modal.Title>Choose a color for the liked song!</Modal.Title>
        
        </Modal.Header>
        <Modal.Body className="profile-colors" style={{background: "rgba(55, 54, 54, 0.9)", margin: "0", height: "80px"}}>
          {userEmotions.map(emotion => {
            return (
              <div key={emotion.id} style={{textAlign: "center"}} className="radio-toolbar">
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
        </Modal.Body>
        <Modal.Footer style={{background: "rgb(40, 40, 39)"}}>
          <button onClick={handleLike}>Like</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default OtherUserPlaylistSong