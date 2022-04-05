import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useHistory } from "react-router-dom";

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
        <NavLink to="/">
          <h1>Adagio</h1>
        </NavLink>
        <div>
          {user ? (
            <>
              <button onClick={handleLogoutClick}>Logout</button>
              <NavLink to="/dailylyric">Daily Lyric</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/signup">Sign Up</NavLink>
              <NavLink to="/login">Login</NavLink>
            </>
          )}
        </div>
      </Navbar>
    </>
  );
}

export default NavBar;
