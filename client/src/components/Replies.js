import React, {useState} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { faMinus } from "@fortawesome/free-solid-svg-icons"

function Replies({reply, userID, onReplyEdit, onReplyDelete}) {
    const [toggle, setToggle] = useState(false)
    const [input, setInput] = useState("")

    function handleToggle() {
        setToggle(toggle => !toggle)
    }

    function handleEdit(e) {
        e.preventDefault()
        if (input.length === 0) {
          toast.error("Please write something...", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
        } else {
          axios.patch(`/replies/${reply.id}`, {
            comment: input
        })
        onReplyEdit(input)
        setToggle(false)
        }
    }

    function handleDelete() {
        axios.delete(`/replies/${reply.id}`)
        onReplyDelete(reply.id)
    }

    console.log(userID)

  return (
    <div className="reply-container">
      <div className="reply-profile-section">
        <div className="reply-profile-header">
        <img src={reply.user.profile_picture} style={{width: "75px", height: "75px", borderRadius: "50%", background: "white"}}/>
        </div>
      {userID === reply.user_id ? <Link to="/userprofile" style={{textDecoration: "none", color: "white"}}><p style={{position: "relative", top: "50px"}}>{reply.user.username}(You)</p></Link> : <Link to={`/user/${reply.user.username}`} style={{position: "relative", top: "50px", textDecoration: "none", color: "white"}}><p>{reply.user.username}</p></Link>}
      </div>
      <div className="reply-section">
      <div className="comment-section">
      <p>{reply.comment}</p>
      </div>
      {userID === reply.user_id ? 
    <>
    {toggle ? <>
    <form onSubmit={handleEdit}>
    <input className="text-box" value={input} onChange={e => setInput(e.target.value)}></input>
    <button style={{display: "none"}} type="submit">Edit Comment</button>
    </form>
    </> 
    : null}
    <button style={{background: "transparent", border: "none"}} onClick={handleToggle}><FontAwesomeIcon icon={faPenToSquare} color="white"/></button>
    <button style={{background: "transparent", border: "none"}} onClick={handleDelete}><FontAwesomeIcon icon={faMinus} color="white"/></button><br/>
    
    </> 
    : null}
    <span>{reply.created_at === reply.updated_at ? 
        `-Commented on ${reply.created_at.slice(0, 16).split("T")[0]}, ${reply.created_at.slice(0, 16).split("T")[1]}` :
        `-Updated comment on ${reply.updated_at.slice(0, 16).split("T")[0]}, ${reply.updated_at.slice(0, 16).split("T")[1]}`}</span>
      </div>

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

export default Replies