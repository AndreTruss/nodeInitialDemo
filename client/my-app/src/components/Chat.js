import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import STB from "react-scroll-to-bottom"
import Messages from './Messages';

const Chat = ({ socket }) => {
  const navigate = useNavigate();
  const { room_id } = useParams();
  // const inputRef = useRef();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatName, setChatName] = useState('');
  const [users, setUsers] = useState([]);

  const handleChange = e => setNewMessage(e.target.value);

  const sendMessage = e => {
    e.preventDefault();
    if (socket &&  newMessage !== '') {
      socket.emit('chatMessage', {
        room_id, 
        message: newMessage,
      });
      setNewMessage('');
      // inputRef.current.focus();
    }
  }

  useEffect(() => { 
    if (socket) {
      socket.on('newMessage', message => {
        setMessages([...messages, message]);
      });
    }
  }, [messages, socket])

  useEffect(() => {
    if (socket){ 
      socket.emit('join', { room_id })
      socket.on('userOnChat', (user) => {
        setUsers( [...users, user] )
      })
    }
    return () => {
      if (socket) socket.emit('leave', { room_id });
    }
  }, [socket, room_id]);
  

  useEffect(() => {
    if (socket){
      socket.emit("get-message-history", room_id)
      socket.on("message-history", (result) => {
        setMessages(result)
      })
    }
  }, [room_id, socket])

  // Get chat name with the ID in params.
  useEffect(() => {
    if (socket){
      const getChatName = async () => {
      const res = await fetch('http://localhost:5000/room/' + room_id, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      const data = await res.json();
      if (data.message !== 'Not authorized') setChatName(data.room.name)
      }
      getChatName();
    }
  }, [room_id, socket])

  const logout = () => {
    localStorage.clear();    
    navigate('/login');
  }

  const goBack = () => {
    navigate('/home');
  }

  return (
    <div className='card'>
    <div className='chat'>
      <div className='header'>
        <span onClick={ goBack } className="logout">back</span>
        <span onClick={ logout } className="logout">logout</span>
      </div>
      {/* <div className='chatUser'>
      <div className=''>
        <span className='chatHeader'>Users on Chat:</span>
        <span className='message'>{users}</span>
      </div>
      </div> */}
        <div className="cardHeader">{chatName.toUpperCase()}</div>
      <div className='chatSection'>
        <div className="chatContent">
          <STB className="messages">
            {
              messages.map((message, i) => <Messages key={ i } message={ message } />)
            }
            {/* <div className="anchor"></div> */}
          </STB>
        </div>
        <form autoComplete="off" onSubmit={ sendMessage }>
          <div className="chatActions">
            <div>
              <input type='text' name='message' value={ newMessage } placeholder='write a message' onChange={ handleChange } ></input>
            </div>
            <div>
              <button type='submit' className='chatButton'><span className="send">send</span></button>
            </div>
          </div>
        </form>
      </div> 
    </div>
    </div>
  )
}

export default Chat
