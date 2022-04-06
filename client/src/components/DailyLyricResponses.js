import React from 'react'

function DailyLyricResponses({response}) {

  return (
    <>
    <p>{response.response}</p>
    <p>{response.user.username}</p>
    <p>{response.created_at}</p>
    </>
  )
}

export default DailyLyricResponses