import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import InfiniteScroll from 'react-infinite-scroll-component'
import { useParams } from "react-router-dom"

function OtherUserJournalEntries() {
  const [userProfile, setUserProfile] = useState([])
  const [userJournalEntries, setUserJournalEntries] = useState([])
  const [allUserJournalEntries, setAllUserJournalEntries] = useState([])
  const [input, setInput] = useState("")
  const [count, setCount] = useState(7)
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
  <div style={{textAlign: "center"}} className="explore-page-container">
      <h3>Journal Entries</h3>
      <form onSubmit={handleSearch}>
    <input type="search" onChange={e => setInput(e.target.value)} placeholder="Search journals"></input>
    <button type="submit">Search</button>
    </form>
      <InfiniteScroll
      dataLength={userJournalEntries.length}
      next={() => setCount(count + 7)} 
      hasMore={true}
      >
      <div className="journal-entries-container">
      {userJournalEntries.length === 0 ? <p>No journal entries :(</p> 
    : userJournalEntries.map(entry => {
      return <div key={entry.id} className="journal-entry">
        <Link to={`/journalentry/${entry.id}`}><h5>{entry.title}</h5></Link>
        <p>{entry.is_private || userProfile.journal_is_private ? "Marked as private" : "Public"}</p>
        <div className="journal-entry-body">
        <p>{`${entry.body.substring(0, 100)}...`}</p>
        <p>{entry.created_at === entry.updated_at ? 
        `-Created on ${entry.created_at.slice(0, 16).split("T")[0]}, ${entry.created_at.slice(0, 16).split("T")[1]}` :
        `-Updated on ${entry.updated_at.slice(0, 16).split("T")[0]}, ${entry.updated_at.slice(0, 16).split("T")[1]}`}</p>
        <span>❤️{entry.heart_count} 🙏{entry.praying_count} 😮{entry.shocked_count} 😞{entry.sad_count}</span>
        </div>
      </div>
    })}
      </div>
      </InfiniteScroll>

  </div>
)
}

export default OtherUserJournalEntries