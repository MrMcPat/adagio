import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"

function UserProfile() {
  const [userProfile, setUserProfile] = useState([])
  const [userColorList, setUserColorList] = useState([])
  const [userJournalEntries, setUserJournalEntries] = useState([])
  const [toggle, setToggle] = useState(false)

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

  function handleToggle() {
    setToggle(toggle => !toggle)
  }

  async function handleSearch(e) {
    if (e.target.value.length > 0) {
      setUserJournalEntries(userJournalEntries.filter(entry => entry.title.toLowerCase().includes(e.target.value.toLowerCase())))
    } else {
      const userData = await axios.get("/me")
      const userJournalEntryData = await axios.get("/journal_entries")
      setUserJournalEntries(userJournalEntryData.data.filter(entry => entry.user_id === userData.data.id))
    }
  }

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
      <button onClick={handleToggle}>Search</button>
      {toggle ? <input placeholder="Filter your journal entries." onChange={handleSearch}/> : null}
      {userJournalEntries.length === 0 ? <p>No journal entries :(</p> 
      : userJournalEntries.map(entry => {
        return <div key={entry.id}>
          <Link to={`/journalentry/${entry.id}`}><h3>{entry.title}</h3></Link>
          <p>{entry.is_private || userProfile.journal_is_private ? "Marked as private" : "Public"}</p>
          <p>{entry.created_at === entry.updated_at ? 
          `-Created on ${entry.created_at.slice(0, 16).split("T")[0]}, ${entry.created_at.slice(0, 16).split("T")[1]}` :
          `-Updated on ${entry.updated_at.slice(0, 16).split("T")[0]}, ${entry.updated_at.slice(0, 16).split("T")[1]}`}</p>
        </div>
      })}
    </div>
  )
}

export default UserProfile