import React, {useState} from 'react'
import axios from 'axios'

function Replies({reply, userID, onReplyEdit, onReplyDelete}) {
    const [toggle, setToggle] = useState(false)
    const [input, setInput] = useState("")

    function handleToggle() {
        setToggle(toggle => !toggle)
    }

    function handleEdit(e) {
        e.preventDefault()
        axios.patch(`/replies/${reply.id}`, {
            comment: input
        })
        onReplyEdit(input)
        setToggle(false)
    }

    function handleDelete() {
        axios.delete(`/replies/${reply.id}`)
        onReplyDelete(reply.id)
    }

  return (
    <>
    <p>{reply.comment}</p>
    <p>{reply.user.username}</p>
    <p>{reply.created_at === reply.updated_at ? 
        `-Commented on ${reply.created_at.slice(0, 16).split("T")[0]}, ${reply.created_at.slice(0, 16).split("T")[1]}` :
        `-Updated comment on ${reply.updated_at.slice(0, 16).split("T")[0]}, ${reply.updated_at.slice(0, 16).split("T")[1]}`}</p>
    {userID === reply.user_id ? 
    <>
    <button onClick={handleToggle}>Edit</button>
    <button onClick={handleDelete}>Delete</button>
    {toggle ? <>
    <form onSubmit={handleEdit}>
    <input value={input} onChange={e => setInput(e.target.value)}></input>
    <button type="submit">Edit Comment</button>
    </form>
    </> 
    : null}
    </> 
    : null}
    </>
  )
}

export default Replies