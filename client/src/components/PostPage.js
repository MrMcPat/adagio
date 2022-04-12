import React, { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

function PostPage() {
    const [userID, setUserID] = useState([])
    const [post, setPost] = useState([])
    const { id } = useParams()

    useEffect(() => {
        async function handleFetch() {
            const userData = await axios.get("/me")
            setUserID(userData.data.id)

            const postData = await axios.get(`/posts/${id}`)
            setPost(postData.data)
        }
        handleFetch()
    }, [])

    if (!post.created_at || !post.updated_at) return null

  return (
    <div style={{textAlign: "center"}}>
        {userID === post.user_id ? 
        <>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <p>{post.created_at === post.updated_at ? 
        `-Created on ${post.created_at.slice(0, 16).split("T")[0]}, ${post.created_at.slice(0, 16).split("T")[1]}` :
        `-Updated on ${post.updated_at.slice(0, 16).split("T")[0]}, ${post.updated_at.slice(0, 16).split("T")[1]}`}</p>
        <Link to={`/editpost/${id}`}><button>Edit Post</button></Link>
        <Link to="/forumposts"><button onClick={null}>Delete Post</button></Link>
        </> : 
        <>
        <h3>{post.title} by {post.user.username}</h3>
        <p>{post.body}</p>
        <p>{post.created_at === post.updated_at ? 
        `-Created on ${post.created_at.slice(0, 16).split("T")[0]}, ${post.created_at.slice(0, 16).split("T")[1]}` :
        `-Updated on ${post.updated_at.slice(0, 16).split("T")[0]}, ${post.updated_at.slice(0, 16).split("T")[1]}`}</p>
        </>}

    </div>
  )
}

export default PostPage