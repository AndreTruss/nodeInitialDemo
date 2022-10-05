import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../UserContext"
import SignedOut from "./SignedOut"
import SignedIn from "./SignedIn"
const API_BASE_URL = 'http://localhost:5000'

function Navbar() {
  const { user, setUser } = useContext(UserContext)

  const logout = async () => {
    try {
      await fetch(`${API_BASE_URL}/logout`, {
        credentials: "include",
      })

      localStorage.clear()
      setUser(null)
    } catch (error) {
      /* handle it */
    }
  }

  const menu = user ? <SignedIn logout={logout} /> : <SignedOut />
  return (
    <>
      <nav className="green">
        <div className="nav-wrapper">
          <div className="brand-logo">
            <Link to="/">
              <div>Chat Rooms</div>
            </Link>
          </div>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>

          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {menu}
          </ul>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-demo">
        {menu}
      </ul>
    </>
  )
}

export default Navbar