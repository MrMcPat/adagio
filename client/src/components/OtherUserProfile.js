import React, { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom'
import OtherUserPlaylist from "./OtherUserPlaylist"
import MusicPlayer from "./MusicPlayer"

function OtherUserProfile({token}) {
    const [userProfile, setUserProfile] = useState([])
    const [userEmotions, setUserEmotions] = useState([])
    const [userJournalEntries, setUserJournalEntries] = useState([])
    const [userPosts, setUserPosts] = useState([])
    const [spotifyUri, setSpotifyUri] = useState("spotify:track:64FzSxCxQ0cBlktqiMQBey")
    const [hide, setHide] = useState(true)
    const { username } = useParams()

    useEffect(() => {
        async function handleFetch() {
            const userData = await axios.get("/users")
            const filteredUser = userData.data.find(user => user.username == username)
            setUserProfile(filteredUser)
            const emotionData = await axios.get("/emotions")
            setUserEmotions(emotionData.data.filter(emotion => emotion.user_id === filteredUser.id))
            const journalData = await axios.get("/journal_entries")
            setUserJournalEntries(journalData.data.filter(entry => entry.user_id === filteredUser.id).slice(0, 5))
            const postData = await axios.get("/posts")
            setUserPosts(postData.data.filter(post => post.user_id === filteredUser.id).slice(0, 5))
        }
        handleFetch()
    }, [])

  return (
    <div style={{textAlign: "center"}}>
        <p>{userProfile.first_name} {userProfile.last_name}</p>
        <p>Username: {userProfile.username}</p>
        <img src={userProfile.profile_picture} alt="profile picture" style={{width: "100px", height: "100px", borderRadius: "50%"}}/>
        <p>{userProfile.description}</p>
        {hide ? (
            <div style={{ display: "none" }}>
              <MusicPlayer spotifyUri={spotifyUri} token={token}/>
            </div>
          ) : (
            <div>
              <MusicPlayer spotifyUri={spotifyUri} token={token}/>
            </div>
          )}
        {userEmotions.map(emotion => <OtherUserPlaylist key={emotion.id} emotion={emotion} setSpotifyUri={setSpotifyUri} setHide={setHide}/>)}
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

export default OtherUserProfile