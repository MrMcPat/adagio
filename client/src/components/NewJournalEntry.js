import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'

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
  }, [])

  function handleSubmit (e) {
    e.preventDefault()
    if (inputTitle.length === 0 || inputBody.length === 0) {
      toast.error("Please write something...", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
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
    <div style={{textAlign: "center"}} className="new-journal-entry">
      {isSubmitted ? 
      <><h1>You have submitted your journal entry.</h1>
      <button onClick={handleIsSubmitted}>Enter new journal Entry</button>
      <Link to="/journalentries"><button>Explore journal entries</button></Link>
      </> :
      <>
      <h1>What are your thoughts...</h1>
      <form onSubmit={handleSubmit}>
        <label>Journal Entry Title</label><br />
        <input className="text-box" value={inputTitle} onChange={e => setInputTitle(e.target.value)}></input><br />
        <label>Journal Entry Body</label><br/>
        <textarea className="textarea-box" rows="20" cols="100" style={{resize: "none"}} value={inputBody} onChange={e => setInputBody(e.target.value)}></textarea><br />
        <label>Private this journal entry</label>
        <input type="checkbox" onChange={e => setInputPrivate(e.target.checked)}/>
        <button type="submit">Submit Entry</button>
      </form>
      </>
    }

      <ToastContainer
        theme="dark"
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default NewJournalEntry