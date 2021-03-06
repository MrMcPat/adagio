import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import InfiniteScroll from 'react-infinite-scroll-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

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
    <div style={{textAlign: "center", background: "transparent"}} className="posts-container">
        <h3>Your Posts</h3>
        <form onSubmit={handleSearch}>
      <input type="search" className="text-box" onChange={e => setInput(e.target.value)} placeholder="Search posts"></input>
      <button type="submit" style={{background: "transparent", border: "none"}}><FontAwesomeIcon className="icon" icon={faMagnifyingGlass} color="white"/></button>
      </form>
        <InfiniteScroll
        dataLength={userPosts.length}
        next={() => setCount(count + 7)} 
        hasMore={true}
        >
        <div className="posts-overflow">
        {userPosts.length === 0 ? <h4 style={{textShadow: "2px 2px grey"}}>No posts :(</h4>
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

export default AllUserPosts