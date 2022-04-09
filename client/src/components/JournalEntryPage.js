import React, { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

function JournalEntryPage() {
  const { id } = useParams()
  const [journalEntry, setJournalEntry] = useState([])

  useEffect(() => {
    async function handleFetch() {
      const journalEntryData = await axios.get(`/journal_entries/${id}`)
      setJournalEntry(journalEntryData.data)
    }
    handleFetch()
  }, [])

  return <div style={{textAlign: "center"}}>
      <h3>{journalEntry.title}</h3>
      <p>{journalEntry.body}</p>
      <Link to={`/editentry/${id}`}><button>Edit Entry</button></Link>
  </div>
}

export default JournalEntryPage
