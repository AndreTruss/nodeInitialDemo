import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import RoomList from './RoomList';

const Home = ({ socket }) => {
  const navigate = useNavigate();
  const url = 'http://localhost:5000/room';
  const [chatRooms, setChatrooms] = useState([]);
  const [newRoom, setNewRoom] = useState('');
  const [text, setText] = useState('');
  const user = sessionStorage.getItem('user');
  const [alert, setAlert] = useState(true);

  // Get all rooms
  useEffect(() => {
    if (alert) {
      const getAllRooms = async () => {
        const options = {
          method: 'GET',
          headers: {
            Authorization: sessionStorage.getItem('token'),
            'Content-Type': 'application/json',
          },
          
        };
        const res = await fetch(url, options );
        const data = await res.json();
          
        setChatrooms(data);
      };
      getAllRooms();
      setAlert(false);
    }
  }, [chatRooms, alert]);

  // Add new room
  const handleChange = e => setNewRoom(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault(); 
      const options = {
        method: 'POST',
        headers: {
          Authorization: sessionStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( { name: newRoom, user_id: socket.id } )
      };
      const res = await fetch(url, options);
      const data = await res.json();

      if (data.status) {
        setText('');
        setNewRoom('');
        setAlert(true);
      } else {
        setText(data.message);
      }
  }

  // Delete Room
  const deleteRoom = async e => {
    e.preventDefault();
    setChatrooms(chatRooms.filter(chatroom => chatroom._id !== e.target.id))
    
    const url = 'http://localhost:5000/room/' + e.target.id;
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: sessionStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: e.target.id })
    };
    await fetch(url, options);
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
          chatRooms.map(chatroom => <RoomList key={ chatroom._id } chatroom={ chatroom } onDelete={ deleteRoom } socket={socket} />)
          }
        </div>
        <div className="chatShadow">
          <div className="form">
            <input type="text" className='input' placeholder='New chat-room name' value={newRoom} onChange={ handleChange } />
          </div>
          <div className='text'>{text}</div>
          <button className='button'>create chat</button>
        </div>
      </div>
      </div>
    </form>   
  )
}

export default Home
