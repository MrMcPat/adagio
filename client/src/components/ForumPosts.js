import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import ForumPost from './ForumPost'

function ForumPosts() {
    const [forumPosts, setForumPosts] = useState([])

    useEffect(() => {
        async function handleFetch() {
            const userData = await axios.get("/me")
            const allTriggers = await axios.get("/triggers")
            const userTriggers = allTriggers.data.filter(trigger => trigger.user_id === userData.data.id)
            const allPosts = await axios.get("/posts")
            const filteredPosts = allPosts.data.filter(post => {
                if (userTriggers.filter(trigger => post.title.toLowerCase().includes(trigger.trigger.toLowerCase())).length === 0) {
                    return true
                } else {
                    return false
                }
            })
            setForumPosts(filteredPosts)
        }
        handleFetch()
    }, [])

  return (
    <div style={{textAlign: "center"}}>
        <Link to="/newpost"><button>Create new post</button></Link>
        {forumPosts.map(post => <ForumPost key={post.id} post={post} />)}
    </div>
  )
}

export default ForumPosts