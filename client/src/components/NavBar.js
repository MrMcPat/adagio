import React from "react"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import { NavLink, useHistory } from "react-router-dom"

function NavBar({ user, setUser }) {
  let history = useHistory();

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
        history.push("/")
      }
    });
  }

  return (
    <>
      <Navbar>
        <Container>
        <NavLink to="/">
          <h1>Adagio</h1>
        </NavLink>
        <div>
          {user ? (
            <>
              <p>Signed in as: {user.username}</p>
              <NavLink to="/dailylyric">Daily Lyric</NavLink>
              <NavLink to="/musicrecommendations">Music Recommendations</NavLink>
              <NavLink to="/userprofile">User Profile</NavLink>
              <button onClick={handleLogoutClick}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/signup">Sign Up</NavLink>
              <NavLink to="/login">Login</NavLink>
            </>
          )}
        </div>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
