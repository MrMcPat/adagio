import React, {useState, useEffect} from "react"
import { Switch, Route } from "react-router-dom"
import NavBar from "./NavBar"
import Homepage from "./Homepage"
import Login from "./Login"
import SignUp from "./SignUp"
import DailyLyricPage from "./DailyLyricPage"

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser}/>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/signup">
          <SignUp setUser={setUser}/>
          </Route>
        <Route path="/login">
          <Login setUser={setUser}/>
        </Route>
        <Route path="/dailylyric">
          <DailyLyricPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
