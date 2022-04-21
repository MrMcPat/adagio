import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import InfiniteScroll from 'react-infinite-scroll-component'
import { useParams } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

function OtherUserJournalEntries() {
  const [userProfile, setUserProfile] = useState([])
  const [userJournalEntries, setUserJournalEntries] = useState([])
  const [allUserJournalEntries, setAllUserJournalEntries] = useState([])
  const [input, setInput] = useState("")
  const [count, setCount] = useState(6)
  const { username } = useParams()

  useEffect(() => {
      async function handleFetch() {
        const userData = await axios.get("/users")
        const user = userData.data.find(user => user.username === username)
        setUserProfile(user)
        const userJournalEntryData = await axios.get("/journal_entries")
        setUserJournalEntries(userJournalEntryData.data.filter(entry => entry.user_id === user.id))
        setAllUserJournalEntries(userJournalEntryData.data.filter(entry => entry.user_id === user.id))
      }
      handleFetch()
    }, [count])

    async function handleSearch(e) {
      e.preventDefault()
      setUserJournalEntries(allUserJournalEntries.filter(entry => entry.title.toLowerCase().includes(input.toLowerCase())))
      setInput("")
    }

return (
  <div style={{textAlign: "center", background: "transparent"}} className="explore-page-container">
      <h3>{username}'s journal entries</h3>
      <form onSubmit={handleSearch} style={{padding: "20px"}}>
    <input type="search" className="text-box" onChange={e => setInput(e.target.value)} placeholder="Search journals"></input>
    <button type="submit" style={{background: "transparent", border: "none"}}><FontAwesomeIcon className="icon" icon={faMagnifyingGlass} color="white"/></button>
    </form>
      <InfiniteScroll
      dataLength={userJournalEntries.length}
      next={() => setCount(count + 6)} 
      hasMore={true}
      >
      <div className="journal-entries-container">
      {userJournalEntries.length === 0 ? <h4 style={{textShadow: "2px 2px grey"}}>No journal entries from {username}:(</h4> 
    : userJournalEntries.map(entry => {
      return <div key={entry.id} className="journal-entry">
        <Link to={`/journalentry/${entry.id}`} style={{textDecoration: "none", color: "white"}}><h5>{entry.title}</h5></Link>
        <div className="journal-entry-body">
        <p>{`${entry.body.substring(0, 100)}...`}</p>
        <p>{entry.created_at === entry.updated_at ? 
        `-Created on ${entry.created_at.slice(0, 16).split("T")[0]}, ${entry.created_at.slice(0, 16).split("T")[1]}` :
        `-Updated on ${entry.updated_at.slice(0, 16).split("T")[0]}, ${entry.updated_at.slice(0, 16).split("T")[1]}`}</p>
        <p>{entry.is_private || userProfile.journal_is_private ? "Marked as private" : "Public"}</p>
        <span>❤️{entry.heart_count} 🙏{entry.praying_count} 😮{entry.shocked_count} 😞{entry.sad_count}</span>
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

export default OtherUserJournalEntries