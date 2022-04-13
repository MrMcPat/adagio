import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom"

function ForumPost({post, userID}) {
  const [replyCount, setReplyCount] = useState([])

  useEffect(() => {
    async function handleFetch() {
      const replyData = await axios.get("/replies")
      setReplyCount(replyData.data.filter(reply => reply.post_id === post.id).length)
    }
    handleFetch()
  }, [])

  return (
    <>
    <p><Link to={`/post/${post.id}`}>{post.title}</Link> 
    {post.user_id === userID ? <span> by {post.user.username}(You)</span> : <span> by <Link to={`/user/${post.user.username}`}>{post.user.username}</Link></span>}</p>
    <p>{post.body}</p>
    <p>{replyCount} comment(s)</p>
    <p>{post.created_at === post.updated_at ? 
    `-Created on ${post.created_at.slice(0, 16).split("T")[0]}, ${post.created_at.slice(0, 16).split("T")[1]}` :
    `-Updated on ${post.updated_at.slice(0, 16).split("T")[0]}, ${post.updated_at.slice(0, 16).split("T")[1]}`}</p>
    </>
  )
}

export default ForumPost