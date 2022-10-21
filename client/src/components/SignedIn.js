import React from "react"

function SignedIn({ logout }) {
  return (
    <li onClick={logout}>
      <a href="#">Logout</a>
    </li>
  )
}

export default SignedIn