import React, { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { faHandsPraying } from "@fortawesome/free-solid-svg-icons"
import { faFaceSurprise } from "@fortawesome/free-solid-svg-icons"
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons"

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

  return <div style={{textAlign: "center"}} className="journal-page-container">
    {userID === journalEntry.user_id ?
    <>
    <div className="journal-page">
    <h3 style={{textAlign: "center", marginTop: "-35px", textShadow: "2px 2px grey", letterSpacing: "5px"}}>{journalEntry.title}</h3>
    <div className="journal-body">
    <div style={{height: "300px", overflowY: "scroll"}}><p>{journalEntry.body}</p></div>
      <p>{journalEntry.created_at === journalEntry.updated_at ? 
          `-Created on ${journalEntry.created_at.slice(0, 16).split("T")[0]}, ${journalEntry.created_at.slice(0, 16).split("T")[1]}` :
          `-Updated on ${journalEntry.updated_at.slice(0, 16).split("T")[0]}, ${journalEntry.updated_at.slice(0, 16).split("T")[1]}`}</p>
      <Link to={`/editentry/${id}`}><button className="scotch-tape2">Edit Entry</button></Link>
      <label>Private this journal entry</label>
      <input type="checkbox" checked={journalIsPrivate} onClick={handleIsPrivate}/>
    </div>
    </div>
    </>
    : journalEntry.is_private || journalEntryUser.journal_is_private ?
    <h3>{journalEntry.user.username} has made this journal entry private.</h3>
    :
    <>
    <div className="profile-section">
    <img src={journalEntry.user.profile_picture} style={{width: "130px", height: "130px", borderRadius: "50%"}} />
      <div className="profile-body">
      <span><Link to={`/user/${journalEntry.user.username}`} style={{fontSize: "30px", color: "grey", textDecoration: "none"}}>{journalEntry.user.username}</Link></span><br />
      <span>{journalEntry.user.description}</span><br />
      <Link to={`/user/${journalEntry.user.username}/journalentries`}><button className="scotch-tape">See All Journal Entries</button></Link><br />
      <Link to={`/user/${journalEntry.user.username}/posts`}><button className="scotch-tape2">See All Posts</button></Link>
      </div>
    </div>
      <div className="journal-page">
      <h3 style={{textAlign: "center", marginTop: "-35px", textShadow: "2px 2px grey", letterSpacing: "4px"}}>{journalEntry.title}</h3>
      <div className="journal-body">
      <div style={{height: "330px", overflowY: "scroll", margin: "10px"}}><p>{journalEntry.body}</p></div>
      <p>{journalEntry.created_at === journalEntry.updated_at ? 
          `-Created on ${journalEntry.created_at.slice(0, 16).split("T")[0]}, ${journalEntry.created_at.slice(0, 16).split("T")[1]}` :
          `-Updated on ${journalEntry.updated_at.slice(0, 16).split("T")[0]}, ${journalEntry.updated_at.slice(0, 16).split("T")[1]}`}</p>
      <button className="emoji-button" onClick={handleHeart} style={{width: "50px"}}><FontAwesomeIcon className="icon" icon={faHeart} color="#F24A72" style={{fontSize: "25px"}}/> </button>{heartCount}
      <button className="emoji-button" onClick={handlePraying} style={{width: "50px"}}><FontAwesomeIcon className="icon" icon={faHandsPraying} color="#FFD124" style={{fontSize: "25px"}}/> </button>{prayingCount}
      <button className="emoji-button" onClick={handleShocked} style={{width: "50px"}}><FontAwesomeIcon className="icon" icon={faFaceSurprise} color="#FFD124" style={{fontSize: "25px"}}/> </button>{shockedCount}
      <button className="emoji-button" onClick={handleSad} style={{width: "50px"}}><FontAwesomeIcon className="icon" icon={faFaceFrown} color="#FFD124" style={{fontSize: "25px"}}/> </button>{sadCount}
      </div>
      </div>
    </>
    }
  </div>
}

export default JournalEntryPage
