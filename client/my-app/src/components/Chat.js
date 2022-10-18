import React, { useContext, useEffect, useState } from "react"
import io from "socket.io-client"
import { useParams, Navigate } from "react-router-dom"
import { UserContext } from "../UserContext"
import Input from "./Input"
import Messages from "./Messages"
import "./Chat.css"
import background from "../assets/background-chat.png"
const API_BASE_URL = 'http://localhost:5000'

let socket

function Chat() {
  const { user, setUser } = useContext(UserContext)
  const { room_id } = useParams()
  const [message, setMessage] = useState("")
  const [messageLog, setMessageLog] = useState([])

  useEffect(() => {
    socket = io.connect(API_BASE_URL)

    if (socket) socket.emit("join", user.name, room_id, user._id )
    return () => {
      if (socket) socket.emit('leaveRoom', room_id, user._id);
    }
  }, [])

  const sendMessage = (e) => {
    e.preventDefault()
    if (message) {
      socket.emit("send-message", user.name, user._id, message, room_id, () => setMessage(""))
    }
  }

  useEffect(() => {
    socket.on("new-message", (newMessage) => {
      setMessageLog((input) => [...input, newMessage])
    })
  }, [])

  useEffect(() => {
    socket.emit("message-history", room_id)
    socket.on("history", (result) => {
      setMessageLog(result)
    })
  }, [])

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <div className="outerContainer">
      <div
        className="container"
        style={{ backgroundImage: `url(${background})` }}
      >
        <Messages messageLog={messageLog} user_id={user._id} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  )
}

export default Chat