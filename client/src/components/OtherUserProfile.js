import React, { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

function OtherUserProfile() {
    const { username } = useParams()

    console.log(username)

  return (
    <div>OtherUserProfile</div>
  )
}

export default OtherUserProfile