import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"

function NewPost() {
    const [userID, setUserID] = useState([])
    const [inputTitle, setInputTitle] = useState("")
    const [inputBody, setInputBody] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)

    useEffect(() => {
        async function handleFetch() {
          const userData = await axios.get("/me")
          setUserID(userData.data.id)
        }
        handleFetch()
      }, [])

      function handleSubmit(e) {
        e.preventDefault()
        if (inputTitle.length === 0 || inputBody.length === 0) {
            alert("Please write something...")
        } else {
            axios.post("/posts", {
                user_id: userID,
                title: inputTitle,
                body: inputBody
            })
            setIsSubmitted(true)
        }
      }

  return (
    <div style={{textAlign: "center"}}>
        {isSubmitted ? 
        <><h1>You have submitted your post.</h1><Link to="/forumposts"><button>Go to forums</button></Link></> :
        <>
        <h1>New Post</h1>
        <form onSubmit={handleSubmit}>
            <label>Title</label><br />
            <input value={inputTitle} onChange={e => setInputTitle(e.target.value)}></input><br />
            <label>Body</label><br />
            <textarea rows="10" cols="100" style={{resize: "none"}} value={inputBody} onChange={e => setInputBody(e.target.value)}></textarea><br />
            <button type="submit">Submit Post</button>
        </form>
        </>       
        }

    </div>
  )
}

export default NewPost