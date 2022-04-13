import React from 'react'
import { Link } from "react-router-dom"

function DailyLyricResponses({response, userID}) {

  return (
    <>
    <p><span style={{background: `${response.color}`}}>&nbsp;&nbsp;&nbsp;&nbsp;</span> {response.response}</p>
    {userID === response.user_id ? <p style={{fontWeight: "bolder"}}>{response.user.username}</p> : <Link to={`/user/${response.user.username}`}><p>{response.user.username}</p></Link>}
    <p>{`-${response.created_at.slice(0, 16).split("T")[0]}, ${response.created_at.slice(0, 16).split("T")[1]}`}</p>
    </>
  )
}

export default DailyLyricResponses