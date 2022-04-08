import React, {useState, useEffect} from 'react'
import axios from 'axios'

function UserProfile() {
  const [userProfile, setUserProfile] = useState([])
  const [userColorList, setUserColorList] = useState([])

  useEffect(() => {
    async function handleFetch() {
      const userData = await axios.get("/me")
      setUserProfile(userData.data)
      const userEmotionData = await axios.get("/emotions")
      setUserColorList(userEmotionData.data.filter(emotion => emotion.user_id === userData.data.id))
    }
    handleFetch()
  }, [])

  return (
    <div style={{textAlign: "center"}}>
      <p>{userProfile.first_name} {userProfile.last_name}</p>
      <p>Username: {userProfile.username}</p>
      <img src={userProfile.profile_picture} alt="profile picture" style={{width: "100px", height: "100px", borderRadius: "50%"}}/>
      <p>{userProfile.description}</p>
      <p>Your colors:</p>
      {userColorList.map(emotion => {
      return <div key={emotion.id}><span style={{background: `${emotion.color}`}}>&nbsp;&nbsp;&nbsp;&nbsp;</span>{emotion.emotion}</div>
    })}
    </div>
  )
}

export default UserProfile