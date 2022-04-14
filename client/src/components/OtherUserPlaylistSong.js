import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Modal from "react-bootstrap/Modal"

function OtherUserPlaylistSong({song, setSpotifyUri, setHide}) {
  const [userEmotions, setUserEmotions] = useState([])
  const [inputColor, setInputColor] = useState("")
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

    function handleClick(e) {
        setSpotifyUri(song.spotify_uri)
        setHide(false)
    }

    function handleChange(e) {
      setInputColor(e.target.value)
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
    <span onClick={handleClick}>{song.song_name} by {song.artist_name}</span>
    <button onClick={handleShow}>Like</button>
    <br />

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Choose a color for the liked song!</Modal.Title>
        
        </Modal.Header>
        <Modal.Body>
          {userEmotions.map(emotion => {
            return (
              <div key={emotion.id} style={{textAlign: "center"}}>
                <label  htmlFor={emotion.id} style={{background: `${emotion.color}`}}>{emotion.emotion}</label>
                <input type="radio" id={emotion.emotion} name="colors" value={emotion.color} onChange={handleChange}/>
              </div>
                  )
                })}
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleLike}>Like</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default OtherUserPlaylistSong