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
  return (
    <div>
      <p>{userProfile.first_name} {userProfile.last_name}</p>
    </div>
  )
}

export default UserProfile