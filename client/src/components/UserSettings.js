import React, {useState, useEffect} from 'react'
import axios from 'axios'
import UserAccountSettings from './UserAccountSettings'
import UserJournalSettings from './UserJournalSettings'
import UserPostSettings from './UserPostSettings'
import Modal from "react-bootstrap/Modal"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"

function UserSettings() {
  const [userProfile, setUserProfile] = useState([])
  const [userColorList, setUserColorList] = useState([])
  const [userColor, setUserColor] = useState("#FFC0CB")
  const [userEmotion, setUserEmotion] = useState("")
  const [userTriggerList, setUserTriggerList] = useState([])
  const [userTrigger, setUserTrigger] = useState("")
  const [userJournalPrivate, setUserJournalPrivate] = useState(null)

  const [nameShow, setNameShow] = useState(false)
  const [usernameShow, setUsernameShow] = useState(false)
  const [imageShow, setImageShow] = useState(false)
  const [descriptionShow, setDescriptionShow] = useState(false)

  const [inputFirstName, setInputFirstName] = useState("")
  const [inputLastName, setInputLastName] = useState("")
  const [inputUsername, setInputUsername] = useState("")
  const [inputImage, setInputImage] = useState("")
  const [inputDescription, setInputDescription] = useState(false)

  const handleNameClose = () => setNameShow(false)
  const handleNameShow = () => setNameShow(true)
  const handleUsernameClose = () => setUsernameShow(false)
  const handleUsernameShow = () => setUsernameShow(true)
  const handleImageClose = () => setImageShow(false)
  const handleImageShow = () => setImageShow(true)
  const handleDescriptionClose = () => setDescriptionShow(false)
  const handleDescriptionShow = () => setDescriptionShow(true)


  useEffect(() => {
    async function handleFetch() {
      const userData = await axios.get("/me")
      setUserProfile(userData.data)
      setUserJournalPrivate(userData.data.journal_is_private)
      const userEmotionData = await axios.get("/emotions")
      setUserColorList(userEmotionData.data.filter(emotion => emotion.user_id === userData.data.id))
      const userTriggerData = await axios.get("/triggers")
      setUserTriggerList(userTriggerData.data.filter(trigger => trigger.user_id === userData.data.id))
    }
    handleFetch()
  }, [])


  function handleNameChange(e) {
    handleNameClose()
    axios.patch(`/users/${userProfile.id}`, {
      first_name: inputFirstName,
      last_name: inputLastName
    })
  }

  function handleImageChange(e) {
    handleImageClose()
    axios.patch(`/users/${userProfile.id}`, {
      profile_picture: inputImage
    })
  }

  function handleUsernameChange(e) {
    handleUsernameClose()
    axios.patch(`/users/${userProfile.id}`, {
      username: inputUsername
    })
  }

  function handleDescriptionChange(e) {
    handleDescriptionClose()
    axios.patch(`/users/${userProfile.id}`, {
      description: inputDescription
    })
  }

  function handleChecked (e) {
    setUserJournalPrivate(e.target.checked)
    axios.patch(`/users/${userProfile.id}`, {
      journal_is_private: e.target.checked
    })
  }

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
    <span>{userProfile.first_name} {userProfile.last_name}</span>
    <button onClick={handleNameShow}>Change Name</button><br />
    <span>Username: {userProfile.username}</span>
    <button onClick={handleUsernameShow}>Change Username</button> <br />
    <UserAccountSettings />
    <img src={userProfile.profile_picture} alt="profile picture" style={{width: "100px", height: "100px", borderRadius: "50%"}}/>
    <button onClick={handleImageShow}>Add/Edit Profile Picture</button>
    <p>{userProfile.description}</p>
    <button onClick={handleDescriptionShow}>Change your description</button><br />
    <label>Private all journals?</label>
    <input type="checkbox" checked={userJournalPrivate || ""} onChange={handleChecked}/>
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
      <button type="submit">Add a trigger</button>
    </form>
    <UserJournalSettings />
    <UserPostSettings />

    <Modal show={nameShow} onHide={handleNameClose} style={{ textAlign: "center" }} centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>Change your name</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleNameChange}>
          <Modal.Body>
            <InputGroup>
            <InputGroup.Text>Your first name</InputGroup.Text>
            <FormControl onChange={e => setInputFirstName(e.target.value)} />
            <InputGroup.Text>Your last name</InputGroup.Text>
            <FormControl onChange={e => setInputLastName(e.target.value)} />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <button className="setting-button" style={{ marginLeft: "6px", background: "#94B49F" }} type="submit">Save Changes</button>
          </Modal.Footer>
        </form>
      </Modal>

    <Modal show={usernameShow} onHide={handleUsernameClose} style={{ textAlign: "center" }} centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>Change Username</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleUsernameChange}>
          <Modal.Body>
            <InputGroup>
            <InputGroup.Text>New Username</InputGroup.Text>
            <FormControl onChange={e => setInputUsername(e.target.value)} />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <button className="setting-button" style={{ marginLeft: "6px", background: "#94B49F" }} type="submit">Save Changes</button>
          </Modal.Footer>
        </form>
      </Modal>

    <Modal show={imageShow} onHide={handleImageClose} style={{ textAlign: "center" }} centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>Change Profile Picture</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleImageChange}>
          <Modal.Body>
            <InputGroup>
            <InputGroup.Text>New Profile Picture</InputGroup.Text>
            <FormControl onChange={e => setInputImage(e.target.value)} />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <button className="setting-button" style={{ marginLeft: "6px", background: "#94B49F" }} type="submit">Save Changes</button>
          </Modal.Footer>
        </form>
      </Modal>

      <Modal show={descriptionShow} onHide={handleDescriptionClose} style={{ textAlign: "center" }} centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>Change Description</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleDescriptionChange}>
          <Modal.Body>
            <InputGroup>
            <InputGroup.Text>New Description</InputGroup.Text>
            <FormControl onChange={e => setInputDescription(e.target.value)} />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <button className="setting-button" style={{ marginLeft: "6px", background: "#94B49F" }} type="submit">Save Changes</button>
          </Modal.Footer>
        </form>
      </Modal>

  </div>
  )
}

export default UserSettings