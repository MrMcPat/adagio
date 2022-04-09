import React, {useState, useEffect} from 'react'
import axios from 'axios'

function NewJournalEntry() {
  const [userID, setUserID] = useState([])
  const [inputTitle, setInputTitle] = useState("")
  const [inputBody, setInputBody] = useState("")
  const [inputPrivate, setInputPrivate] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    async function handleFetch() {
      const userData = await axios.get("/me")
      setUserID(userData.data.id)
    }
    handleFetch()
  })

  function handleSubmit (e) {
    e.preventDefault()
    if (inputTitle.length === 0 || inputBody.length === 0) {
      alert("Please write something...")
    } else {
      axios.post("/journal_entries", {
        user_id: userID,
        title: inputTitle,
        body: inputBody,
        is_private: inputPrivate,
        heart_count: 0,
        praying_count: 0,
        shocked_count: 0,
        sad_count: 0
      })
      setIsSubmitted(true)
      setInputTitle("")
      setInputBody("")
    }
  }

  function handleIsSubmitted () {
    setIsSubmitted(false)
  }

  return (
    <div style={{textAlign: "center"}}>
      {isSubmitted ? 
      <><h1>You have submitted your journal entry.</h1><button onClick={handleIsSubmitted}>Enter new journal Entry</button></> :
      <>
      <h1>What are your thoughts...</h1>
      <form onSubmit={handleSubmit}>
        <label>Journal Entry Title</label><br />
        <input value={inputTitle} onChange={e => setInputTitle(e.target.value)}></input><br />
        <label>Journal Entry Body</label><br/>
        <textarea rows="20" cols="100" style={{resize: "none"}} value={inputBody} onChange={e => setInputBody(e.target.value)}></textarea><br />
        <label>Private this journal entry</label>
        <input type="checkbox" onChange={e => setInputPrivate(e.target.checked)}/>
        <button type="submit">Submit Entry</button>
      </form>
      </>
    }

    </div>
  )
}

export default NewJournalEntry