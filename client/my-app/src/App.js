import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Signup from "./components/Signup"
import Home from "./components/Home"
import Login from "./components/Login"
import Chat from "./components/Chat"
import io from 'socket.io-client'



function App() {
  const [socket, setSocket] = useState(null);

// Setup sockets.io
const setupSocket = () => {
  const token = localStorage.getItem('token');

  if (token && !socket) {
    const newSocket = io('http://localhost:5000', {
      query: {
        token: localStorage.getItem('token'),
      }, forceNew: true 
    });

    /* newSocket.on('disconnect', () => {   
      setSocket(null);
      setTimeout(setupSocket, 3000);
      console.log('Socket disconnected.');
    });
    newSocket.on('connection', () => {
      console.log('Socket connected.');
    }); */
    setSocket(newSocket);
  };
};

/* useEffect(() => {
  setupSocket();
  // eslint-disable-next-line
}, []); */

  return (
    <div className="App" id="color">
    <Router>
          <Routes>
            <Route exact path="/" element={<Navbar />} />
            <Route path="/login" element={<Login setupSocket={ setupSocket } />} />
            <Route path="/signup" element={<Signup setupSocket={ setupSocket } />} />
            <Route path="/home" element={<Home socket={ socket } />} />
            <Route path="/chat/:room_id/" element={<Chat socket={ socket } />} />
          </Routes>
    </Router>
    </div>
  )
}

export default App

