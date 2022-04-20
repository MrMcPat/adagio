import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import InfiniteScroll from 'react-infinite-scroll-component'

function AllUserPosts() {
    const [userPosts, setUserPosts] = useState([])
    const [allUserPosts, setAllUserPosts] = useState([])
    const [input, setInput] = useState("")
    const [count, setCount] = useState(7)

    useEffect(() => {
        async function handleFetch() {
          const userData = await axios.get("/me")
          const userPostData = await axios.get("/posts")
          setUserPosts(userPostData.data.filter(post => post.user_id === userData.data.id))
          setAllUserPosts(userPostData.data.filter(post => post.user_id === userData.data.id))
        }
        handleFetch()
      }, [count])

      async function handleSearch(e) {
        e.preventDefault()
        setUserPosts(allUserPosts.filter(post => post.title.toLowerCase().includes(input.toLowerCase())))
        setInput("")
      }

  return (
    <div style={{textAlign: "center"}} className="posts-container">
        <h3>Your Posts</h3>
        <form onSubmit={handleSearch}>
      <input type="search" onChange={e => setInput(e.target.value)} placeholder="Search posts"></input>
      <button type="submit">Search</button>
      </form>
        <InfiniteScroll
        dataLength={userPosts.length}
        next={() => setCount(count + 7)} 
        hasMore={true}
        >
        <div className="posts-overflow">
        {userPosts.length === 0 ? <p>No posts :</p>
      : userPosts.map(post => {
        return <div key={post.id} style={{margin: "20px auto"}}  className="forum-post">
          <div className="forum-title">
          <Link to={`/post/${post.id}`} style={{textDecoration: "none", color: "white"}}><h3>{post.title}</h3></Link>
          </div>
          <div style={{paddingTop: "30px"}}>
          <p>{post.body}</p>
          <p>{post.created_at === post.updated_at ? 
          `-Created on ${post.created_at.slice(0, 16).split("T")[0]}, ${post.created_at.slice(0, 16).split("T")[1]}` :
          `-Updated on ${post.updated_at.slice(0, 16).split("T")[0]}, ${post.updated_at.slice(0, 16).split("T")[1]}`}</p>
          </div>
        </div>
      })}
        </div>
        </InfiniteScroll>

    </div>
  )
}

export default AllUserPosts