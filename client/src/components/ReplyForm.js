import React, {useState} from 'react'
import axios from "axios"

function ReplyForm({userID, postID, onReply}) {
    const [input, setInput] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        axios.post("/replies", {
            user_id: userID,
            post_id: postID,
            comment: input
        })
        .then(resp => onReply(resp.data))
        setInput("")
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input value={input} onChange={e => setInput(e.target.value)}></input>
            <button type="submit">Reply</button>
        </form>
    </div>
  )
}

export default ReplyForm