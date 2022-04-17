import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ExploreJournalEntry from './ExploreJournalEntry'
import InfiniteScroll from 'react-infinite-scroll-component'

function FollowedUserJournalEntries() {
  const [userJournalEntries, setUserJournalEntries] = useState([])
  const [allUserJournalEntries, setAllUserJournalEntries] = useState([])
  const [input, setInput] = useState("")
  const [count, setCount] = useState(4)

  useEffect(() => {
    async function handleFetch() {
      const userData = await axios.get("/me")
      const followData = await axios.get("/follows")
      const followedUsers = followData.data.filter(follow => follow.user_id === userData.data.id)
      const userJournalEntryData = await axios.get("/journal_entries")
      const filteredJournalEntries = userJournalEntryData.data.filter(entry => followedUsers.filter(follow => follow.followed_user_id === entry.user_id).length !== 0)
      setUserJournalEntries(filteredJournalEntries.slice(0, count))
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
      <form onSubmit={handleSearch}>
      <input type="search" onChange={e => setInput(e.target.value)} placeholder="Search journals"></input>
      <button type="submit">Search</button>
      </form>
      <InfiniteScroll
        dataLength={userJournalEntries.length}
        next={() => setCount(count + 2)} 
        hasMore={true}
        >
          <div className="journal-entries-container">
          {userJournalEntries.map(entry => <ExploreJournalEntry key={entry.id} entry={entry}/>)}
          </div>
        </InfiniteScroll>
    </div>
  )
}

export default FollowedUserJournalEntries