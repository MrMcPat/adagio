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
          setUserPosts(userPostData.data.filter(post => post.user_id === userData.data.id).slice(0, count))
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
    <div style={{textAlign: "center"}}>
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
        {userPosts.length === 0 ? <p>No posts :</p>
      : userPosts.map(post => {
        return <div key={post.id}>
          <Link to={`/post/${post.id}`}><h3>{post.title}</h3></Link>
          <p>{post.body}</p>
          <p>{post.created_at === post.updated_at ? 
          `-Created on ${post.created_at.slice(0, 16).split("T")[0]}, ${post.created_at.slice(0, 16).split("T")[1]}` :
          `-Updated on ${post.updated_at.slice(0, 16).split("T")[0]}, ${post.updated_at.slice(0, 16).split("T")[1]}`}</p>
        </div>
      })}
        </InfiniteScroll>

    </div>
  )
}

export default AllUserPosts