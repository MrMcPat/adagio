import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import ExploreJournalEntry from './ExploreJournalEntry'
import InfiniteScroll from 'react-infinite-scroll-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

function ExploreJournalEntries() {
  const [journalEntries, setJournalEntries] = useState([])
  const [allJournalEntries, setAllJournalEntries] = useState([])
  const [count, setCount] = useState(6)
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
      setJournalEntries(filteredJournals)
      setAllJournalEntries(filteredJournals)
    }
    handleFetch()
  }, [count])

  async function handleSearch(e) {
    e.preventDefault()
    setJournalEntries(allJournalEntries.filter(entry => entry.title.toLowerCase().includes(input.toLowerCase()) || entry.body.toLowerCase().includes(input.toLowerCase()) || entry.user.username.toLowerCase().includes(input.toLowerCase())))
    setInput("")
  }

  return (
    <div style={{textAlign: "center"}} className="explore-page-container">
      <h3>Explore journal entries</h3>
      <form onSubmit={handleSearch} style={{padding: "20px"}}>
      <Link to="/newjournalentry"><button style={{background: "transparent", border: "none"}}><FontAwesomeIcon icon={faPlus} color="white" style={{fontSize: "25px"}}/></button></Link>
      <input type="search" className="text-box" onChange={e => setInput(e.target.value)} placeholder="Search journals"></input>
      <button type="submit" style={{background: "transparent", border: "none"}}><FontAwesomeIcon icon={faMagnifyingGlass} color="white"/></button>
      </form>
      <InfiniteScroll
        dataLength={journalEntries.length}
        next={() => setCount(count + 6)} 
        hasMore={true}
        >
          <div className="journal-entries-container">
          {journalEntries.map(entry => <ExploreJournalEntry key={entry.id} entry={entry}/>)}
          </div>
        </InfiniteScroll>
    </div>
  )
}

export default ExploreJournalEntries