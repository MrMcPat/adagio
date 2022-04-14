import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ForumPost from './ForumPost'
import { Link } from "react-router-dom"
import InfiniteScroll from 'react-infinite-scroll-component'

function FollowedUserPosts() {
    const [userID, setUserID] = useState([])
    const [userPosts, setUserPosts] = useState([])
    const [allUserPosts, setAllUserPosts] = useState([])
    const [count, setCount] = useState(7)
    const [input, setInput] = useState("")

    useEffect(() => {
        async function handleFetch() {
          const userData = await axios.get("/me")
          const followData = await axios.get("/follows")
          const followedUsers = followData.data.filter(follow => follow.user_id === userData.data.id)
          const userPostData = await axios.get("/posts")
          const filteredPosts = userPostData.data.filter(post => followedUsers.filter(follow => follow.followed_user_id === post.user_id).length !== 0)
          setUserPosts(filteredPosts.slice(0, count))
          setAllUserPosts(filteredPosts)
        }
        handleFetch()
      }, [count])

      async function handleSearch(e) {
        e.preventDefault()
        setUserPosts(allUserPosts.filter(post => post.title.toLowerCase().includes(input.toLowerCase()) || post.body.toLowerCase().includes(input.toLowerCase()) || post.user.username.toLowerCase().includes(input.toLowerCase())))
    }

  return (
    <div style={{textAlign: "center"}}>
        <Link to="/newpost"><button>Create new post</button></Link>
        <form onSubmit={handleSearch}>
        <input type="search" placeholder="Search posts" onChange={e => setInput(e.target.value)}></input>
        <button type="submit">Search</button>
        </form>
        <InfiniteScroll
        dataLength={userPosts.length}
        next={() => setCount(count + 6)} 
        hasMore={true}
        >
        {userPosts.map(post => <ForumPost key={post.id} post={post} userID={userID}/>)}
        </InfiniteScroll>
    </div>
  )
}

export default FollowedUserPosts