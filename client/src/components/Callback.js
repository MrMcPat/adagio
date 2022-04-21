import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Callback({getToken}) {
  const [userProfile, setUserProfile] = useState([])
  const [hasResponse, setHasResponse] = useState(null)

    useEffect(() => {
      getToken(window.location.hash.substring(14).split("&")[0])
      async function handleFetch() {
        const userData = await axios.get("/me")
        setUserProfile(userData.data)
        const responseData = await axios.get("/responses")
        const currentDate = String(new Date().getFullYear()).padStart(2, "0") + "-" + String(new Date().getMonth()+1).padStart(2, "0") + "-" + String(new Date().getDate()).padStart(2, "0")
        setHasResponse(responseData.data.find(response => response.user_id === userData.data.id && response.created_at.includes(currentDate)))
      }
      handleFetch()
    }, [])

  return (
    <div style={{textAlign: "center"}} className="callback-container">
      <h1 style={{fontSize: "65px"}}><strong>Hello, {userProfile.username}!</strong></h1>
      <br />
      {hasResponse ? 
      <>
      <Link to="/musicrecommendations" style={{color: "white", textDecoration: "none"}}><h1 style={{fontSize: "60px"}}>Music recommendations</h1></Link>
      <Link to="/dailylyric" style={{color: "white", textDecoration: "none"}}><h1>Inspirational lyric for the day!</h1></Link>

      </> 
      :<>
      <Link to="/dailylyric" style={{color: "white", textDecoration: "none"}}><h1 style={{fontSize: "60px"}}>Inspirational lyric for the day!</h1></Link>
      <Link to="/musicrecommendations" style={{color: "white", textDecoration: "none"}}><h1>Music recommendations</h1></Link>
      </>
}
      <Link to="/userprofile" style={{color: "white", textDecoration: "none"}}><h1>Go to User Profile</h1></Link>
      <Link to="usersettings" style={{color: "white", textDecoration: "none"}}><h1>Go to User Settings</h1></Link>
      <Link to="/journalentries" style={{color: "white", textDecoration: "none"}}><h1>Explore other journal entries</h1></Link>
      <Link to="/forumposts" style={{color: "white", textDecoration: "none"}}><h1>Explore the forums</h1></Link>
    </div>
  )
}

export default Callback