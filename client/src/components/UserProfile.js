import React, {useState, useEffect} from 'react'
import axios from 'axios'

function UserProfile() {
  const [userProfile, setUserProfile] = useState([])

  useEffect(() => {
    async function handleFetch() {
      const userData = await axios.get("/me")
      setUserProfile(userData.data)
    }
    handleFetch()
  }, [])

  if (!userProfile.emotions) return null

  return (
    <div style={{textAlign: "center"}}>
      <p>{userProfile.first_name} {userProfile.last_name}</p>
      <p>Username: {userProfile.username}</p>
      <img src={userProfile.profile_picture} style={{width: "100px", borderRadius: "50%"}}/>
      <p>{userProfile.description}</p>
      <p>Your colors:</p>
      {userProfile.emotions.map(emotion => {
        return <div key={emotion.id} style={{color: emotion.color}}>{emotion.emotion}</div>
      })}
    </div>
  )
}

export default UserProfile