import React from "react"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import { NavLink, useHistory } from "react-router-dom"

function NavBar({ user, setUser }) {
  let history = useHistory()

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null)
        history.push("/")
      }
    })
  }

  return (
    <>
      <Navbar>
        <Container>
        <NavLink to="/">
          <h1>Adagio</h1>
        </NavLink>
        {/* <div> */}
          {user ? (
            <>
              <div>
              <NavLink to="/forumposts">Forums</NavLink>
              <NavLink to="/journalentries">Explore Journal Entries</NavLink>
              <NavLink to="/newjournalentry">+Create journal entry</NavLink>
              <NavLink to="/followedjournalentries">Followed Journal Entries</NavLink>
              <NavLink to="/followedposts">Followed Posts</NavLink>
              </div>
              <div>
              <span>Signed in as: {user.username}</span>
              <NavLink to="/dailylyric">Daily Lyric</NavLink>
              <NavLink to="/musicrecommendations">Music Recommendations</NavLink>
              <NavLink to="/userprofile">User Profile</NavLink>
              <NavLink to="/usersettings">User Settings</NavLink>
              <button onClick={handleLogoutClick}>Logout</button>
              </div>
            </>
          ) : (
            <>
              <NavLink to="/signup">Sign Up</NavLink>
              <NavLink to="/login">Login</NavLink>
            </>
          )}
        {/* </div> */}
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar
