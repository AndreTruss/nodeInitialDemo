import React, { useState } from "react"
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Signup from "./components/Signup"
import Home from "./components/Home"
import Login from "./components/Login"
import Chat from "./components/Chat"
import io from 'socket.io-client'

function App() {
  const [socket, setSocket] = useState(null);

const connectSocket = () => {
  
  if (!socket) { 
    const newSocket = io('http://localhost:5000', {
      auth: {
        token: sessionStorage.getItem('token'),
      } 
    });

    setSocket(newSocket); 
  };
};

connectSocket();

  return (
    <div className="App" id="color">
    <Router>
          <Routes>
            <Route exact path="/" element={<Navbar />} />
            <Route path="/login" element={<Login connectSocket={ connectSocket } />} />
            <Route path="/signup" element={<Signup connectSocket={ connectSocket } />} />
            <Route path="/home" element={<Home socket={ socket } />} />
            <Route path="/chat/:room_id/" element={<Chat socket={ socket } />} />
          </Routes>
    </Router>
    </div>
  )
}

export default App

