import React, {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { Link } from "react-router-dom"

function Login({setUser}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  
    function handleSubmit(e) {
      e.preventDefault()
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }).then((r) => {
        if (r.ok) {
          r.json().then((user) => setUser(user))
          window.location = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=token&scope=streaming user-read-email user-modify-playback-state user-read-private user-read-private user-read-playback-state&show_dialog=true&redirect_uri=https://adagio-app.herokuapp.com/callback`
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
            })
            )
        }
      })
    }

  return (
    <div style={{textAlign: "center"}} className="login-container">
        <form onSubmit={handleSubmit}>
        <h1>Welcome back!</h1>
        <div className="login-input">
        <label htmlFor="email" style={{fontSize: "20px", letterSpacing: "4px"}}>email</label><br />
        <input
          type="text"
          id="email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-box"
        />
        </div>
        <div className="login-input">
        <label htmlFor="password" style={{fontSize: "20px", letterSpacing: "4px"}}>password</label><br />
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-box"
        />
        </div>
        <p style={{textShadow: "1px 1px grey"}}>New user? <Link to="/signup" style={{color: "white"}}>Sign up here!</Link></p>
        <button type="submit" className="login-input" style={{height: "75px", border: "none", color: "white",fontSize: "20px", letterSpacing: "4px"}}>login</button>
      </form>

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
  )
}

export default Login