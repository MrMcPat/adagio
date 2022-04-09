import React from 'react'

function NewJournalEntry() {
  return (
    <div style={{textAlign: "center"}}>
      <h1>What are your thoughts...</h1>
      <form>
        <label>Journal Entry Title</label><br />
        <input></input><br />
        <label>Journal Entry Body</label><br/>
        <textarea rows="20" cols="100" style={{resize: "none"}}></textarea><br />
        <label>Private this journal entry</label>
        <input type="checkbox"/>
        <button type="submit">Submit Entry</button>
      </form>
    </div>
  )
}

export default NewJournalEntry