import React, {useState} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { faHandsPraying } from "@fortawesome/free-solid-svg-icons"
import { faFaceSurprise } from "@fortawesome/free-solid-svg-icons"
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons"

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
        {entry.body.length > 50 ? <p>{`${entry.body.substring(0, 50)}...`}</p> : <p>{entry.body}</p>}
        <p>{entry.is_private || entry.user.journal_is_private ? "Marked as private" : "Public"}</p>
          <p>{entry.created_at === entry.updated_at ? 
          `-Created on ${entry.created_at.slice(0, 16).split("T")[0]}, ${entry.created_at.slice(0, 16).split("T")[1]}` :
          `-Updated on ${entry.updated_at.slice(0, 16).split("T")[0]}, ${entry.updated_at.slice(0, 16).split("T")[1]}`}</p>
         <p><span>by <Link to={`/user/${entry.user.username}`} style={{textDecoration: "none", color: "gray"}}>{entry.user.username} </Link></span><br /><br />
         <button onClick={handleHeart}><FontAwesomeIcon className="icon" icon={faHeart} color="#F24A72" style={{fontSize: "25px"}}/></button>{heartCount}
         <button onClick={handlePraying}><FontAwesomeIcon className="icon" icon={faHandsPraying} color="#FFD124" style={{fontSize: "25px"}}/></button>{prayingCount}
         <button onClick={handleShocked}><FontAwesomeIcon className="icon" icon={faFaceSurprise} color="#FFD124" style={{fontSize: "25px"}}/></button>{shockedCount}
         <button onClick={handleSad}><FontAwesomeIcon className="icon" icon={faFaceFrown} color="#FFD124" style={{fontSize: "25px"}}/></button>{sadCount}
         </p>
        </div>
    </div>
  )
}

export default ExploreJournalEntry