import React, {useState} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"

function ExploreJournalEntry({entry}) {
    const [heartCount, setHeartCount] = useState(entry.heart_count)
    const [prayingCount, setPrayingCount] = useState(entry.praying_count)
    const [shockedCount, setShockedCount] = useState(entry.shocked_count)
    const [sadCount, setSadCount] = useState(entry.sad_count)

    function handleHeart() {
        setHeartCount(heartCount + 1)
        axios.patch(`/journal_entries/${entry.id}`, {
            heart_count: heartCount + 1
        })
    }

    function handlePraying() {
        setPrayingCount(prayingCount + 1)
        axios.patch(`/journal_entries/${entry.id}`, {
            praying_count: prayingCount + 1
        })
    }

    function handleShocked() {
        setShockedCount(shockedCount + 1)
        axios.patch(`/journal_entries/${entry.id}`, {
            shocked_count: shockedCount + 1
        })
    }

    function handleSad() {
        setSadCount(sadCount + 1)
        axios.patch(`/journal_entries/${entry.id}`, {
            sad_count: sadCount + 1
        })
    }

  return (
    <div className="journal-entry">
        <h5><Link to={`/journalentry/${entry.id}`} style={{textDecoration: "none", color: "white"}}><span>{entry.title}</span></Link></h5>
        <div className="journal-entry-body">
        <p>{`${entry.body.substring(0, 100)}...`}</p>
        <p>{entry.is_private || entry.user.journal_is_private ? "Marked as private" : "Public"}</p>
          <p>{entry.created_at === entry.updated_at ? 
          `-Created on ${entry.created_at.slice(0, 16).split("T")[0]}, ${entry.created_at.slice(0, 16).split("T")[1]}` :
          `-Updated on ${entry.updated_at.slice(0, 16).split("T")[0]}, ${entry.updated_at.slice(0, 16).split("T")[1]}`}</p>
         <p><span><Link to={`/user/${entry.user.username}`} style={{textDecoration: "none", color: "gray"}}>{entry.user.username}   </Link></span><button onClick={handleHeart}>❤️</button>{heartCount} <button onClick={handlePraying}>🙏</button>{prayingCount} <button onClick={handleShocked}>😮</button>{shockedCount} <button onClick={handleSad}>😞</button>{sadCount}</p>

        </div>
    </div>
  )
}

export default ExploreJournalEntry