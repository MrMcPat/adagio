import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"

function UserFollow({follow, onUnfollow}) {
    const [followedUser, setFollowedUser] = useState([])
    const [followDetails, setFollowDetails] = useState([])

    useEffect(() => {
        async function handleFetch() {
            const userData = await axios.get("/users")
            const followedUser = userData.data.find(user => user.id === follow.followed_user_id)
            setFollowedUser(followedUser)
            const followData = await axios.get("/follows")
            setFollowDetails(followData.data.find(follow => follow.followed_user_id === followedUser.id))
        }
        handleFetch()
    }, [])

    function handleDelete() {
        axios.delete(`/follows/${followDetails.id}`)
        onUnfollow(followDetails.id)
    }

  return (
    <>
    <p><Link to={`/user/${followedUser.username}`}>{followedUser.username}</Link> <button onClick={handleDelete}>Unfollow</button></p>
    </>
  )
}

export default UserFollow