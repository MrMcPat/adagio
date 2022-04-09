import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"

function UserProfile() {
  const [userProfile, setUserProfile] = useState([])
  const [userColorList, setUserColorList] = useState([])
  const [userJournalEntries, setUserJournalEntries] = useState([])

  useEffect(() => {
    async function handleFetch() {
      const userData = await axios.get("/me")
      setUserProfile(userData.data)
      const userEmotionData = await axios.get("/emotions")
      setUserColorList(userEmotionData.data.filter(emotion => emotion.user_id === userData.data.id))
      const userJournalEntryData = await axios.get("/journal_entries")
      setUserJournalEntries(userJournalEntryData.data.filter(entry => entry.user_id === userData.data.id))
    }
    handleFetch()
  }, [])

  return (
    <div style={{textAlign: "center"}}>
      <p>{userProfile.first_name} {userProfile.last_name}</p>
      <p>Username: {userProfile.username}</p>
      <img src={userProfile.profile_picture} alt="profile picture" style={{width: "100px", height: "100px", borderRadius: "50%"}}/>
      <p>{userProfile.description}</p>
      <p>Your Colors:</p>
      {userColorList.map(emotion => {
      return <div key={emotion.id}><span style={{background: `${emotion.color}`}}>&nbsp;&nbsp;&nbsp;&nbsp;</span>{emotion.emotion}</div>
    })}
      <h2>Your Journal Entries</h2>
      {userJournalEntries.length === 0 ? <p>You do not have any journal entries.</p> 
      : userJournalEntries.map(entry => {
        return <div key={entry.id}>
          <Link to={`/journalentry/${entry.id}`}><h3>{entry.title}</h3></Link>
          <p>{entry.is_private ? "Marked as private" : "Public"}</p>
        </div>
      })}
    </div>
  )
}

export default UserProfile