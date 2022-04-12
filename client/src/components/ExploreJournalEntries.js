import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ExploreJournalEntry from './ExploreJournalEntry'
import InfiniteScroll from 'react-infinite-scroll-component'

function ExploreJournalEntries() {
  const [journalEntries, setJournalEntries] = useState([])
  const [allJournalEntries, setAllJournalEntries] = useState([])
  const [count, setCount] = useState(2)
  const [input, setInput] = useState("")

  useEffect(() => {
    async function handleFetch() {
      const userData = await axios.get("/me")
      const allTriggers = await axios.get("/triggers")
      const userTriggers = allTriggers.data.filter(trigger => trigger.user_id === userData.data.id)
      const allJournalEntries = await axios.get("/journal_entries/")
      const otherJournalEntries = allJournalEntries.data.filter(entry => entry.user_id !== userData.data.id && (entry.is_private === false && entry.user.journal_is_private === false))
      const filteredJournals = otherJournalEntries.filter(entry => {
        if (userTriggers.filter(trigger => entry.title.toLowerCase().includes(trigger.trigger.toLowerCase())).length === 0) {
          return true
        } else {
          return false
        }
      })
      setJournalEntries(filteredJournals.slice(0, count))
      setAllJournalEntries(filteredJournals)
    }
    handleFetch()
  }, [count])

  async function handleSearch(e) {
    e.preventDefault()
    setJournalEntries(allJournalEntries.filter(post => post.title.toLowerCase().includes(input.toLowerCase())))
    setInput("")
  }

  return (
    <div style={{textAlign: "center"}}>
      <h3>Explore journal entries</h3>
      <form onSubmit={handleSearch}>
      <input type="search" onChange={e => setInput(e.target.value)} placeholder="Search journals"></input>
      <button type="submit">Search</button>
      </form>
      <InfiniteScroll
        dataLength={journalEntries.length}
        next={() => setCount(count + 2)} 
        hasMore={true}
        >
        {journalEntries.map(entry => <ExploreJournalEntry key={entry.id} entry={entry}/>)}
        </InfiniteScroll>

    </div>
  )
}

export default ExploreJournalEntries