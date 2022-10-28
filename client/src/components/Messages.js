import React from 'react'

const Messages = ({ message, socket }) => {
  return (
    <div className={ socket.id === message.user_id ? 'ownMessage' : 'otherMessage' }>
      <span className='userName'>{message.user_name + ': '}</span>
      <span className='message'>{message.message}</span>
    </div> 
  )
} 

export default Messages;
