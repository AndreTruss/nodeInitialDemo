import React from "react"
import STB from "react-scroll-to-bottom"
import Message from "./Message"
import "./Messages.css"

function Messages({ messageLog, user_id }) {
  return (
    <STB className="messages">
      {messageLog.map((message) => (
        <Message
          key={message._id}
          current_uid={user_id}
          message={message}
        />
      ))}
    </STB>
  )
}

export default Messages