import React, {useState, useEffect} from 'react'
import axios from 'axios'

function UserProfile() {

  useEffect(() => {
    async function handleFetch() {
      const userData = await axios.get("/me")
      console.log(userData.data)
    }
    handleFetch()
  }, [])
  return (
    <div>UserProfile</div>
  )
}

export default UserProfile