import React, { useState, useEffect } from "react"
import axios from "axios"

function SignUp({setUser}) {
  const [userID, setUserID] = useState(null)
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [description, setDescription] = useState("")
  const [userColor, setUserColor] = useState("#FFC0CB")
  const [userEmotion, setUserEmotion] = useState("")
  const [userColorList, setUserColorList] = useState("")
  const [userTriggerList, setUserTriggerList] = useState([])
  const [userTrigger, setUserTrigger] = useState("")
  const [next, setNext] = useState(0)

  useEffect(() => {
    async function handleFetch() {
      const userData = await axios.get("/me")
      setUserID(userData.data.id)
      const emotionData = await axios.get("/emotions")
      setUserColorList(emotionData.data.filter(emotion => emotion.user_id === userData.data.id))
      const userTriggerData = await axios.get("/triggers")
      setUserTriggerList(userTriggerData.data.filter(trigger => trigger.user_id === userData.data.id))
    }
    handleFetch()
  }, [next])

  function handleSubmit(e) {
    e.preventDefault()
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
        password_confirmation: passwordConfirmation,
        journal_is_private: false,
        favorite_songs_is_private: false
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
        setNext(next + 1)
      }
    })
  }

  function handleSubmitBio(e) {
    e.preventDefault()
    if (firstName.length === 0 || lastName.length === 0) {
      alert("Please enter your name.")
    } else {
      axios.patch(`users/${userID}`, {
        first_name: firstName,
        last_name: lastName,
        description: description
      })
      setNext(next + 1)
    }
  }

  function handleEmotionSubmit(e) {
    e.preventDefault()
    if (userEmotion.length === 0) {
      alert("Please include an emotion.")
    } else {
      console.log(userColor)
      axios.post("/emotions", {
        user_id: userID,
        color: userColor,
        emotion: userEmotion
      })
      .then(resp => setUserColorList([...userColorList, resp.data]))
      setUserEmotion("")
    }
  }

  function handleEmotionDelete(e) {
    axios.delete(`/emotions/${e.target.value}`)
    setUserColorList(userColorList.filter(emotion => emotion.id !== parseInt(e.target.value)))
  }

  function handleTriggerSubmit(e) {
    e.preventDefault()
    if (userTrigger.length === 0) {
      alert("Please include a trigger")
    } else {
      axios.post("/triggers", {
        user_id: userID,
        trigger: userTrigger
      })
      .then(resp => setUserTriggerList([...userTriggerList, resp.data]))
      setUserTrigger("")
    }
  }

  function handleTriggerDelete(e) {
    axios.delete(`/triggers/${e.target.value}`)
    setUserTriggerList(userTriggerList.filter(trigger => trigger.id !== parseInt(e.target.value)))
  }

  function handleNext() {
    setNext(next + 1)
  }

  function handleSkip() {
      window.location = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=token&scope=streaming user-read-email user-modify-playback-state user-read-private user-read-private user-read-playback-state&show_dialog=true&redirect_uri=http://localhost:4000/callback`
  }

  return <div style={{textAlign: "center"}}>
      {next === 0 ? <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" autoComplete="off" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password"/>
        <label htmlFor="password">Password Confirmation</label>
        <input type="password" id="password_confirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} autoComplete="current-password"/>
        <button type="submit">Sign Up</button>
      </form> : null}
      {next === 1 ? <form onSubmit={handleSubmitBio}>
        <h1>Tell us a little about yourself.</h1>
        <label htmlFor="firstname">First Name</label>
        <input type="text" id="firstname" autoComplete="off" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        <label htmlFor="lastname">Last Name</label>
        <input type="text" id="lastname" autoComplete="off" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        <label htmlFor="description">A small bio of yourself</label>
        <textarea rows="10" cols="100" style={{resize: "none"}} value={description} onChange={e => setDescription(e.target.value)}></textarea><br />
        <button type="submit">Next</button>
      </form>: null}
      {next === 2 ? 
      <>
        <h1>Choose your emotions...</h1>
        {userColorList.map(emotion => {
            return <div key={emotion.id}>
              <span style={{background: `${emotion.color}`}}>&nbsp;&nbsp;&nbsp;&nbsp;</span>{emotion.emotion}
              <button value={emotion.id} onClick={handleEmotionDelete}>Delete</button>
              </div>
          })}
          <form onSubmit={handleEmotionSubmit}>
          <input value={userEmotion} onChange={e => setUserEmotion(e.target.value)}></input>
          <input type="color" value={userColor} onChange={e => setUserColor(e.target.value)}></input>
          <button type="submit">Add a color</button>
          </form>
          <button onClick={handleNext}>Next</button>
        </>: null}
      {next === 3 ?
      <>
      <h3>You're almost set! One last thing...do you have any trigger words?(You don't have to list them if you don't want to)</h3>
    {userTriggerList.map(trigger => {
      return <div key={trigger.id}>
        <span>{trigger.trigger}</span>
        <button value={trigger.id} onClick={handleTriggerDelete}>Delete</button>
        </div>
    })}
    <form onSubmit={handleTriggerSubmit}>
      <input value={userTrigger} onChange={e => setUserTrigger(e.target.value)}></input>
      <button type="submit">Add a trigger</button>
    </form>
      </>: null}
      {next === 3 ? <button onClick={handleSkip}>Done</button> : null}
  {next === 0 || next === 3 ? null : <button onClick={handleSkip}>Skip</button>
}  </div>
}

export default SignUp
