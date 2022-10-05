import React from "react"
import "./Input.css"

function Input({ message, setMessage, sendMessage }) {
  return (
    <form action="" onSubmit={sendMessage} className="form">
      <input
        id="input2"
        type="text"
        className="input"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
      />
    </form>
  )
}

export default Input