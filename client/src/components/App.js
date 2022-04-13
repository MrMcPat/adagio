import React, {useState, useEffect} from "react"
import { Switch, Route } from "react-router-dom"
import NavBar from "./NavBar"
import Homepage from "./Homepage"
import Login from "./Login"
import SignUp from "./SignUp"
import Callback from "./Callback"
import DailyLyricPage from "./DailyLyricPage"
import MusicRecommendations from "./MusicRecommendations"
import UserProfile from "./UserProfile"
import UserSettings from "./UserSettings"
import NewJournalEntry from "./NewJournalEntry"
import JournalEntryPage from "./JournalEntryPage"
import EditJournalEntry from "./EditJournalEntry"
import ExploreJournalEntries from "./ExploreJournalEntries"
import ForumPosts from "./ForumPosts"
import NewPost from "./NewPost"
import PostPage from "./PostPage"
import EditPost from "./EditPost"
import AllUserJournalEntries from "./AllUserJournalEntries"
import AllUserPosts from "./AllUserPosts"
import OtherUserProfile from "./OtherUserProfile"

function App() {
  const [user, setUser] = useState("")

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
      }
    })
  }, [])

  function getToken(accessToken) {{
    localStorage.setItem("tokenKey", accessToken)
  }}

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
        <Route path="/callback">
          <Callback getToken={getToken}/>
        </Route>
        <Route path="/dailylyric">
          <DailyLyricPage token={localStorage.getItem("tokenKey")}/>
        </Route>
        <Route path="/musicrecommendations">
          <MusicRecommendations token={localStorage.getItem("tokenKey")}/>
        </Route>
        <Route path="/userprofile">
          <UserProfile />
        </Route>
        <Route path="/usersettings">
          <UserSettings />
        </Route>
        <Route path="/newjournalentry">
          <NewJournalEntry />
        </Route>
        <Route path="/journalentry/:id">
          <JournalEntryPage />
        </Route>
        <Route path="/editentry/:id">
          <EditJournalEntry />
        </Route>
        <Route path="/journalentries">
          <ExploreJournalEntries />
        </Route>
        <Route path="/forumposts">
          <ForumPosts />
        </Route>
        <Route path="/newpost">
          <NewPost />
        </Route>
        <Route path="/post/:id">
          <PostPage />
        </Route>
        <Route path="/editpost/:id">
          <EditPost />
        </Route>
        <Route path="/userjournalentries">
          <AllUserJournalEntries />
        </Route>
        <Route path="/userposts">
          <AllUserPosts />
        </Route>
        <Route path="/user/:username">
          <OtherUserProfile />
        </Route>
      </Switch>
    </div>
  );
}

export default App
