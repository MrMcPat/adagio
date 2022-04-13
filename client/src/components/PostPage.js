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
    <div style={{textAlign: "center"}}>
        {userID === post.user_id ? 
        <>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <p>{post.created_at === post.updated_at ? 
        `-Created on ${post.created_at.slice(0, 16).split("T")[0]}, ${post.created_at.slice(0, 16).split("T")[1]}` :
        `-Updated on ${post.updated_at.slice(0, 16).split("T")[0]}, ${post.updated_at.slice(0, 16).split("T")[1]}`}</p>
        <Link to={`/editpost/${id}`}><button>Edit Post</button></Link>
        <Link to="/forumposts"><button onClick={handleDelete}>Delete Post</button></Link>
        <h4>Comments</h4>
        {replies.map(reply => <Replies key={reply.id} reply={reply} userID={userID} onReplyEdit={handleReplyEdit} onReplyDelete={handleReplyDelete}/>)}
        <ReplyForm userID={userID} postID={id} onReply={handleReply}/>
        </> : 
        <>
        <h3>{post.title} by {post.user.username}</h3>
        <p>{post.body}</p>
        <p>{post.created_at === post.updated_at ? 
        `-Created on ${post.created_at.slice(0, 16).split("T")[0]}, ${post.created_at.slice(0, 16).split("T")[1]}` :
        `-Updated on ${post.updated_at.slice(0, 16).split("T")[0]}, ${post.updated_at.slice(0, 16).split("T")[1]}`}</p>
        <h4>Comments</h4>
        {replies.map(reply => <Replies key={reply.id} reply={reply} userID={userID} onReplyEdit={handleReplyEdit} onReplyDelete={handleReplyDelete}/>)}
        <ReplyForm userID={userID} postID={id} onReply={handleReply}/>
        </>}

    </div>
  )
}

export default PostPage