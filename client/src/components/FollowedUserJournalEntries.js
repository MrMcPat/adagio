import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ExploreJournalEntry from './ExploreJournalEntry'
import InfiniteScroll from 'react-infinite-scroll-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

function FollowedUserJournalEntries() {
  const [userJournalEntries, setUserJournalEntries] = useState([])
  const [allUserJournalEntries, setAllUserJournalEntries] = useState([])
  const [input, setInput] = useState("")
  const [count, setCount] = useState(6)

  useEffect(() => {
    async function handleFetch() {
      const userData = await axios.get("/me")
      const followData = await axios.get("/follows")
      const followedUsers = followData.data.filter(follow => follow.user_id === userData.data.id)
      const userJournalEntryData = await axios.get("/journal_entries")
      const filteredJournalEntries = userJournalEntryData.data.filter(entry => followedUsers.filter(follow => follow.followed_user_id === entry.user_id).length !== 0)
      setUserJournalEntries(filteredJournalEntries)
      setAllUserJournalEntries(filteredJournalEntries)
    }
    handleFetch()
  }, [count])

  async function handleSearch(e) {
    e.preventDefault()
    setUserJournalEntries(allUserJournalEntries.filter(entry => entry.title.toLowerCase().includes(input.toLowerCase()) || entry.user.username.toLowerCase().includes(input.toLowerCase())))
    setInput("")
  }

  return (
    <div style={{textAlign: "center"}} className="explore-page-container">
      <h3>Followed journal entries</h3>
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
          {userJournalEntries.length === 0 ? <h4 style={{textShadow: "2px 2px grey"}}>No journal entries :(</h4> : <>{userJournalEntries.map(entry => <ExploreJournalEntry key={entry.id} entry={entry}/>)}</>}
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

export default FollowedUserJournalEntries