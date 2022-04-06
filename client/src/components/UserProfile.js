import React, { useState, useEffect } from "react";
import axios from "axios";

function UserProfile() {
  const [userID, setUserID] = useState("")
  const [userEmotions, setUserEmotions] = useState([])
  const [userResponses, setUserResponses] = useState([])

  useEffect(() => {
    async function handleFetch() {
      const user = await axios.get("/me")
      setUserID(user.data.id)

      const emotions = await axios.get("/emotions")
      setUserEmotions(emotions.data.filter(emotion => emotion.user_id === user.data.id))

      const responses = await axios.get("/responses")
      const currentDate = String(new Date().getFullYear()).padStart(2, "0") + "-" + String(new Date().getMonth()+1).padStart(2, "0") + "-" + String(new Date().getDate()).padStart(2, "0")
      setUserResponses(responses.data.find(response => response.user_id === user.data.id && response.created_at.slice(0, 10) ===  currentDate))

      const axiosInstance = axios.create({
        headers: {
            Accept: "application/json",
            Authorization: "Bearer BQCFeHF8L9EvCOj_mUVPkzrDbhMpUIOdN3Tm3grRVU4yuHwC4BknhNaUY-24-6SaoFwbQv0gPhhy3ddYihQFseD8BXlOx70MJivCfiGHqM9MRtSHsgodUfna3xjU2SDZ-VTHJm9RtQqXphklJOlC-UT5QNeFveT6_tBQCP3GeAs1ikUb33_0PYR-p8vqqIN7V7HMNEPv8lNC_3_s2w",
            "Content-Type": "application/json"
        }
      })
      const songURI = await axios.all([axiosInstance.get("https://api.spotify.com/v1/search?q=justin%20bieber&type=track&market=us&limit=5")])
      // console.log(songURI[0].data.tracks.items)
    }
    handleFetch()
  }, [])

  // console.log(userResponses.color)

  return <div>
    {userResponses ? <p>{userResponses.color}</p> : <p>You did not chose a color today.</p>}
  </div>
}

export default UserProfile;
