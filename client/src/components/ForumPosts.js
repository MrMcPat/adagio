import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import ForumPost from './ForumPost'
import InfiniteScroll from 'react-infinite-scroll-component'

function ForumPosts() {
    const [forumPosts, setForumPosts] = useState([])
    const [count, setCount] = useState(7)

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
            setForumPosts(filteredPosts.slice(0, count))
        }
        handleFetch()
    }, [count])


  return (
    <div style={{textAlign: "center"}}>
        <Link to="/newpost"><button>Create new post</button></Link>
        <InfiniteScroll
        dataLength={forumPosts.length}
        next={() => setCount(count + 6)} 
        hasMore={true}
        >
        {forumPosts.map(post => <ForumPost key={post.id} post={post} />)}
        </InfiniteScroll>

    </div>
  )
}

export default ForumPosts