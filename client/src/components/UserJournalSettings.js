import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

function UserJournalSettings() {
    const [userJournalEntries, setUserJournalEntries] = useState([])
    const [userJournalPrivate, setUserJournalPrivate] = useState(null)
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        async function handleFetch() {
            const userData = await axios.get("/me")
            setUserJournalPrivate(userData.data.journal_is_private)
            const userJournalEntryData = await axios.get("/journal_entries")
            setUserJournalEntries(userJournalEntryData.data.filter(entry => entry.user_id === userData.data.id))
        }
        handleFetch()
    }, [])

    function handleDelete(e) {
        axios.delete(`/journal_entries/${e.target.value}`)
        setUserJournalEntries(userJournalEntries.filter(entry => entry.id !== parseInt(e.target.value)))
    }

    function handleToggle() {
        setToggle(toggle => !toggle)
      }

    async function handleSearch(e) {
        if (e.target.value.length > 0) {
          setUserJournalEntries(userJournalEntries.filter(entry => entry.title.toLowerCase().includes(e.target.value.toLowerCase()) || entry.updated_at.toLowerCase().includes(e.target.value.toLowerCase())))
        } else {
          const userData = await axios.get("/me")
          const userJournalEntryData = await axios.get("/journal_entries")
          setUserJournalEntries(userJournalEntryData.data.filter(entry => entry.user_id === userData.data.id))
        }
      }

  return (
    <div className="user-settings">
    <h2>Your Journal Entries</h2>
    <button onClick={handleToggle} style={{background: "transparent", border: "none"}}><FontAwesomeIcon icon={faMagnifyingGlass} color="white"/></button>
      {toggle ? <input className="text-box" placeholder="Search" onChange={handleSearch}/> : null}
      {userJournalEntries.length === 0 ? <p>No journal entries :(</p> 
      : userJournalEntries.map(entry => {
        return <div key={entry.id} style={{margin: "10px"}}>
          <Link to={`/journalentry/${entry.id}`} style={{textDecoration: "none", color: "white"}}><strong>{entry.title}</strong></Link><br />
          <span>{entry.is_private || userJournalPrivate ? "Marked as private" : "Public"}</span><br />
          <span>{entry.created_at === entry.updated_at ? 
          `-Created on ${entry.created_at.slice(0, 16).split("T")[0]}, ${entry.created_at.slice(0, 16).split("T")[1]}` :
          `-Updated on ${entry.updated_at.slice(0, 16).split("T")[0]}, ${entry.updated_at.slice(0, 16).split("T")[1]}`}</span><br />
          <Link to={`/editentry/${entry.id}`}><button className="default-button" value={entry.id}>Edit</button></Link>
          <button className="default-button" value={entry.id} onClick={handleDelete}>Delete</button>
        </div>
      })}
    </div>
  )
}

export default UserJournalSettings