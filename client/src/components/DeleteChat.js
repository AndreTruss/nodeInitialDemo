import React from 'react'
import { Link } from 'react-router-dom'

const DeleteChat = ({ chatroom, onDelete }) => {
  return (
    <div className="chatroom">
        <Link to={'/chat/' + chatroom._id } name={ chatroom.name }><div className='chatName'>{ chatroom.name.toUpperCase() }</div></Link>
        <div className='delete' id={ chatroom._id } onClick={ onDelete }>DELETE</div> 
    </div>
  )
}

export default DeleteChat