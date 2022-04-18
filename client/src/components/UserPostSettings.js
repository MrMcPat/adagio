import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"

function UserPostSettings() {
    const [userPosts, setUserPosts] = useState([])
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        async function handleFetch() {
            const userData = await axios.get("/me")
            const userPostData = await axios.get("/posts")
            setUserPosts(userPostData.data.filter(post => post.user_id === userData.data.id))
        }
        handleFetch()
    }, [])

    function handleDelete(e) {
        axios.delete(`/posts/${e.target.value}`)
        setUserPosts(userPosts.filter(post => post.id !== parseInt(e.target.value)))
    }

    function handleToggle() {
        setToggle(toggle => !toggle)
    }

    async function handleSearch(e) {
        if (e.target.value.length > 0) {
            setUserPosts(userPosts.filter(post => post.title.toLowerCase().includes(e.target.value.toLowerCase()) || post.updated_at.toLowerCase().includes(e.target.value.toLowerCase())))
        } else {
          const userData = await axios.get("/me")
          const userPostData = await axios.get("/posts")
          setUserPosts(userPostData.data.filter(post => post.user_id === userData.data.id))
        }
    }

  return (
    <div className="user-settings">
        <h2>Your Posts</h2>
        <button onClick={handleToggle}>Search</button>
        {toggle ? <input placeholder="Filter your posts." onChange={handleSearch}/> : null}
        {userPosts.length === 0 ? <p>No journal entries :(</p> 
      : userPosts.map(post => {
        return <div key={post.id}>
          <Link to={`/post/${post.id}`}><h3>{post.title}</h3></Link>
          <p>{post.created_at === post.updated_at ? 
          `-Created on ${post.created_at.slice(0, 16).split("T")[0]}, ${post.created_at.slice(0, 16).split("T")[1]}` :
          `-Updated on ${post.updated_at.slice(0, 16).split("T")[0]}, ${post.updated_at.slice(0, 16).split("T")[1]}`}</p>
          <Link to={`/post/${post.id}`}><button value={post.id}>Edit</button></Link>
          <button value={post.id} onClick={handleDelete}>Delete</button>
        </div>
      })}
    </div>
  )
}

export default UserPostSettings