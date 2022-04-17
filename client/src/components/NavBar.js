import React, {useState, useEffect} from "react"
import axios from "axios"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Offcanvas from "react-bootstrap/Offcanvas"
import { NavLink, useHistory } from "react-router-dom"
import rightsidebarbutton from "../rightsidebarbutton.png"

function NavBar({ user, setUser }) {
  const [show, setShow] = useState(false)
  const [userProfile, setUserProfile] = useState([])
  let history = useHistory()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    async function handleFetch() {
      const userData= await axios.get("/me")
      setUserProfile(userData.data)
    }
    handleFetch()
  }, [])

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null)
        history.push("/")
        handleClose()
      }
    })
  }

  return (
    <>
      <Navbar height="20" className="navbar">
        <Container style={{paddingTop: "20px"}}>
        <NavLink to="/" style={{textDecoration: "none"}}>
          <h1>adagio</h1>
        </NavLink>
          {user ? (
            <>
              <div>

              <button onClick={handleShow} style={{background: "none", border: "none"}}><img src={rightsidebarbutton} style={{width: "35px"}} /></button>
              </div>
            </>
          ) : (
            <div>
              <NavLink to="/signup">Sign Up</NavLink>
              <NavLink to="/login">Login</NavLink>
            </div>
          )}
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose} placement="end" style={{background: "#191919"}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><img src={userProfile.profile_picture} style={{width: "100px", height: "100px", borderRadius: "50%"}}/><span>Signed in as: {userProfile.username}</span></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <NavLink to="/dailylyric"><p onClick={handleClose}>Daily Lyric</p></NavLink>
          <NavLink to="/musicrecommendations"><p onClick={handleClose}>Music Recommendations</p></NavLink>
          <NavLink to="/userprofile"><p onClick={handleClose}>User Profile</p></NavLink>
          <NavLink to="/usersettings"><p onClick={handleClose}>User Settings</p></NavLink>
          <NavLink to="/forumposts"><p onClick={handleClose}>Forums</p></NavLink>
          <NavLink to="/journalentries"><p onClick={handleClose}>Explore Journal Entries</p></NavLink>
          <NavLink to="/newjournalentry"><p onClick={handleClose}>+Create journal entry</p></NavLink>
          <NavLink to="/followedjournalentries"><p onClick={handleClose}>Followed Journal Entries</p></NavLink>
          <NavLink to="/followedposts"><p onClick={handleClose}>Followed Posts</p></NavLink>
          <button onClick={handleLogoutClick}>Logout</button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavBar
