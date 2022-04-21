import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'

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
            axios.post("/posts", {
                user_id: userID,
                title: inputTitle,
                body: inputBody
            })
            setIsSubmitted(true)
        }
      }

  return (
    <div style={{textAlign: "center"}} className="new-journal-entry">
        {isSubmitted ? 
        <><h1>You have submitted your post.</h1><Link to="/forumposts"><button style={{border: "none", color: "white"}} className="signup-input">Go to forums</button></Link></> :
        <>
        <h1>New Post</h1>
        <form onSubmit={handleSubmit}>
            <label>Title</label><br />
            <input className="text-box" value={inputTitle} onChange={e => setInputTitle(e.target.value)}></input><br />
            <label>Body</label><br />
            <textarea className="textarea-box" rows="10" cols="100" style={{resize: "none"}} value={inputBody} onChange={e => setInputBody(e.target.value)}></textarea><br />
            <button className="signup-input" style={{color: "white", border: "none", width: "200px", height: "50px"}} type="submit">Submit Post</button>
        </form>
        </>       
        }

      <ToastContainer
        theme="light"
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

export default NewPost