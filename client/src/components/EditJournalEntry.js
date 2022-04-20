import React, { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

function EditJournalEntry() {
    const [userID, setUserID] = useState([])
    const [journalEntry, setJournalEntry] = useState([])
    const [editTitle, setEditTitle] = useState([])
    const [editBody, setEditBody] = useState([])
    const [editPrivate, setEditPrivate] = useState(false)
    const [isEdited, setIsEdited] = useState(false)
    const { id } = useParams()
    
    useEffect(() => {
      async function handleFetch() {
        const userData = await axios.get("/me")
        setUserID(userData.data.id)
        const journalEntryData = await axios.get(`/journal_entries/${id}`)
        setJournalEntry(journalEntryData.data)
        setEditTitle(journalEntryData.data.title)
        setEditBody(journalEntryData.data.body)
        setEditPrivate(journalEntryData.data.is_private)
      }
      handleFetch()
    }, [])

    function handleSubmit (e) {
        e.preventDefault()
        if (editTitle.length === 0 || editBody.length === 0) {
            alert("Please write something...")
        } else {
            axios.patch(`/journal_entries/${id}`, {
                title: editTitle,
                body: editBody,
                is_private: editPrivate
            })
        }
        setIsEdited(true)
    }

    function handleDelete() {
      axios.delete(`/journal_entries/${id}`)
      alert("Your journal entry has been deleted.")
    }

  return (
    <div style={{textAlign: "center"}} className="new-journal-entry">
      {userID === journalEntry.user_id ?
      <>
      {isEdited ? <p>Your journal entry has been edited.</p> :
    <>
    <h2>Edit your journal entry</h2>
    <form onSubmit={handleSubmit}>
      <input className="text-box" placeholder="Title goes here" value={editTitle} onChange={e => setEditTitle(e.target.value)}></input><br /><br />
      <textarea className="textarea-box" rows="20" cols="100" style={{resize: "none"}} value={editBody} onChange={e => setEditBody(e.target.value)}></textarea><br />
      <label>Private this journal entry</label>
      <input  type="checkbox" checked={editPrivate || ""} onChange={e => setEditPrivate(e.target.checked)}/>
      <button className="default-button" type="submit">Edit Entry</button>
      <Link to="/userprofile"><button className="default-button" style={{width: "150px"}} onClick={handleDelete}>Delete Entry</button></Link>
    </form>
    </>
        }  
      </>
      :
      <h1>Access Denied.</h1>
      }
  </div>
  )
}

export default EditJournalEntry