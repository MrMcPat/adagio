import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import InfiniteScroll from 'react-infinite-scroll-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

function AllUserJournalEntries() {
    const [userProfile, setUserProfile] = useState([])
    const [userJournalEntries, setUserJournalEntries] = useState([])
    const [allUserJournalEntries, setAllUserJournalEntries] = useState([])
    const [input, setInput] = useState("")
    const [count, setCount] = useState(6)

    useEffect(() => {
        async function handleFetch() {
          const userData = await axios.get("/me")
          setUserProfile(userData.data)
          const userJournalEntryData = await axios.get("/journal_entries")
          setUserJournalEntries(userJournalEntryData.data.filter(entry => entry.user_id === userData.data.id))
          setAllUserJournalEntries(userJournalEntryData.data.filter(entry => entry.user_id === userData.data.id))
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
        <h3>Your Journal Entries</h3>
        <form onSubmit={handleSearch} style={{padding: "20px"}}>
      <input type="search" className="text-box" onChange={e => setInput(e.target.value)} placeholder="Search journals"></input>
      <button type="submit" style={{background: "transparent", border: "none"}}><FontAwesomeIcon icon={faMagnifyingGlass} color="white"/></button>
      </form>
        <InfiniteScroll
        dataLength={userJournalEntries.length}
        next={() => setCount(count + 6)} 
        hasMore={true}
        >
          <div className="journal-entries-container">
        {userJournalEntries.length === 0 ? <h4 style={{textShadow: "2px 2px grey"}}>No journal entries :(</h4> 
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
      <div class="bubbles">
      <div class="bubble" style={{background: "#FFA1A1"}}></div>
      <div class="bubble" style={{background: "#92BA92"}}></div>
      <div class="bubble" style={{background: "#9ADCFF"}}></div>
      <div class="bubble" style={{background: "#FFF89A"}}></div>
      <div class="bubble" style={{background: "#EEC373"}}></div>
      <div class="bubble" style={{background: "#E7FBBE"}}></div>
      <div class="bubble" style={{background: "#92A9BD"}}></div>
      <div class="bubble" style={{background: "#B983FF"}}></div>
      <div class="bubble" style={{background: "#949CDF"}}></div>
      <div class="bubble" style={{background: "#A0FFE6"}}></div>
      </div>
    </div>
  )
}

export default AllUserJournalEntries