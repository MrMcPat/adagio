import React, { useState, useEffect } from "react"
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons"
import { ToastContainer, toast } from 'react-toastify'


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
      } else {
        r.json().then(
          (err) => 
          toast.error(err.errors[0], {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          }))
      }
    })
  }

  function handleSubmitBio(e) {
    e.preventDefault()
    if (firstName.length === 0 || lastName.length === 0) {
      toast.error("Please enter your name.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
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
    if (userEmotion.length === 0 && userColorList.length === 0) {
      toast.error("Please include an emotion.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
    } else {
      axios.post("/emotions", {
        user_id: userID,
        color: userColor,
        emotion: userEmotion
      })
      .then(resp => setUserColorList([...userColorList, resp.data]))
      .catch(err => 
        toast.error(err.response.data.errors[0], {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          }))
      setUserEmotion("")
    }
  }

  function handleEmotionDelete(e) {
    axios.delete(`/emotions/${e.currentTarget.value}`)
    setUserColorList(userColorList.filter(emotion => emotion.id !== parseInt(e.currentTarget.value)))
  }

  function handleTriggerSubmit(e) {
    e.preventDefault()
    if (userTrigger.length === 0) {
      toast.error("Please include a trigger word.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
    } else {
      axios.post("/triggers", {
        user_id: userID,
        trigger: userTrigger
      })
      .then(resp => setUserTriggerList([...userTriggerList, resp.data]))
      .catch(err =>
        toast.error(err.response.data.errors[0], {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          }))
      setUserTrigger("")
    }
  }

  function handleTriggerDelete(e) {
    axios.delete(`/triggers/${e.currentTarget.value}`)
    setUserTriggerList(userTriggerList.filter(trigger => trigger.id !== parseInt(e.currentTarget.value)))
  }

  function handleNext() {
    setNext(next + 1)
  }

  function handleSkip() {
      window.location = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=token&scope=streaming user-read-email user-modify-playback-state user-read-private user-read-private user-read-playback-state&show_dialog=true&redirect_uri=https://adagio-app.herokuapp.com/`
  }

  return <div style={{textAlign: "center"}} className="signup-container">
      {next === 0 ? <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className="signup-input">
        <label htmlFor="email" style={{fontSize: "15px", letterSpacing: "4px"}}>email</label><br />
        <input type="text" className="text-box" id="email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="signup-input">
        <label htmlFor="username" style={{fontSize: "15px", letterSpacing: "4px"}}>username</label><br />
        <input type="text" className="text-box" id="username" autoComplete="off" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="signup-input">
        <label htmlFor="password" style={{fontSize: "15px", letterSpacing: "4px"}}>password</label><br />
        <input type="password" className="text-box" id="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password"/>
        </div>
        <div className="signup-input" style={{fontSize: "15px", letterSpacing: "4px"}}>
        <label htmlFor="password">confirm password</label><br />
        <input type="password" className="text-box" id="password_confirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} autoComplete="current-password"/>
        </div>
        <button type="submit" className="signup-input" style={{height: "50px", border: "none", color: "white",fontSize: "20px", letterSpacing: "4px"}}>sign up</button>
      </form> : null}
      {next === 1 ? 
      <>
        <form onSubmit={handleSubmitBio}>
        <h1>Tell us about yourself</h1>
        <div className="signup-input">
        <label htmlFor="firstname" style={{fontSize: "15px", letterSpacing: "4px"}}>first name</label><br />
        <input type="text" className="text-box" id="firstname" autoComplete="off" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        </div>
        <div className="signup-input">
        <label htmlFor="lastname" style={{fontSize: "15px", letterSpacing: "4px"}}>last name</label><br />
        <input type="text" className="text-box" id="lastname" autoComplete="off" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        </div>
        <div className="signup-input" style={{height: "200px"}}>
        <label htmlFor="description" style={{fontSize: "15px", letterSpacing: "4px"}}>a small bio of yourself</label>
        <textarea rows="5" cols="50" style={{resize: "none", opacity: "60%"}} value={description} onChange={e => setDescription(e.target.value)}></textarea><br />
        </div>
        <button className="signup-input" style={{height: "50px", width:"200px", border: "none", color: "white",fontSize: "20px", letterSpacing: "4px"}} onClick={handleSkip}>Skip</button>
        <button className="signup-input" style={{height: "50px", width:"200px", border: "none", color: "white",fontSize: "20px", letterSpacing: "4px"}} type="submit">Next</button>
      </form>
      </>
      : null}
      {next === 2 ? 
      <div>
        <h1>Choose your emotions...</h1><br />
        <div>
        {userColorList.map(emotion => {
            return <div key={emotion.id}>
              <span style={{background: `${emotion.color}`, borderRadius: "20px", border:"3px solid rgba(26, 25, 25, 0.2)", cursor: "default"}}>&nbsp;&nbsp;&nbsp;&nbsp;</span><span style={{textShadow: "2px 2px grey", fontSize: "20px"}}>{emotion.emotion}</span>
              <button value={emotion.id} style={{background: "transparent", border: "none"}} onClick={handleEmotionDelete}><FontAwesomeIcon icon={faXmarkCircle} color="#B20600"/></button>
              </div>
          })}
        </div>
          <form onSubmit={handleEmotionSubmit}>
          <input className="text-box" value={userEmotion} onChange={e => setUserEmotion(e.target.value)}></input>
          <input type="color" className="color-picker" value={userColor} onChange={e => setUserColor(e.target.value)}></input><br />
          <button type="submit" className="signup-input" style={{height: "40px", width:"200px", border: "none", color: "white",fontSize: "15px", letterSpacing: "4px"}}>Add a color</button><br />
          <button onClick={handleSkip} className="signup-input" style={{height: "50px", width:"150px", border: "none", color: "white",fontSize: "20px", letterSpacing: "4px"}}>Skip</button>
          <button onClick={handleNext} className="signup-input" style={{height: "50px", width:"150px", border: "none", color: "white",fontSize: "20px", letterSpacing: "4px"}}>Next</button>
          </form>
        </div>: null}
      {next === 3 ?
      <div>
      <h2 style={{width: "1000px"}}>You're almost set! One last thing...do you have any trigger words?<br />We won't let you see them in the website.</h2>
      <h5>You don't have to list them if you don't want to.</h5>
      <div>
      {userTriggerList.map(trigger => {
      return <div key={trigger.id}>
        <span style={{textShadow: "2px 2px grey", fontSize: "20px"}}>{trigger.trigger}</span>
        <button value={trigger.id} style={{background: "transparent", border: "none"}} onClick={handleTriggerDelete}><FontAwesomeIcon icon={faXmarkCircle} color="#B20600"/></button>
        </div>
    })}
      </div>
    <form onSubmit={handleTriggerSubmit}>
      <input className="text-box" value={userTrigger} onChange={e => setUserTrigger(e.target.value)}></input>
      <button type="submit" className="signup-input" style={{height: "40px", width:"200px", border: "none", color: "white",fontSize: "15px", letterSpacing: "4px"}}>Add a trigger</button><br />
      <button onClick={handleSkip} className="signup-input" style={{height: "50px", width:"150px", border: "none", color: "white",fontSize: "20px", letterSpacing: "4px"}}>Done</button>
    </form>
      </div>: null}
      <ToastContainer
        theme="light"
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
}

export default SignUp
