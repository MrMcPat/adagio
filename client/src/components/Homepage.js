import React, {useState, useEffect} from 'react'
import axios from 'axios'
import logo from "../logo.png"
import { Link } from "react-router-dom"
import homepage1 from "../homepage1.png"
import homepage2 from "../homepage2.png"
import homepage3 from "../homepage3.png"
import homepage4 from "../homepage4.png"

function Homepage() {
  const [user, setUser] = useState(0)

  useEffect(() => {
    async function handleFetch() {
      const userData = await axios.get("/me")
      setUser(userData.data.id)
    }
    handleFetch()
  }, [])

  return (
    <div className="homepage-container">
      <div className="homepage-top">
        <img src={logo} style={{width: "35%"}}/>
        <div className="homepage-text" style={{margin: "20px"}}>
        <h2 style={{fontSize: "60px"}}>We will be with you every step of the way.</h2><br />
        <h3 style={{fontSize: "40px"}}>Manage your mental health at your own pace.</h3><br />
        <h5>At Adagio, we believe that managing your mental health should be personalized and done at your own pace. Our emotions are as copious as there are varying shades of pinks, blues, and yellows. One is not simply just upset. We can be irritated, enraged, and regretful—and Adagio recognizes that. Don’t just accept whatever category that you have been check-boxed into. Tell the world of your feelings. Be <strong>fierce</strong>. Be <strong>unapologetic</strong>. Be <strong>you</strong>.</h5>
        </div>
        {user !== 0 ? <><br /><br /></> : <>
        <Link to="/signup"><button className="default-button">Get started</button></Link>
        <Link to="/login"><button className="default-button">Returning user?</button></Link>
        </>}
        </div>
      <div style={{width: "50%"}}><img src={homepage4} style={{width: "100%"}}/></div>
      <div className="homepage-boxes">
        <h1 style={{fontWeight: "bolder"}}>BE UNAPOLOGETIC</h1>
        <h4>"Loving yourself doesn't require anyone else's permission."</h4>
        <h4>-RM and j-hope</h4>
      </div>
      <div className="homepage-boxes">
        <h1 style={{fontWeight: "bolder"}}>SUPPORT ONE ANOTHER</h1>
        <h4>"Even if you are engulfed in sadness... By forgiving, and by acknowledging, we can connect with one another."</h4>
        <h4>-Lilas Ikuta</h4>
      </div>
      <div style={{width: "50%"}}><img src={homepage1} style={{width: "100%"}}/></div>
      <div style={{width: "50%"}}><img src={homepage3} style={{width: "100%"}}/></div>
      <div className="homepage-boxes">
        <h1 style={{fontWeight: "bolder"}}>"Have I the courage to change?"</h1>
        <h4>"You're not alone in all this. You're not alone I promise. Standing together, we can do anything."</h4>
        <h4>-Sia</h4>
      </div>
      <div className="homepage-boxes">
        <h1 style={{fontWeight: "bolder"}}>Go at your own pace.</h1> 
        <h4>"It ain't about how fast I get there-ain't about what's waiting on the other side."</h4>
        <h4>-Miley Cyrus</h4>
      </div>
      <div style={{width: "50%"}}><img src={homepage2} style={{width: "100%"}}/></div>
      <div className="footer">
        <img src={logo} style={{height: "70px"}}/>
        <p>Designed by Vivian Li and developed by Patrick Liang</p>
      </div>
      <div className="bubbles">
      <div className="bubble" style={{background: "#FFA1A1"}}></div>
      <div className="bubble" style={{background: "#92BA92"}}></div>
      <div className="bubble" style={{background: "#9ADCFF"}}></div>
      <div className="bubble" style={{background: "#FFF89A"}}></div>
      <div className="bubble" style={{background: "#EEC373"}}></div>
      <div className="bubble" style={{background: "#E7FBBE"}}></div>
      <div className="bubble" style={{background: "#92A9BD"}}></div>
      <div className="bubble" style={{background: "#B983FF"}}></div>
      <div className="bubble" style={{background: "#949CDF"}}></div>
      <div className="bubble" style={{background: "#A0FFE6"}}></div>
      </div>
    </div>
  )
}

export default Homepage