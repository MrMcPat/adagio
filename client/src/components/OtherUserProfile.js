import React, { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom'
import OtherUserPlaylist from "./OtherUserPlaylist"
import MusicPlayer from "./MusicPlayer"
import placeholder from "../placeholder_img.png"

function OtherUserProfile({token}) {
    const [userID, setUserID] = useState([])
    const [userProfile, setUserProfile] = useState([])
    const [userEmotions, setUserEmotions] = useState([])
    const [userJournalEntries, setUserJournalEntries] = useState([])
    const [userPosts, setUserPosts] = useState([])
    const [spotifyUri, setSpotifyUri] = useState("spotify:track:64FzSxCxQ0cBlktqiMQBey")
    const [hide, setHide] = useState(true)
    const [followed, setFollowed] = useState(null)
    const [toggle, setToggle] = useState(false)
    const [play, setPlay] = useState("")
    const { username } = useParams()

    useEffect(() => {
        async function handleFetch() {
            const user = await axios.get("/me")
            setUserID(user.data.id)
            const userData = await axios.get("/users")
            const filteredUser = userData.data.find(user => user.username == username)
            setUserProfile(filteredUser)
            const followData = await axios.get("/follows")
            setFollowed(followData.data.find(follow => follow.followed_user_id === filteredUser.id && follow.user_id === user.data.id))
            const emotionData = await axios.get("/emotions")
            setUserEmotions(emotionData.data.filter(emotion => emotion.user_id === filteredUser.id))
            const journalData = await axios.get("/journal_entries")
            setUserJournalEntries(journalData.data.filter(entry => entry.user_id === filteredUser.id).slice(0, 3))
            const postData = await axios.get("/posts")
            setUserPosts(postData.data.filter(post => post.user_id === filteredUser.id).slice(0, 3))
        }
        handleFetch()
    }, [toggle])

    function handleFollow() {
      axios.post("/follows", {
        user_id: userID,
        followed_user_id: userProfile.id
      })
      setToggle(toggle => !toggle)
    }

    function handleUnfollow() {
      axios.delete(`/follows/${followed.id}`)
      setToggle(toggle => !toggle)
    }

  return (
    <div style={{textAlign: "center" }} className="user-profile-container">
      <div className="other-details">
      <div className="other-details-header"></div>
      <img src={userProfile.profile_picture ? userProfile.profile_picture : placeholder} alt="profile picture" style={{width: "100px", height: "100px", borderRadius: "50%", background: "grey"}}/>
        <p>{userProfile.first_name} {userProfile.last_name}</p>
        <p>Username: {userProfile.username}</p>
        <div className="other-description">
        <p>{userProfile.description}</p>
        </div>
        <div style={{margin: "20px"}}>
        {followed ? <button className="default-button" onClick={handleUnfollow}>Unfollow</button>:<button className="default-button" onClick={handleFollow}>Follow</button>}
        </div>
      </div>
      <div className="other-music-container">
        <div className="other-music-header">
          <h3>{userProfile.username}'s colors/playlists</h3>
            <div>
              <MusicPlayer spotifyUri={spotifyUri} token={token}/>
            </div> 
        </div>
      <div className="other-music-body">
      {userProfile.favorite_songs_is_private ? <h3>This user's music playlist is made private.</h3> : userEmotions.map(emotion => <OtherUserPlaylist key={emotion.id} emotion={emotion} setSpotifyUri={setSpotifyUri} setHide={setHide} play={play} setPlay={setPlay}/>)}
      </div>
      </div>
      <div className="user-recent" style={{width: "580px"}}>
      <div className="user-recent-header">
        <h4>Most Recent Journal Entries</h4>
        </div>
        <div className="user-recent-body" style={{margin: "10px"}}>
      <Link to={`/user/${username}/journalentries`}><button className="default-button">See All Journal Entries</button></Link><hr />
      {userJournalEntries.length === 0 ? <p>No journal entries :(</p> 
      : userJournalEntries.map(entry => {
        return <div key={entry.id}>
          <Link to={`/journalentry/${entry.id}`} style={{textDecoration: "none", color: "white"}}><strong>{entry.title}</strong></Link><br />
          <span>{entry.is_private || userProfile.journal_is_private ? "Marked as private" : "Public"}</span><br />
          <span>{entry.created_at === entry.updated_at ? 
          `-Created on ${entry.created_at.slice(0, 16).split("T")[0]}, ${entry.created_at.slice(0, 16).split("T")[1]}` :
          `-Updated on ${entry.updated_at.slice(0, 16).split("T")[0]}, ${entry.updated_at.slice(0, 16).split("T")[1]}`}</span>
          <span> ❤️{entry.heart_count} 🙏{entry.praying_count} 😮{entry.shocked_count} 😞{entry.sad_count}</span><hr />
        </div>
      })}
      </div>
      </div>
      <div className="user-recent" style={{width: "580px"}}>
      <div className="user-recent-header">
        <h4>Most Recent Posts</h4>
        </div>
        <div className="user-recent-body" style={{margin: "10px"}}>
      <Link to={`/user/${username}/posts`} style={{textDecoration: "none", color: "white"}}><button className="default-button">See All Posts</button></Link><hr />
      {userPosts.length === 0 ? <p>No posts :</p>
      : userPosts.map(post => {
        return <div key={post.id}>
          <Link to={`/post/${post.id}`} style={{textDecoration: "none", color: "white"}}><strong>{post.title}</strong></Link><br />
          <span>{post.created_at === post.updated_at ? 
          `-Created on ${post.created_at.slice(0, 16).split("T")[0]}, ${post.created_at.slice(0, 16).split("T")[1]}` :
          `-Updated on ${post.updated_at.slice(0, 16).split("T")[0]}, ${post.updated_at.slice(0, 16).split("T")[1]}`}</span><hr />
        </div>
      })}
      </div>
      </div>
      <div className="bubbles" style={{height: "130%"}}>
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

export default OtherUserProfile