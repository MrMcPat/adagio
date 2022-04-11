import React from 'react'
import { Link } from "react-router-dom"

function ExploreJournalEntry({entry}) {

  return (
    <div>
        <Link to={`/journalentry/${entry.id}`}><span>{entry.title}</span></Link><span> by {entry.user.username}</span>
        <p>{entry.body}</p>
        <p>{entry.is_private || entry.user.journal_is_private ? "Marked as private" : "Public"}</p>
          <p>{entry.created_at === entry.updated_at ? 
          `-Created on ${entry.created_at.slice(0, 16).split("T")[0]}, ${entry.created_at.slice(0, 16).split("T")[1]}` :
          `-Updated on ${entry.updated_at.slice(0, 16).split("T")[0]}, ${entry.updated_at.slice(0, 16).split("T")[1]}`}</p>
    </div>
  )
}

export default ExploreJournalEntry