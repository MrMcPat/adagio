import React, { useState, useEffect } from "react";
import axios from "axios";

function UserProfile() {
  useEffect(() => {
    async function handleFetch() {
      const axiosInstance = axios.create({
        headers: {
            Accept: "application/json",
            Authorization: "Bearer BQBVDQyC8osXzhwG7yJwBGCC_bMICTBn9YUHa-_pgBIIXrb-EcFjzAZ8lcvSzyV3AkYBhbE2P9hRUQt-fU_5AWGzdYhc2d5l18dRmdmkiX91uFCQKr4LPgglq5vlDiIT2cvQF-fu_5DvaI3dTcRJx59c2yVTSOSw56XENJ3Azyh40X7hY1Ol8fMt5a2NRlJ9lX4i3yJBKL4NUKMtqQ",
            "Content-Type": "application/json"
        }
      })
      const songURI = await axios.all([axiosInstance.get("https://api.spotify.com/v1/search?q=justin%20bieber&type=track&market=us&limit=5")])
      console.log(songURI[0].data.tracks.items)
    }
    handleFetch()
  }, [])
  return <div>UserProfile</div>
}

export default UserProfile;
