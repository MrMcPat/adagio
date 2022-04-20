import React from 'react'
import { Link } from "react-router-dom"

function DailyLyricResponses({response, userID}) {

  if (!response) return null
  return (
    <div className="responses">
    <p><span style={{background: `${response.color}`, borderRadius: "20px", border:`3px solid rgba(26, 25, 25, 0.2)`, cursor: "default"}}>&nbsp;&nbsp;&nbsp;&nbsp;</span> {response.response}</p>
    {userID === response.user_id ? <p>{response.user.username}(You)</p> : <Link to={`/user/${response.user.username}`} style={{textDecoration: "none", color: "white"}}><p>{response.user.username}</p></Link>}
    <p>{`-${response.created_at.slice(0, 16).split("T")[0]}, ${response.created_at.slice(0, 16).split("T")[1]}`}</p>
    </div>
  )
}

export default DailyLyricResponses