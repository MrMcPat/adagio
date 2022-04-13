import React, { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

function JournalEntryPage() {
  const [userID, setUserID] = useState([])
  const [journalEntryUser, setJournalEntryUser] = useState("")
  const [journalEntry, setJournalEntry] = useState([])
  const [heartCount, setHeartCount] = useState([])
  const [prayingCount, setPrayingCount] = useState([])
  const [shockedCount, setShockedCount] = useState([])
  const [sadCount, setSadCount] = useState([])
  const [journalIsPrivate, setJournalIsPrivate] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    async function handleFetch() {
      const userData = await axios.get("/me")
      setUserID(userData.data.id)
      
      const journalEntryData = await axios.get(`/journal_entries/${id}`)
      setJournalEntry(journalEntryData.data)
      setHeartCount(journalEntryData.data.heart_count)
      setPrayingCount(journalEntryData.data.praying_count)
      setShockedCount(journalEntryData.data.shocked_count)
      setSadCount(journalEntryData.data.sad_count)
      setJournalIsPrivate(journalEntryData.data.is_private)
      const allUserData = await axios.get("/users")
      setJournalEntryUser(allUserData.data.find(user => user.id === journalEntryData.data.user_id))
    }
    handleFetch()
  }, [])

  function handleDelete() {
    axios.delete(`/journal_entries/${id}`)
    alert("Your journal entry has been deleted.")
  }

function handleHeart() {
    setHeartCount(heartCount + 1)
    axios.patch(`/journal_entries/${id}`, {
        heart_count: heartCount + 1
    })
}

function handlePraying() {
    setPrayingCount(prayingCount + 1)
    axios.patch(`/journal_entries/${id}`, {
        praying_count: prayingCount + 1
    })
}

function handleShocked() {
    setShockedCount(shockedCount + 1)
    axios.patch(`/journal_entries/${id}`, {
        shocked_count: shockedCount + 1
    })
}

function handleSad() {
    setSadCount(sadCount + 1)
    axios.patch(`/journal_entries/${id}`, {
        sad_count: sadCount + 1
    })
}

function handleIsPrivate(e){
  setJournalIsPrivate(e.target.checked)
  axios.patch(`/journal_entries/${id}`, {
    is_private: e.target.checked
  })
}

  if (!journalEntry.user) return null

  return <div style={{textAlign: "center"}}>
    {userID === journalEntry.user_id ?
    <>
    <h3>{journalEntry.title}</h3>
      <p>{journalEntry.body}</p>
      <p>{journalEntry.created_at === journalEntry.updated_at ? 
          `-Created on ${journalEntry.created_at.slice(0, 16).split("T")[0]}, ${journalEntry.created_at.slice(0, 16).split("T")[1]}` :
          `-Updated on ${journalEntry.updated_at.slice(0, 16).split("T")[0]}, ${journalEntry.updated_at.slice(0, 16).split("T")[1]}`}</p>
      <Link to={`/editentry/${id}`}><button>Edit Entry</button></Link>
      <Link to="/userprofile"><button onClick={handleDelete}>Delete Entry</button></Link>
      <label>Private this journal entry</label>
      <input type="checkbox" checked={journalIsPrivate} onClick={handleIsPrivate}/>
    </>
    : journalEntry.is_private || journalEntryUser.journal_is_private ?
    <h3>{journalEntry.user.username} has made this journal entry private.</h3>
    :
      <>
      <h3>{journalEntry.title} by {journalEntry.user.username}</h3>
      <p>{journalEntry.body}</p>
      <p>{journalEntry.created_at === journalEntry.updated_at ? 
          `-Created on ${journalEntry.created_at.slice(0, 16).split("T")[0]}, ${journalEntry.created_at.slice(0, 16).split("T")[1]}` :
          `-Updated on ${journalEntry.updated_at.slice(0, 16).split("T")[0]}, ${journalEntry.updated_at.slice(0, 16).split("T")[1]}`}</p>
      <p><button onClick={handleHeart}>❤️</button>{heartCount} <button onClick={handlePraying}>🙏</button>{prayingCount} <button onClick={handleShocked}>😮</button>{shockedCount} <button onClick={handleSad}>😞</button>{sadCount}</p>
      </>
    }
  </div>
}

export default JournalEntryPage
