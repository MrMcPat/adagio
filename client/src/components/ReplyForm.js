import React, {useState} from 'react'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify'

function ReplyForm({userID, postID, onReply}) {
    const [input, setInput] = useState("")

    function handleSubmit(e) {
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
            axios.post("/replies", {
                user_id: userID,
                post_id: postID,
                comment: input
            })
            .then(resp => onReply(resp.data))
            setInput("")
        }
    }

  return (
    <div style={{padding: "30px"}}>
        <form onSubmit={handleSubmit}>
            <input value={input} onChange={e => setInput(e.target.value)}></input>
            <button type="submit">Reply</button>
        </form>

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

export default ReplyForm