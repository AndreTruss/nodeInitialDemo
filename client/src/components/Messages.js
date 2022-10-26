import React from 'react'
import { useState, useEffect } from 'react';

const Messages = ({ message }) => {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserId(payload.id);
    }
  }, []);
  return (
    <div className={ userId === message.user_id ? 'ownMessage' : 'otherMessage' }>
      <span className='userName'>{message.user_name + ': '}</span>
      <span className='message'>{message.message}</span>
    </div> 
  )
} 

export default Messages;
