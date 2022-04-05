import React  from "react"
import { Switch, Route } from "react-router-dom"
import NavBar from "./NavBar"
import Homepage from "./Homepage"

function App() {

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/">
          <Homepage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
