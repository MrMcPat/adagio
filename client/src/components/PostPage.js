import React, { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import ReplyForm from "./ReplyForm"
import Replies from "./Replies"

function PostPage() {
    const [userID, setUserID] = useState([])
    const [post, setPost] = useState([])
    const [replies, setReplies] = useState([])
    const [editReply, setEditReply] = useState([])
    const { id } = useParams()

    useEffect(() => {
        async function handleFetch() {
            const userData = await axios.get("/me")
            setUserID(userData.data.id)

            const postData = await axios.get(`/posts/${id}`)
            setPost(postData.data)

            const replyData = await axios.get("/replies")
            setReplies(replyData.data.filter(reply => reply.post_id === parseInt(id)))
        }
        handleFetch()
    }, [editReply])

    function handleDelete() {
        axios.delete(`/posts/${id}`)
        alert("Your post has been deleted.")
      }

      function handleReply(postedReply) {
        setReplies([...replies, postedReply])
      }

      function handleReplyDelete(deleteID) {
        setReplies(replies.filter(reply => reply.id !== deleteID))
      }

      function handleReplyEdit(editedReply) {
        setEditReply(editedReply)
      }

    if (!post.created_at || !post.updated_at) return null

  return (
    <div style={{textAlign: "center"}} className="post-container">
        {userID === post.user_id ? 
        <>
        <div className="posts-page-container">
        <div className="posts-profile-section">
        <div className="posts-profile-header">
        <Link to={`/userprofile`}><img src={post.user.profile_picture} style={{width: "80px", height: "80px", borderRadius: "50%", background: "white"}} /></Link>
          </div>
          <div className="posts-profile-body">
          <span><Link to={`/userprofile`} style={{fontSize: "20px", color: "white", textDecoration: "none"}}>{post.user.username}(You)</Link></span><br />
          <span>{post.user.description.length > 80 ? `${post.user.description.substring(0, 80)}...` : post.user.description}</span><br />
          <Link to={`/userjournalentries`}><button className="scotch-tape">See All Journal Entries</button></Link><br />
          <Link to={`/userposts`}><button className="scotch-tape2">See All Posts</button></Link>
          </div>
        </div>
        <div className="posts-page">
        <div className="posts-title">
          <h3>{post.title}</h3>
        </div>
        <div className="posts-page-body">
        <p>{post.body}</p>
        </div>
        <p style={{paddingLeft: "10px"}}>{post.created_at === post.updated_at ? 
        `-Created on ${post.created_at.slice(0, 16).split("T")[0]}, ${post.created_at.slice(0, 16).split("T")[1]}` :
        `-Updated on ${post.updated_at.slice(0, 16).split("T")[0]}, ${post.updated_at.slice(0, 16).split("T")[1]}`}</p>
        </div>
        </div>
        <Link to={`/editpost/${id}`}><button className="scotch-tape">Edit Post</button></Link>
        <Link to="/forumposts"><button onClick={handleDelete} className="scotch-tape">Delete Post</button></Link>
        <ReplyForm userID={userID} postID={id} onReply={handleReply}/>
        <h4 style={{textShadow: "1px 1px grey"}}>Comments</h4>
        <div className="comment-container">
        {replies.length === 0 ? <h5>No comments yet.</h5> : replies.map(reply => <Replies key={reply.id} reply={reply} userID={userID} onReplyEdit={handleReplyEdit} onReplyDelete={handleReplyDelete}/>)}
        </div>
        </> : 
        <>
        <div className="posts-page-container">
        <div className="posts-profile-section">
          <div className="posts-profile-header">
          <Link to={`/user/${post.user.username}`}><img src={post.user.profile_picture} style={{width: "80px", height: "80px", borderRadius: "50%", background: "white"}} /></Link>
          </div>
          <div className="posts-profile-body">
          <span><Link to={`/user/${post.user.username}`} style={{fontSize: "20px", color: "white", textDecoration: "none"}}>{post.user.username}</Link></span><br />
          <span>{post.user.description.length > 80 ? `${post.user.description.substring(0, 80)}...` : post.user.description}</span><br />
          <Link to={`/user/${post.user.username}/journalentries`}><button className="scotch-tape">See All Journal Entries</button></Link><br />
          <Link to={`/user/${post.user.username}/posts`}><button className="scotch-tape2">See All Posts</button></Link>
          </div>
        </div>
        <div>
          <div className="posts-page">
          <div className="posts-title">
          <h3>{post.title}</h3>
          </div>
          <div className="posts-page-body">
          <p>{post.body}</p>
          </div>
          <p style={{paddingLeft: "10px"}}>{post.created_at === post.updated_at ? 
          `-Created on ${post.created_at.slice(0, 16).split("T")[0]}, ${post.created_at.slice(0, 16).split("T")[1]}` :
          `-Updated on ${post.updated_at.slice(0, 16).split("T")[0]}, ${post.updated_at.slice(0, 16).split("T")[1]}`}</p>
          </div>
        </div>
        </div>
        <ReplyForm userID={userID} postID={id} onReply={handleReply}/>
        <h4 style={{color: "white", fontWeight: "bolder", textShadow: "1px 1px grey"}}>Comments</h4>
        <div className="comment-container">
        {replies.length === 0 ? <h5>No comments yet.</h5> : replies.length === 0 ? <p>No comments yet.</p>:replies.map(reply => <Replies key={reply.id} reply={reply} userID={userID} onReplyEdit={handleReplyEdit} onReplyDelete={handleReplyDelete}/>)}
        </div>
        </>}


    </div>
  )
}

export default PostPage