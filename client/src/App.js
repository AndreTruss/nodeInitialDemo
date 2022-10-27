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
const connectSocket = () => {
  // const token = sessionStorage.getItem('token');

  if (!socket) { 
    const newSocket = io.connect('http://localhost:5000', {
      query: {
        token: sessionStorage.getItem('token'),
      } 
    });

    /* newSocket.on('disconnect', () => {   
      setSocket(null);
      connectSocket();
      console.log(socket.disconnected);
    });
    newSocket.on('connection', () => {
      console.log('Socket connected.');
    });*/
    setSocket(newSocket); 
  };
};

connectSocket();
/* useEffect(() => {
  return () => {
      socket.disconnect()
      socket.off()
    }
  }, []) */


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

