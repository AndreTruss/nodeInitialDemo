import React, { useState, useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../UserContext"
import "./Login.css"
const API_BASE_URL = 'http://localhost:5000';

function Login() {
  const { user, setUser } = useContext(UserContext)
  const [name, setName] = useState("") // TODO borrar?
  const [password, setPassword] = useState("")
  const [nameError, setNameError] = useState("")
  const [loginError, setLoginError] = useState("")

  const submitHandler = async (e) => {
    e.preventDefault()
    setNameError("")
    setLoginError("")

    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        credentials: "include", // TODO ver que coñoo es esta opcion
        body: JSON.stringify({ name, password }),
        headers: { "Content-Type": "application/json" },
      })
      const data = await res.json()

      if (data.errors) {
        setLoginError(data.errors.login)
        setNameError(data.errors.name)
      }
      if (data.user) {
        setUser(data.user)
        localStorage.setItem("user", JSON.stringify(data.user))
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (user) {
    return <Navigate to="/" />
  }

  return (
    <div className="row">
      <h2>Welcome</h2>

      <form className="login-form" onSubmit={submitHandler}>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="name"
              type="name"
              className="validate"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="name">Username</label>
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

            <div className="password error red-text">{loginError}</div>
            <label htmlFor="password">Password</label>
          </div>
        </div>

        <button className="btn row" style={{ width: "100%" }}>
          Login
        </button>
      </form>
    </div>
  )
}

export default Login