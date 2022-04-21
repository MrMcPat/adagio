import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import UserFollow from './UserFollow'
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"
import placeholder from "../placeholder_img.png"

function UserProfile() {
  const [userProfile, setUserProfile] = useState([])
  const [userFollow, setUserFollow] = useState([])
  const [userColorList, setUserColorList] = useState([])
  const [userJournalEntries, setUserJournalEntries] = useState([])
  const [userPosts, setUserPosts] = useState([])

  useEffect(() => {
    async function handleFetch() {
      const userData = await axios.get("/me")
      setUserProfile(userData.data)
      const userEmotionData = await axios.get("/emotions")
      setUserColorList(userEmotionData.data.filter(emotion => emotion.user_id === userData.data.id))
      const userFollowData = await axios.get("follows")
      setUserFollow(userFollowData.data.filter(follow => follow.user_id === userData.data.id))
      const userJournalEntryData = await axios.get("/journal_entries")
      setUserJournalEntries(userJournalEntryData.data.filter(entry => entry.user_id === userData.data.id).slice(0, 3))
      const userPostData = await axios.get("/posts")
      setUserPosts(userPostData.data.filter(post => post.user_id === userData.data.id).slice(0, 3))
    }
    handleFetch()
  }, [])

  function handleUnfollow(followID) {
    setUserFollow(userFollow.filter(follow => follow.id !== followID))
  }

  return (
    <div style={{textAlign: "center"}} className="user-profile-container">
      <div className="user-details">
        <div className="user-details-header"></div>
      <img 
      src={userProfile.profile_picture ? userProfile.profile_picture : placeholder} 
      alt="profile picture" 
      style={{width: "100px", height: "100px", borderRadius: "50%", background: "grey"}}/>
      <h5>{userProfile.first_name} {userProfile.last_name}</h5>
      <p>Username: {userProfile.username}</p>
      <div className="profile-description">
      <p>{userProfile.description}</p>
      </div>
      <p>Your Colors:</p>
      <Link to="/musicrecommendations" style={{textDecoration: "none", color: "white", fontSize: "15px"}}><p>See your playlists</p></Link>
      <div className="profile-colors">
      {userColorList.map(emotion => {
      return <div key={emotion.id}>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip style={{fontSize: "15px"}}>
          {emotion.emotion}
          </Tooltip>}
          >
        <span style={{background: `${emotion.color}`, borderRadius: "20px", border:`3px solid rgba(26, 25, 25, 0.2)`, margin: "5px"}}>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </OverlayTrigger></div>
    })}
      </div>
    <div className="follows">
    <h5>Following</h5>
      <span>{userFollow.length} follow(s)</span><br />
      {userFollow.map(follow => <UserFollow key={follow.id} follow={follow} onUnfollow={handleUnfollow}/>)}
    </div>
      </div>
      <div>
      <div className="user-recent">
        <div className="user-recent-header">
        <h4>Your Recent Journal Entries</h4>
        </div>
        <div className="user-recent-body" style={{margin: "10px"}}>
        <Link to="/userjournalentries"><button className="default-button">See All Journal Entries</button></Link>
      {userJournalEntries.length === 0 ? <p>No journal entries :(</p> 
      : userJournalEntries.map(entry => {
        return <div key={entry.id} style={{margin: "10px"}}>
          <Link to={`/journalentry/${entry.id}`} style={{textDecoration: "none", color: "white"}}><strong>{entry.title}</strong></Link><br />
          <span>{entry.is_private || userProfile.journal_is_private ? "Marked as private" : "Public"}</span><br />
          <span>{entry.created_at === entry.updated_at ? 
          `-Created on ${entry.created_at.slice(0, 16).split("T")[0]}, ${entry.created_at.slice(0, 16).split("T")[1]}` :
          `-Updated on ${entry.updated_at.slice(0, 16).split("T")[0]}, ${entry.updated_at.slice(0, 16).split("T")[1]}`}</span><br />
          <span>❤️{entry.heart_count} 🙏{entry.praying_count} 😮{entry.shocked_count} 😞{entry.sad_count}</span>
        </div>
      })}
        </div>
      </div>
      <div className="user-recent">
        <div className="user-recent-header">
        <h4>Your Recent Posts</h4>
        </div>
        <div className="user-recent-body" style={{margin: "10px"}}>
        <Link to="/userposts"><button className="default-button">See All Posts</button></Link>
      {userPosts.length === 0 ? <p>No posts :(</p>
      : userPosts.map(post => {
        return <div key={post.id} style={{margin: "10px"}}>
          <Link to={`/post/${post.id}`} style={{textDecoration: "none", color: "white"}}><strong>{post.title}</strong></Link><br />
          <span>{post.body}</span><br />
          <span>{post.created_at === post.updated_at ? 
          `-Created on ${post.created_at.slice(0, 16).split("T")[0]}, ${post.created_at.slice(0, 16).split("T")[1]}` :
          `-Updated on ${post.updated_at.slice(0, 16).split("T")[0]}, ${post.updated_at.slice(0, 16).split("T")[1]}`}</span>
        </div>
      })}
        </div>
      </div>
      </div>
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

export default UserProfile