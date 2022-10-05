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
    socket = io(API_BASE_URL)

    socket.emit("join", { name: user.name, room_id, user_id: user._id })
  }, [])

  const sendMessage = (e) => {
    e.preventDefault()
    if (message) {
      socket.emit("sendMessage", message, room_id, () => setMessage(""))
    }
  }

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      setMessageLog((input) => [...input, newMessage])
    })
  }, [])

  useEffect(() => {
    socket.emit("get-message-history", room_id)
    socket.on("message-history", (result) => {
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