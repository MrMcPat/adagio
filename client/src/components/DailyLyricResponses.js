import React from 'react'

function DailyLyricResponses({response}) {

  return (
    <>
    <p><span style={{background: `${response.color}`}}>&nbsp;&nbsp;&nbsp;&nbsp;</span> {response.response}</p>
    <p>{response.user.username}</p>
    <p>{`-${response.created_at.slice(0, 16).split("T")[0]}, ${response.created_at.slice(0, 16).split("T")[1]}`}</p>
    </>
  )
}

export default DailyLyricResponses