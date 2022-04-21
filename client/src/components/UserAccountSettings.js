import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Modal from "react-bootstrap/Modal"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"

function UserAccountSettings() {
  const [userProfile, setUserProfile] = useState([])

  const [emailShow, setEmailShow] = useState(false)
  const [inputEmail, setInputEmail] = useState("")
  const [passwordShow, setPasswordShow] = useState(false)
  const [oldPassword, setOldPassword] = useState("")
  const [inputPassword, setInputPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleEmailClose = () => setEmailShow(false)
  const handleEmailShow = () => setEmailShow(true)
  const handlePasswordClose = () => setPasswordShow(false)
  const handlePasswordShow = () => setPasswordShow(true)

  useEffect(() => {
    async function handleFetch() {
      const userData = await axios.get("/me")
      const userInfo = await axios.get("/users")
      setUserProfile(userInfo.data.find(user => user.id === userData.data.id))
    }
    handleFetch()
  }, [emailShow])

  function handleEmailChange(e) {
    e.preventDefault()
    axios.patch(`/users/${userProfile.id}`, {
      email: inputEmail
    })
    alert("Email changed.")
    handleEmailClose()
  }

  function handlePasswordChange(e) {
    e.preventDefault()
    handlePasswordClose()
    axios.patch(`/users/${userProfile.id}`, {
      old_password: oldPassword,
      password: inputPassword,
      password_confirmation: confirmPassword
    })
  }

  return (
    <div>
      <span>{userProfile.email}</span>
      <button className="default-button" onClick={handleEmailShow}>Change Email</button>
      <button className="default-button" onClick={handlePasswordShow}>Change Password</button>
      <Modal show={emailShow} onHide={handleEmailClose} style={{ textAlign: "center" }} centered={true}>
        <Modal.Header closeButton>
          <Modal.Title style={{color: "grey"}}>Change Email</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleEmailChange}>
          <Modal.Body>
            <InputGroup>
            <InputGroup.Text>New Email</InputGroup.Text>
            <FormControl onChange={e => setInputEmail(e.target.value)} />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <button className="setting-button" style={{ marginLeft: "6px", background: "#94B49F" }} type="submit">Save Changes</button>
          </Modal.Footer>
        </form>
      </Modal>

      <Modal show={passwordShow} onHide={handlePasswordClose} style={{ textAlign: "center" }} centered={true}>
          <Modal.Header closeButton>
            <Modal.Title style={{color: "grey"}}>Change password</Modal.Title>
          </Modal.Header>
          <form onSubmit={handlePasswordChange}>
            <Modal.Body>
              <InputGroup style={{padding: "10px"}}>
                <InputGroup.Text>Old Password</InputGroup.Text>
                <FormControl type="password" onChange={e => setOldPassword(e.target.value)} /><br />
              </InputGroup>
              <InputGroup style={{padding: "10px"}}>
                <InputGroup.Text>New Password</InputGroup.Text>
                <FormControl type="password" onChange={e => setInputPassword(e.target.value)} /><br />
              </InputGroup>
              <InputGroup style={{padding: "10px"}}>
                <InputGroup.Text>Confirm password</InputGroup.Text>
                <FormControl type="password" onChange={e => setConfirmPassword(e.target.value)} /><br />
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

export default UserAccountSettings