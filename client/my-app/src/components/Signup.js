import React, { useState, useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../UserContext"
const API_BASE_URL = 'http://localhost:5000'

function Signup() {
  const { user, setUser } = useContext(UserContext)

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [nameError, setNameError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const submitHandler = async (e) => {
    e.preventDefault()
    setNameError("")
    setPasswordError("")
    /* TODO borrar estos logs */
    try {
      const res = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ name, password }),
        headers: { "Content-Type": "application/json" },
      })
      const data = await res.json()

      if (data.errors) {
        setNameError(data.errors.name)
        setPasswordError(data.errors.password)
      }
      if (data.user) {
        setUser(data.user)
      }
    } catch (error) {
      /* handle it */
    }
  }
  if (user) {
    return <Navigate to="/" />
  }

  return (
    <div className="row">
      <h2>Sign up</h2>
      <form className="signup-form" onSubmit={submitHandler}>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="name"
              type="text"
              className="validate"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="name error red-text">{nameError}</div>
            <label htmlFor="name">Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="password"
              type="password"
              className="validate"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="password error red-text">{passwordError}</div>
            <label htmlFor="password">Password</label>
          </div>
        </div>

        <button className="btn" style={{ width: "100%" }}>
          Sign up
        </button>
      </form>
    </div>
  )
}

export default Signup