import React, { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

function EditJournalEntry() {
    const { id } = useParams()
    const [editTitle, setEditTitle] = useState([])
    const [editBody, setEditBody] = useState([])
    const [isEdited, setIsEdited] = useState(false)

    function handleSubmit (e) {
        e.preventDefault()
        if (editTitle.length === 0 || editBody.length === 0) {
            alert("Please write something...")
        } else {
            axios.patch(`/journal_entries/${id}`, {
                title: editTitle,
                body: editBody
            })
        }
        setIsEdited(true)
    }

  return (
    <div style={{textAlign: "center"}}>
    {isEdited ? <p>Your journal entry has been edited.</p> :
    <>
    <h1>Edit your journal entry</h1>
    <form onSubmit={handleSubmit}>
      <label>Journal Entry Title</label><br />
      <input value={editTitle} onChange={e => setEditTitle(e.target.value)}></input><br />
      <label>Journal Entry Body</label><br/>
      <textarea rows="20" cols="100" style={{resize: "none"}} value={editBody} onChange={e => setEditBody(e.target.value)}></textarea><br />
      <label>Private this journal entry</label>
      <input type="checkbox" />
      <button type="submit">Edit Entry</button>
    </form>
    </>
        }  
  </div>
  )
}

export default EditJournalEntry