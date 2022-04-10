import React, { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

function JournalEntryPage() {
  const [userID, setUserID] = useState([])
  const [journalEntryUser, setJournalEntryUser] = useState("")
  const [journalEntry, setJournalEntry] = useState([])
  const { id } = useParams()

  useEffect(() => {
    async function handleFetch() {
      const userData = await axios.get("/me")
      setUserID(userData.data.id)

      
      const journalEntryData = await axios.get(`/journal_entries/${id}`)
      setJournalEntry(journalEntryData.data)
      const allUserData = await axios.get("/users")
      setJournalEntryUser(allUserData.data.find(user => user.id === journalEntryData.data.user_id))

    }
    handleFetch()
  }, [])

  if (!journalEntry.user) return null

  return <div style={{textAlign: "center"}}>
    {userID === journalEntry.user_id ?
    <>
    <h3>{journalEntry.title}</h3>
      <p>{journalEntry.body}</p>
      <Link to={`/editentry/${id}`}><button>Edit Entry</button></Link>
    </>
    : journalEntry.is_private || journalEntryUser.journal_is_private ?
    <h3>{journalEntry.user.username} has made this journal entry private.</h3>
    :
      <>
      <h3>{journalEntry.title} by {journalEntry.user.username}</h3>
      <p>{journalEntry.body}</p>
      </>
    }


  </div>
}

export default JournalEntryPage
