import React, {useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Callback({getToken}) {

    useEffect(() => {
      getToken(window.location.hash.substring(14).split("&")[0])
    }, [])

  return (
    <div style={{textAlign: "center"}}>
      <Link to="/dailylyric"><button>Continue</button></Link>
    </div>
  )
}

export default Callback