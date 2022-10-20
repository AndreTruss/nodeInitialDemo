import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import DeleteChat from './DeleteChat';

const Home = ({ socket }) => {
  const navigate = useNavigate();
  const url = 'http://localhost:5000/room';
  const [chatrooms, setChatrooms] = useState([]);
  const [newChatroom, setNewChatroom] = useState([]);
  const [text, setText] = useState('');
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [alert, setAlert] = useState(true);
  // const inputRef = useRef();

  // Get all the chats rooms
  useEffect(() => {
    if (alert) {
      const getChatrooms = async () => {
        const options = {
          method: 'GET',
          headers: {
            Authorization: localStorage.getItem('token'),
            'Content-Type': 'application/json',
          },
          
        };
        const res = await fetch(url, options );
        const data = await res.json();
        console.log(data)
        if (data.message === 'Not authorized') setUser(null)
          
        setChatrooms(data);
      };
      getChatrooms();
      setAlert(false);
    }
  }, [chatrooms, alert]);

  // Add new chat room
  const handleChange = e => setNewChatroom(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault(); 
    
      setText('');
      const options = {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( { name: newChatroom } )
      };
      const res = await fetch(url, options);
      console.log(res)
      const data = await res.json();

      if (data.status) {
        setNewChatroom('');
        setAlert(true);
      } else {
        setText(data.message);
      }
    
    //inputRef.current.focus();
  }

  // Delete Chat from Dashboard
  const deleteChat = async e => {
    e.preventDefault();
    setChatrooms(chatrooms.filter(chatroom => chatroom._id !== e.target.id))
    
    //Delete from DB
    const url = 'http://localhost:5000/room';
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: e.target.id })
    };
    await fetch(url, options);
  }

  // In case there's no users registered.
  if (!user) {
    return navigate('/signup');
  }

  return (
    <form autoComplete="off" onSubmit={ handleSubmit }>
      <div className='card'>
        <div className='cardHeader'>Welcome {user} </div>
        <div className="form">
            <input type="text" id="chatName" className='input' placeholder='Chat room name' value={newChatroom} onChange={ handleChange } />
            {/* <label htmlFor="name" className='label'>name</label> */}  
        </div>
        <div className='text'>{text}</div>
        <button className='button'>create room</button>
        <div className="chatrooms">
          {
          chatrooms.map(chatroom => <DeleteChat key={ chatroom._id } chatroom={ chatroom } onDelete={ deleteChat } />)
          }
        </div>
      </div>
    </form>   
  )
}

export default Home
