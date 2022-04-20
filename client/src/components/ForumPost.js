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
    <div className="forum-post-container">
    <div className="forum-profile">
    {post.user_id === userID ? 
    <>
    <div className="profile-header">
    </div>
    <img src={post.user.profile_picture} style={{width: "75px", height: "75px", borderRadius: "50%", background: "white"}} /><br />
    <span style={{position: "relative", top: "-10px"}}><Link to="/userprofile" style={{textDecoration: "none", color: "white"}}>{post.user.username}(You)</Link></span>
    </>:
    <>
    <div className="profile-header">
    </div>
    <img src={post.user.profile_picture} style={{width: "75px", height: "75px", borderRadius: "50%", background: "white"}} /><br />
      <span style={{position: "relative", top: "-10px"}}><Link to={`/user/${post.user.username}`} style={{textDecoration: "none", color: "white"}}>{post.user.username}</Link></span>
    </>
    }
    </div>
    <div className="forum-post">
      <div className="forum-title">
      <h4 style={{position: "relative", top: "5px"}}><Link to={`/post/${post.id}`} style={{textDecoration: "none", color: "white"}}>{post.title}</Link></h4>
      </div>
    <p>{post.body.length === 20 ? `${post.body.substring(0, 20)}...` : post.body}</p>
    <p>{replyCount} comment(s)</p>
    <p>{post.created_at === post.updated_at ? 
    `-Created on ${post.created_at.slice(0, 16).split("T")[0]}, ${post.created_at.slice(0, 16).split("T")[1]}` :
    `-Updated on ${post.updated_at.slice(0, 16).split("T")[0]}, ${post.updated_at.slice(0, 16).split("T")[1]}`}</p>
    </div>
    </div>
  )
}

export default ForumPost