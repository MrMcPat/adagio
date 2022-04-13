import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import ForumPost from './ForumPost'
import InfiniteScroll from 'react-infinite-scroll-component'

function ForumPosts() {
    const [userID, setUserID] = useState([])
    const [forumPosts, setForumPosts] = useState([])
    const [allForumPosts, setAllForumPosts] = useState([])
    const [count, setCount] = useState(7)
    const [input, setInput] = useState("")

    useEffect(() => {
        async function handleFetch() {
            const userData = await axios.get("/me")
            setUserID(userData.data.id)
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
            setAllForumPosts(filteredPosts)
        }
        handleFetch()
    }, [count])

    async function handleSearch(e) {
        e.preventDefault()
        setForumPosts(allForumPosts.filter(post => post.title.toLowerCase().includes(input.toLowerCase())))
    }

  return (
    <div style={{textAlign: "center"}}>
        <Link to="/newpost"><button>Create new post</button></Link>
        <form onSubmit={handleSearch}>
        <input type="search" placeholder="Filter posts..." onChange={e => setInput(e.target.value)}></input>
        <button type="submit">Search</button>
        </form>
        <InfiniteScroll
        dataLength={forumPosts.length}
        next={() => setCount(count + 6)} 
        hasMore={true}
        >
        {forumPosts.map(post => <ForumPost key={post.id} post={post} userID={userID}/>)}
        </InfiniteScroll>
    </div>
  )
}

export default ForumPosts