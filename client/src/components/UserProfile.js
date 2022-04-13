import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"

function UserProfile() {
  const [userProfile, setUserProfile] = useState([])
  const [userColorList, setUserColorList] = useState([])
  const [userJournalEntries, setUserJournalEntries] = useState([])
  const [userPosts, setUserPosts] = useState([])

  useEffect(() => {
    async function handleFetch() {
      const userData = await axios.get("/me")
      setUserProfile(userData.data)
      const userEmotionData = await axios.get("/emotions")
      setUserColorList(userEmotionData.data.filter(emotion => emotion.user_id === userData.data.id))
      const userJournalEntryData = await axios.get("/journal_entries")
      setUserJournalEntries(userJournalEntryData.data.filter(entry => entry.user_id === userData.data.id).slice(0, 5))
      const userPostData = await axios.get("/posts")
      setUserPosts(userPostData.data.filter(post => post.user_id === userData.data.id).slice(0, 5))
    }
    handleFetch()
  }, [])

  return (
    <div style={{textAlign: "center"}}>
      <p>{userProfile.first_name} {userProfile.last_name}</p>
      <p>Username: {userProfile.username}</p>
      <img src={userProfile.profile_picture} alt="profile picture" style={{width: "100px", height: "100px", borderRadius: "50%"}}/>
      <p>{userProfile.description}</p>
      <p>Your Colors:</p>
      {userColorList.map(emotion => {
      return <div key={emotion.id}><span style={{background: `${emotion.color}`}}>&nbsp;&nbsp;&nbsp;&nbsp;</span>{emotion.emotion}</div>
    })}
      <h2>Most Recent Journal Entries</h2>
      <Link to="/userjournalentries"><button>See All Journal Entries</button></Link>
      {userJournalEntries.length === 0 ? <p>No journal entries :(</p> 
      : userJournalEntries.map(entry => {
        return <div key={entry.id}>
          <Link to={`/journalentry/${entry.id}`}><h3>{entry.title}</h3></Link>
          <p>{entry.is_private || userProfile.journal_is_private ? "Marked as private" : "Public"}</p>
          <p>{entry.created_at === entry.updated_at ? 
          `-Created on ${entry.created_at.slice(0, 16).split("T")[0]}, ${entry.created_at.slice(0, 16).split("T")[1]}` :
          `-Updated on ${entry.updated_at.slice(0, 16).split("T")[0]}, ${entry.updated_at.slice(0, 16).split("T")[1]}`}</p>
          <span>❤️{entry.heart_count} 🙏{entry.praying_count} 😮{entry.shocked_count} 😞{entry.sad_count}</span>
        </div>
      })}
      <h2>Most Recent Posts</h2>
      <Link to="/userposts"><button>See All Posts</button></Link>
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
    </div>
  )
}

export default UserProfile