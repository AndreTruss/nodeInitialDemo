import "./App.css"
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import React, { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import Signup from "./components/Signup"
import { UserContext } from "./UserContext"
import Home from "./components/Home"
import Login from "./components/Login"
import Chat from "./components/Chat"


function App() {
  const [user, setUser] = useState(localStorage.getItem("user"))

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user")
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser)
      setUser(foundUser)
    }
  }, [])

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={{ user, setUser }}>
          <Navbar />
          <Routes>
            {/* TODO ver por que usa "element" en vez de "component" creo que es una cosa de versiones */}
            <Route exact path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chat/:room_id" element={<Chat />} />
          </Routes>
        </UserContext.Provider>
      </div>
    </Router>
  )
}

export default App

