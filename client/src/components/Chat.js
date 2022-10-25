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
  const [userName, setUserName] = useState('')
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState(true);

  const handleChange = e => setNewMessage(e.target.value);

  const sendMessage = e => {
    e.preventDefault();
    if (newMessage !== '') {
      socket.emit('chatMessage', {
        room_id, 
        message: newMessage,
      });
      setNewMessage('');
      // inputRef.current.focus();
    }
  }

  useEffect(() => { 
    // if (socket) {
      socket.on('newMessage', message => {
        setMessages([...messages, message]);
      });
    // }
  }, [messages, socket])

  useEffect(() => {
    if (alert){ 
      // const giveName = () => {
    // function joinLeave(){
      socket.emit('join', { room_id })
      socket.on('userOnChat', (user_name) => {
        // console.log(user_name)
        setUserName(user_name);
      });
      // console.log(users)
    // }
    // return () => {
      // if (socket){ 
        /* socket.emit('leave', { room_id })
        socket.on('userOffChat', (result) => {
          setUsers( result )
        })
        console.log( users ) */
      // }
      // }
      // joinLeave()
      setUsers([...users, userName])
      console.log(users)
      setAlert(false)
    }
    // giveName()
  // }
}, [socket, room_id, userName]);
  
  useEffect(() => {
    // if (socket){
      socket.emit("get-message-history", room_id)
      socket.on("message-history", (result) => {
        setMessages(result)
      })
    // }
  }, [room_id, socket, messages])

  // Get chat name with the ID in params.
  useEffect(() => {
    // if (socket){
      const getChatName = async () => {
      const res = await fetch('http://localhost:5000/room/' + room_id, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      const data = await res.json();
      // console.log(data)
      if (data.status) setChatName(data.room.name)
      }
      getChatName();
    // }
  }, [room_id, socket])

  const logout = () => {
    localStorage.clear();
    // setUsers([]) 
    // console.log(users)   
    navigate('/login');
    socket.disconnect();
    // socket.off()
  }

  const goBack = () => {
    socket.emit('leave', { room_id })
        socket.on('userOffChat', (user_name) => {
          // console.log(user_name)
          setUserName(user_name)
        })
        setUsers([...users].filter( (el) => el !== userName ))
        console.log( users )
    navigate('/home');
  }

  return (
    <div className='card'>
    <div className='chat'>
      <div className='header'>
        <span onClick={ goBack } className="logout">home</span>
        <span onClick={ logout } className="logout">logout</span>
      </div>
      <div className='chatUser'>
      <div className=''>
        <span className='chatHeader'>users on Chat:</span>
        <span className='message'>{users}</span>
      </div>
      </div>
        <div className="cardHeader1">{chatName.toUpperCase()}</div>
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
