import React from 'react'
import { Link } from "react-router-dom"

function ForumPost({post}) {

  return (
    <>
    <p><Link to={`/post/${post.id}`}>{post.title}</Link> by {post.user.username}</p>
    <p>{post.body}</p>
    <p>{post.created_at === post.updated_at ? 
    `-Created on ${post.created_at.slice(0, 16).split("T")[0]}, ${post.created_at.slice(0, 16).split("T")[1]}` :
    `-Updated on ${post.updated_at.slice(0, 16).split("T")[0]}, ${post.updated_at.slice(0, 16).split("T")[1]}`}</p>
    </>
  )
}

export default ForumPost