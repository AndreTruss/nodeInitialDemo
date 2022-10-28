import React from 'react'
import { Link } from 'react-router-dom'

const RoomList = ({ room, onDelete }) => {
  return (
    <div className="chatroom">
        <Link to={'/chat/' + room._id } name={ room.name }><div className='chatName'>{ `-> ${room.name.toUpperCase()}` }</div></Link>
        <div className='delete' id={ room._id } onClick={ onDelete }>DELETE</div> 
    </div>
  )
}

export default RoomList