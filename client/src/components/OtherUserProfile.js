import React, { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

function OtherUserProfile() {
    const [userProfile, setUserProfile] = useState([])
    const [userEmotions, setUserEmotions] = useState([])
    const [userJournalEntries, setUserJournalEntries] = useState([])
    const [userPosts, setUserPosts] = useState([])
    const { username } = useParams()

    useEffect(() => {
        async function handleFetch() {
            const userData = await axios.get("/users")
            const filteredUser = userData.data.find(user => user.username == username)
            setUserProfile(filteredUser)
            const emotionData = await axios.get("/emotions")
            setUserEmotions(emotionData.data.filter(emotion => emotion.user_id === filteredUser.id))
            const journalData = await axios.get("/journal_entries")
            setUserJournalEntries(journalData.data.filter(entry => entry.user_id === filteredUser.id))
            const postData = await axios.get("/posts")
            setUserPosts(postData.data.filter(post => post.user_id === filteredUser.id))
        }
        handleFetch()
    }, [])

    console.log(userProfile)

  return (
    <div style={{textAlign: "center"}}>
        <p>{userProfile.first_name} {userProfile.last_name}</p>
        <p>Username: {userProfile.username}</p>
        <img src={userProfile.profile_picture} alt="profile picture" style={{width: "100px", height: "100px", borderRadius: "50%"}}/>
        <p>{userProfile.description}</p>
    </div>
  )
}

export default OtherUserProfile