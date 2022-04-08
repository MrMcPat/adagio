import React, {useState, useEffect} from 'react'
import axios from 'axios'
import AccountSettings from './AccountSettings'

function UserSettings() {
  const [userProfile, setUserProfile] = useState([])
  const [userColorList, setUserColorList] = useState([])
  const [userColor, setUserColor] = useState("#008080")
  const [userEmotion, setUserEmotion] = useState("")
  const [userTriggerList, setUserTriggerList] = useState([])
  const [userTrigger, setUserTrigger] = useState("")


  useEffect(() => {
    async function handleFetch() {
      const userData = await axios.get("/me")
      setUserProfile(userData.data)
      const userEmotionData = await axios.get("/emotions")
      setUserColorList(userEmotionData.data.filter(emotion => emotion.user_id === userData.data.id))
      const userTriggerData = await axios.get("/triggers")
      setUserTriggerList(userTriggerData.data.filter(trigger => trigger.user_id === userData.data.id))
    }
    handleFetch()
  }, [])

  function handleEmotionSubmit(e) {
    e.preventDefault()
    if (userEmotion.length === 0) {
      alert("Please include an emotion.")
    } else {
      axios.post("/emotions", {
        user_id: userProfile.id,
        color: userColor,
        emotion: userEmotion
      })
      .then(resp => setUserColorList([...userColorList, resp.data]))
      setUserEmotion("")
    }
  }

  function handleEmotionDelete(e) {
    axios.delete(`/emotions/${e.target.value}`)
    setUserColorList(userColorList.filter(emotion => emotion.id !== parseInt(e.target.value)))
  }

  function handleTriggerSubmit(e) {
    e.preventDefault()
    if (userTrigger.length === 0) {
      alert("Please include a trigger")
    } else {
      axios.post("/triggers", {
        user_id: userProfile.id,
        trigger: userTrigger
      })
      .then(resp => setUserTriggerList([...userTriggerList, resp.data]))
      setUserTrigger("")
    }
  }

  function handleTriggerDelete(e) {
    axios.delete(`/triggers/${e.target.value}`)
    setUserTriggerList(userTriggerList.filter(trigger => trigger.id !== parseInt(e.target.value)))
  }

  return (
    <div style={{textAlign: "center"}}>
    <p>{userProfile.first_name} {userProfile.last_name}</p>
    <p>Username: {userProfile.username}</p>
    <img src={userProfile.profile_picture} alt="profile picture" style={{width: "100px", height: "100px", borderRadius: "50%"}}/>
    <p>{userProfile.description}</p>
    <p>Your colors:</p>
    {userColorList.map(emotion => {
      return <div key={emotion.id}>
        <span style={{background: `${emotion.color}`}}>&nbsp;&nbsp;&nbsp;&nbsp;</span>{emotion.emotion}
        <button value={emotion.id} onClick={handleEmotionDelete}>Delete</button>
        </div>
    })}
    <form onSubmit={handleEmotionSubmit}>
    <input value={userEmotion} onChange={e => setUserEmotion(e.target.value)}></input>
    <input type="color" value={userColor} onChange={e => setUserColor(e.target.value)}></input>
    <button type="submit">Add a color</button>
    </form>
    <p>Your triggers:</p>
    {userTriggerList.map(trigger => {
      return <div key={trigger.id}>
        <span>{trigger.trigger}</span>
        <button value={trigger.id} onClick={handleTriggerDelete}>Delete</button>
        </div>
    })}
    <form onSubmit={handleTriggerSubmit}>
      <input value={userTrigger} onChange={e => setUserTrigger(e.target.value)}></input>
      <button type="submit">Submit</button>
    </form>
    <AccountSettings userProfile={userProfile}/>
  </div>
  )
}

export default UserSettings