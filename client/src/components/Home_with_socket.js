import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import RoomList from './RoomList';

const Home = ({ socket }) => {
  const navigate = useNavigate();
  const [chatrooms, setChatrooms] = useState([]);
  const [newRoom, setNewRoom] = useState('');
  // const [text, setText] = useState('');
  const user = sessionStorage.getItem('user');
  const [alert, setAlert] = useState(true);

  // Get all rooms
  useEffect(() => {
    if (socket && alert) {
      
        socket.on("get-rooms", (roomsInDB) => {
          setChatrooms(roomsInDB)
        })  
        setAlert(false)
    }
  },[socket, chatrooms, alert]);

  useEffect(() => {
    if(socket){
    socket.on("room-created", (newRoom_soc) => {
      setChatrooms([...chatrooms, newRoom_soc])
    })}
  }, [socket, chatrooms])

  // Add new room
  const handleChange = e => setNewRoom(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault(); 
      
      socket.emit("create-room", newRoom)
      setNewRoom('')
      setAlert(true)
  }

  // Delete Room
  const deleteRoom = async e => {
    e.preventDefault();
    setChatrooms(chatrooms.filter(chatroom => chatroom._id !== e.target.id))

    socket.emit('delete-room', e.target.id )
    setAlert(true)
  }

  if (!user) {
    return navigate('/signup');
  }

  return (
    <form autoComplete="off" onSubmit={ handleSubmit }>
      <div className='card'>
      <div className='container'>
        <div className='cardHeader2'>Welcome {user} </div>
        <div className="chatrooms">
          <div className='cardHeader3'>Join chats:</div>
          {
          chatrooms.map(chatroom => <RoomList key={ chatroom._id } chatroom={ chatroom } onDelete={ deleteRoom } socket={socket} />)
          }
        </div>
        <div className="chatShadow">
          <div className="form">
            <input type="text" className='input' placeholder='New chat-room name' name='name' value={newRoom} onChange={ handleChange } />
          </div>
          {/* <div className='text'>{text}</div> */}
          <button className='button'>create chat</button>
        </div>
      </div>
      </div>
    </form>   
  )
}

export default Home
