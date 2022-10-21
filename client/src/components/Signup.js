import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";

const Signup = ( props ) => {
  const navigate = useNavigate();
  const [text, setText] = useState(' ');
  const [values, setValues] = useState({name: '', password: ''});

  const handleChange = e => setValues({ ...values, [e.target.name]: e.target.value });
 
  const validateForm = () => {
    const { name, password } = values;
    if (name === '' || password === '') {
      setText('Name and password is required.')
      return false
    } 
    return true;    
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return;
    const { name, password } = values;
    const url = 'http://localhost:5000/signup';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password })
    }
    const res = await fetch(url, options);
    const data = await res.json();

    if (data.status) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', data.user.name)
      props.connectSocket();
      navigate('/home');
    }
    setText(data.message);
  }

  return (
    <form autoComplete="off" onSubmit={ handleSubmit }>
      <div className='card'>
          <div className='cardHeader'>sign in</div>
          <div className="form">
              <input type="text" className='input' placeholder="name" name="name" onChange={ handleChange } autoFocus />
              {/* <label htmlFor="name" className='label'>name</label>   */}
          </div>
          <div className="form">
              <input type="password"  className='input' placeholder="password" name="password" onChange={ handleChange } />
              {/* <label htmlFor="password" className='label'>password</label>   */}
          </div>
          <div className='text'>{ text }</div>
          <button className='button'>enter</button>
          <span><Link to="/login" className='span'>LOG IN</Link></span>
      </div>
    </form>
  )
}

export default Signup
