import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ForumPost from './ForumPost'
import InfiniteScroll from 'react-infinite-scroll-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

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
          setUserPosts(filteredPosts)
          setAllUserPosts(filteredPosts)
        }
        handleFetch()
      }, [count])

      async function handleSearch(e) {
        e.preventDefault()
        setUserPosts(allUserPosts.filter(post => post.title.toLowerCase().includes(input.toLowerCase()) || post.body.toLowerCase().includes(input.toLowerCase()) || post.user.username.toLowerCase().includes(input.toLowerCase())))
    }

  return (
    <div style={{textAlign: "center"}} className="posts-container">
        <h3>Followed Posts</h3>
        <form onSubmit={handleSearch}>
        <input type="search" className="text-box" placeholder="Search posts" onChange={e => setInput(e.target.value)}></input>
        <button type="submit" style={{background: "transparent", border: "none"}}><FontAwesomeIcon className="icon" icon={faMagnifyingGlass} color="white"/></button>
        </form>
        <InfiniteScroll
        dataLength={userPosts.length}
        next={() => setCount(count + 6)} 
        hasMore={true}
        >
        <div className="posts-overflow">
        {userPosts.length === 0 ? <h4 style={{textShadow: "2px 2px grey"}}>No posts :(</h4> : userPosts.map(post => <ForumPost key={post.id} post={post} userID={userID}/>)}
        </div>
        </InfiniteScroll>
      <div className="bubbles">
      <div className="bubble" style={{background: "#FFA1A1"}}></div>
      <div className="bubble" style={{background: "#92BA92"}}></div>
      <div className="bubble" style={{background: "#9ADCFF"}}></div>
      <div className="bubble" style={{background: "#FFF89A"}}></div>
      <div className="bubble" style={{background: "#EEC373"}}></div>
      <div className="bubble" style={{background: "#E7FBBE"}}></div>
      <div className="bubble" style={{background: "#92A9BD"}}></div>
      <div className="bubble" style={{background: "#B983FF"}}></div>
      <div className="bubble" style={{background: "#949CDF"}}></div>
      <div className="bubble" style={{background: "#A0FFE6"}}></div>
      </div>
    </div>
  )
}

export default FollowedUserPosts