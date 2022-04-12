import React, { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

function EditPost() {
    const [userID, setUserID] = useState([])
    const [post, setPost] = useState([])
    const [editTitle, setEditTitle] = useState([])
    const [editBody, setEditBody] = useState([])
    const [isEdited, setIsEdited] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        async function handleFetch() {
          const userData = await axios.get("/me")
          setUserID(userData.data.id)
          const postData = await axios.get(`/posts/${id}`)
          setPost(postData.data)
          setEditTitle(postData.data.title)
          setEditBody(postData.data.body)
        }
        handleFetch()
      }, [])

      function handleSubmit (e) {
        e.preventDefault()
        if (editTitle.length === 0 || editBody.length === 0) {
            alert("Please write something...")
        } else {
            axios.patch(`/posts/${id}`, {
                title: editTitle,
                body: editBody,
            })
        }
        setIsEdited(true)
    }

  return (
    <div style={{textAlign: "center"}}>
    {userID === post.user_id ?
      <>
      {isEdited ? <p>Your journal entry has been edited.<Link to="/forumposts"><button>Go to forums</button></Link></p> :
    <>
    <h1>Edit your post</h1>
    <form onSubmit={handleSubmit}>
      <label>Title</label><br />
      <input value={editTitle} onChange={e => setEditTitle(e.target.value)}></input><br />
      <label>Body</label><br/>
      <textarea rows="10" cols="100" style={{resize: "none"}} value={editBody} onChange={e => setEditBody(e.target.value)}></textarea><br />
      <button type="submit">Edit Post</button>
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

export default EditPost