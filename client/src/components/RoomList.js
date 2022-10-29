import React from 'react'
import { Link } from 'react-router-dom'

const RoomList = ({ chatroom, onDelete, socket }) => {
  return (
    <div className="chatroom">
        <Link to={'/chat/' + chatroom._id } name={ chatroom.name }><div className='chatName'>{ `-> ${chatroom.name.toUpperCase()}` }</div></Link>
        <div className={(chatroom.user_id === socket.id) ? 'delete' : 'hidden'} id={ chatroom._id } onClick={ onDelete }>DELETE</div> 
    </div>
  )
}

export default RoomList