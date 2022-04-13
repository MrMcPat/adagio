import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'

function Callback({getToken}) {

    useEffect(() => {
      getToken(window.location.hash.substring(14).split("&")[0])
    }, [])

  return (
    <div style={{textAlign: "center"}}>
      <Link to="/dailylyric"><button>Inspirational lyric for the day!</button></Link>
      <Link to="/userprofile"><button>Go to User Profile</button></Link>
      <Link to="usersettings"><button>Go to User Settings</button></Link>
      <Link to="/journalentries"><button>Explore other journal entries</button></Link>
      <Link to="/forumposts"><button>Explore the forums</button></Link>
    </div>
  )
}

export default Callback