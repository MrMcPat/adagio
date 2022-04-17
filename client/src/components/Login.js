import React, {useState} from 'react'

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
          window.location = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=token&scope=streaming user-read-email user-modify-playback-state user-read-private user-read-private user-read-playback-state&show_dialog=true&redirect_uri=http://localhost:4000/callback`
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
        <button type="submit" className="login-input" style={{height: "75px", border: "none", color: "white",fontSize: "20px", letterSpacing: "4px"}}>login</button>
      </form>
    </div>
  )
}

export default Login