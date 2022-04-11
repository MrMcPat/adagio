import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ExploreJournalEntry from './ExploreJournalEntry'

function ExploreJournalEntries() {
  const [journalEntries, setJournalEntries] = useState([])

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
    }
    handleFetch()
  }, [])

  async function handleSearch(e) {
    if (e.target.value.length > 0) {
      setJournalEntries(journalEntries.filter(entry => entry.title.toLowerCase().includes(e.target.value.toLowerCase())))
    } else {
      const userData = await axios.get("/me")
      const allTriggers = await axios.get("/triggers")
      const userTriggers = allTriggers.data.filter(trigger => trigger.user_id === userData.data.id)
      const allJournalEntries = await axios.get("/journal_entries/")
      const otherJournalEntries = allJournalEntries.data.filter(entry => entry.user_id !== userData.data.id && (entry.is_private === false && entry.user.journal_is_private === false))
      const filteredJournals = otherJournalEntries.filter(entry => {
        if (userTriggers.filter(trigger => entry.title.toLowerCase().includes(trigger.trigger.toLowerCase())).length === 0 || userTriggers.filter(trigger => entry.body.toLowerCase().includes(trigger.trigger.toLowerCase())).length === 0 ) {
          return true
        } else {
          return false
        }
      })
      setJournalEntries(filteredJournals)
    }
  }

  return (
    <div style={{textAlign: "center"}}>
      <h3>Explore journal entries</h3>
      <input onChange={handleSearch} placeholder="Search journals"></input>
      {journalEntries.map(entry => <ExploreJournalEntry key={entry.id} entry={entry}/>)}
    </div>
  )
}

export default ExploreJournalEntries