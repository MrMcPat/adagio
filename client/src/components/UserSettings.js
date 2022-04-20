import React, {useState, useEffect} from 'react'
import axios from 'axios'
import UserAccountSettings from './UserAccountSettings'
import UserJournalSettings from './UserJournalSettings'
import UserPostSettings from './UserPostSettings'
import Modal from "react-bootstrap/Modal"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"
import placeholder from "../placeholder_img.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons"
import { ToastContainer, toast } from 'react-toastify'

function UserSettings() {
  const [userProfile, setUserProfile] = useState([])
  const [userColorList, setUserColorList] = useState([])
  const [userColor, setUserColor] = useState("#FFC0CB")
  const [userEmotion, setUserEmotion] = useState("")
  const [userTriggerList, setUserTriggerList] = useState([])
  const [userTrigger, setUserTrigger] = useState("")
  const [userJournalPrivate, setUserJournalPrivate] = useState(null)
  const [userMusicPrivate, setUserMusicPrivate] = useState(null)
  const [setting, setSetting] = useState(0)

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
      setUserMusicPrivate(userData.data.favorite_songs_is_private)
      const userEmotionData = await axios.get("/emotions")
      setUserColorList(userEmotionData.data.filter(emotion => emotion.user_id === userData.data.id))
      const userTriggerData = await axios.get("/triggers")
      setUserTriggerList(userTriggerData.data.filter(trigger => trigger.user_id === userData.data.id))
    }
    handleFetch()
  }, [nameShow ||usernameShow || imageShow || descriptionShow])


  function handleNameChange(e) {
    e.preventDefault()
    axios.patch(`/users/${userProfile.id}`, {
      first_name: inputFirstName,
      last_name: inputLastName
    })
    alert("Name changed.")
    handleNameClose()
  }

  function handleImageChange(e) {
    e.preventDefault()
    axios.patch(`/users/${userProfile.id}`, {
      profile_picture: inputImage
    })
    alert("Profile picture changed.")
    handleImageClose()
  }

  function handleUsernameChange(e) {
    e.preventDefault()
    axios.patch(`/users/${userProfile.id}`, {
      username: inputUsername
    })
    alert("Username changed.")
    handleUsernameClose()
  }

  function handleDescriptionChange(e) {
    e.preventDefault()
    axios.patch(`/users/${userProfile.id}`, {
      description: inputDescription
    })
    alert("Description changed.")
    handleDescriptionClose()
  }
  
  function handleMusicChecked (e) {
    setUserMusicPrivate(e.target.checked)
    axios.patch(`/users/${userProfile.id}`, {
      favorite_songs_is_private: e.target.checked
    })
  }

  function handlePrivatedChecked (e) {
    setUserJournalPrivate(e.target.checked)
    axios.patch(`/users/${userProfile.id}`, {
      journal_is_private: e.target.checked
    })
  }

  function handleEmotionSubmit(e) {
    e.preventDefault()
    if (userEmotion.length === 0) {
      toast.error("Please include an emotion", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
    } else {
      axios.post("/emotions", {
        user_id: userProfile.id,
        color: userColor,
        emotion: userEmotion
      })
      .then(resp => setUserColorList([...userColorList, resp.data]))
      .catch(err => 
        toast.error(err.response.data.errors[0], {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          }))
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
      toast.error("Please include a trigger word.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
    } else {
      axios.post("/triggers", {
        user_id: userProfile.id,
        trigger: userTrigger
      })
      .then(resp => setUserTriggerList([...userTriggerList, resp.data]))
      .catch(err =>
        toast.error(err.response.data.errors[0], {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          }))
      setUserTrigger("")
    }
  }

  function handleTriggerDelete(e) {
    axios.delete(`/triggers/${e.target.value}`)
    setUserTriggerList(userTriggerList.filter(trigger => trigger.id !== parseInt(e.target.value)))
  }

  function handleToken() {
    window.location = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=token&scope=streaming user-read-email user-modify-playback-state user-read-private user-read-private user-read-playback-state&show_dialog=true&redirect_uri=http://localhost:4000/callback`
  }

  const handleSetting0 = () => setSetting(0)
  const handleSetting1 = () => setSetting(1)
  const handleSetting2 = () => setSetting(2)
  const handleSetting3 = () => setSetting(3)
  const handleSetting4 = () => setSetting(4)
  const handleSetting5 = () => setSetting(5)

  return (
    <div style={{textAlign: "center"}} className="user-settings-container">
    <div className="user-settings-menu">
      <h5 onClick={handleSetting0} style={{color: `${setting === 0 ? "white" : "grey"}`}}>Profile Settings</h5><br />
      <h5 onClick={handleSetting1} style={{color: `${setting === 1 ? "white" : "grey"}`}}>Account Settings</h5><br />
      <h5 onClick={handleSetting2} style={{color: `${setting === 2 ? "white" : "grey"}`}}>Privacy Settings</h5><br />
      <h5 onClick={handleSetting3} style={{color: `${setting === 3 ? "white" : "grey"}`}}>Color/Trigger Settings</h5><br />
      <h5 onClick={handleSetting4} style={{color: `${setting === 4 ? "white" : "grey"}`}}>Journal Settings</h5><br />
      <h5 onClick={handleSetting5} style={{color: `${setting === 5 ? "white" : "grey"}`}}>Posts Settings</h5><br />
      <h5 onClick={handleToken} style={{color: "#1cb954"}}>Refresh music player token</h5><br />
    </div>

    {setting === 0 ? <div className="user-settings">
    <span>{userProfile.first_name} {userProfile.last_name}</span>
    <button className="default-button" onClick={handleNameShow}>Change Name</button><br />
    <img src={userProfile.profile_picture ? userProfile.profile_picture : placeholder} alt="profile picture" style={{width: "100px", height: "100px", borderRadius: "50%"}}/>
    <button className="default-button" onClick={handleImageShow}>Add/Edit Profile Picture</button>
    <p>{userProfile.description}</p>
    <button className="default-button" onClick={handleDescriptionShow}>Change your description</button><br />
    </div> : null}

    {setting === 1 ? <div className="user-settings">
    <span>Username: {userProfile.username}</span>
    <button className="default-button" onClick={handleUsernameShow}>Change Username</button> <br />
    <UserAccountSettings />
    </div> : null}

    {setting === 2 ? <div className="user-settings">
    <label>Private your music playlists?</label>
    <input type="checkbox" checked={userMusicPrivate || ""} onChange={handleMusicChecked} /><br />
    <label>Private all journal entries?</label>
    <input type="checkbox" checked={userJournalPrivate || ""} onChange={handlePrivatedChecked}/>
    </div> : null}

    {setting === 3 ? <div className="user-settings">
    <p>Your colors:</p>
    {userColorList.map(emotion => {
      return <div key={emotion.id}>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip style={{fontSize: "15px"}}>
          {emotion.emotion}
          </Tooltip>}
        >
        <span style={{background: `${emotion.color}`, borderRadius: "20px", border:`3px solid rgba(26, 25, 25, 0.2)`, margin: "5px"}}>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </OverlayTrigger>
        <button style={{background: "transparent", border: "none"}} value={emotion.id} onClick={handleEmotionDelete}><FontAwesomeIcon icon={faXmarkCircle} color="#B20600"/></button>
        </div>
    })}
    <form onSubmit={handleEmotionSubmit}>
    <input value={userEmotion} onChange={e => setUserEmotion(e.target.value)}></input>
    <input type="color" value={userColor} onChange={e => setUserColor(e.target.value)}></input>
    <button className="default-button" type="submit">Add a color</button>
    </form>
    <p>Your triggers:</p>
    {userTriggerList.map(trigger => {
      return <div key={trigger.id}>
        <span>{trigger.trigger}</span>
        <button style={{background: "transparent", border: "none"}} value={trigger.id} onClick={handleTriggerDelete}><FontAwesomeIcon icon={faXmarkCircle} color="#B20600"/></button>
        </div>
    })}
    <form onSubmit={handleTriggerSubmit}>
      <input value={userTrigger} onChange={e => setUserTrigger(e.target.value)}></input>
      <button className="default-button" type="submit">Add a trigger</button>
    </form>
    </div> : null}

    {setting === 4 ? <UserJournalSettings /> : null}
    
    {setting === 5 ? <UserPostSettings /> : null}

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
            <FormControl onChange={e => {setInputUsername(e.target.value)}} />
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

      <ToastContainer
        theme="dark"
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
  </div>
  )
}

export default UserSettings