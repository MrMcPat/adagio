import React, {useState, useEffect} from "react"
import axios from "axios"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Offcanvas from "react-bootstrap/Offcanvas"
import { NavLink, useHistory } from "react-router-dom"
import rightsidebarbutton from "../rightsidebarbutton.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from "@fortawesome/free-solid-svg-icons"
import placeholder from "../placeholder_img.png"

function NavBar({ user, setUser }) {
  const [show, setShow] = useState(false)
  const [show2, setShow2] = useState(false)
  const [userProfile, setUserProfile] = useState([])
  let history = useHistory()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleClose2 = () => setShow2(false)
  const handleShow2 = () => setShow2(true)

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
        handleClose2()
      }
    })
  }

  return (
    <>
      <Navbar height="20" className="navbar">
        <Container style={{paddingTop: "20px"}}>
          <div>
          {user ? <button onClick={handleShow} style={{background: "none", border: "none", color: "white"}}><FontAwesomeIcon icon={faBars} style={{fontSize: "30px"}} /></button> : null}
        <NavLink to="/" style={{textDecoration: "none"}}><span style={{fontSize: "40px", textDecoration: "none", color: "white"}}>adagio</span></NavLink>        
          </div>
          {user ? (
              <button onClick={handleShow2} style={{background: "none", border: "none"}}><img src={rightsidebarbutton} style={{width: "35px"}} /></button>
          ) : (
            <div>
              <NavLink to="/signup" style={{fontSize: "20px", textShadow: "1px 1px grey", textDecoration: "none", color: "white", margin: "10px"}}>Sign Up</NavLink>
              <NavLink to="/login" style={{fontSize: "20px", textShadow: "1px 1px grey", textDecoration: "none", color: "white", margin: "10px"}}>Login</NavLink>
            </div>
          )}
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose} placement="start" style={{background: "#191919"}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><NavLink to="/" style={{textDecoration: "none", color: "white", textDecoration: "none"}}><span style={{fontSize: "40px"}}>adagio</span></NavLink></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <NavLink to="/dailylyric" style={{color: "white", textDecoration: "none"}}><p onClick={handleClose}>Daily Lyric</p></NavLink>
          <NavLink to="/musicrecommendations" style={{color: "white", textDecoration: "none"}}><p onClick={handleClose}>Music Recommendations</p></NavLink>
          <NavLink to="/journalentries" style={{color: "white", textDecoration: "none"}}><p onClick={handleClose}>Explore Journal Entries</p></NavLink>
          <NavLink to="/followedjournalentries" style={{color: "white", textDecoration: "none"}}><p onClick={handleClose}>Followed Journal Entries</p></NavLink>
          <NavLink to="/forumposts" style={{color: "white", textDecoration: "none"}}><p onClick={handleClose}>Forums</p></NavLink>
          <NavLink to="/followedposts" style={{color: "white", textDecoration: "none"}}><p onClick={handleClose}>Followed Posts</p></NavLink>
        </Offcanvas.Body>
      </Offcanvas>

      <Offcanvas show={show2} onHide={handleClose2} placement="end" style={{background: "#191919"}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><img src={userProfile.profile_picture ? userProfile.profile_picture : placeholder} style={{width: "100px", height: "100px", borderRadius: "50%"}}/><span>Signed in as: {userProfile.username}</span></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <NavLink to="/newjournalentry" style={{color: "white", textDecoration: "none"}}><p onClick={handleClose2}>+Write new journal entry</p></NavLink>
          <NavLink to="newpost" style={{color: "white", textDecoration: "none"}}><p onClick={handleClose2}>+Write new forum post</p></NavLink>
          <NavLink to="/userprofile" style={{color: "white", textDecoration: "none"}}><p onClick={handleClose2}>User Profile</p></NavLink>
          <NavLink to="/usersettings" style={{color: "white", textDecoration: "none"}}><p onClick={handleClose2}>User Settings</p></NavLink>
          <button onClick={handleLogoutClick}>Logout</button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavBar
