import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";

const Login = ( props ) => {
  const navigate = useNavigate();
  const [textPW, setTextPW] = useState('');
  const [textName, setTextName] = useState('');
  const [values, setValues] = useState({name: '', password: ''});

  const handleChange = e => setValues({ ...values, [e.target.name]: e.target.value });
  
  /* const validateForm = () => {
    const { name, password } = values;
    if (name === /^ *$/ || password === /^ *$/) {
      setTextPW('name and password is required, an empty string is not valid.')
      return false
    } 
    return true;    
  } */

  const handleSubmit = async e => {
    e.preventDefault();
    // if (!validateForm()) return;
    const { name, password } = values;
    const url = 'http://localhost:5000/login';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password })
    };
    const res = await fetch(url, options);
    const data = await res.json();

    if (data.status) {
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('user', data.user.name);
      await props.connectSocket();
      navigate('/home');
    }  

    if (data.input === 'name'){
      setTextName(data.message)
      setTextPW('')
    } 

    if (data.input === 'password'){
      setTextName('')
      setTextPW(data.message)
    }
  }

  return (
    <form autoComplete="off" onSubmit={ handleSubmit }>
        <div className='card'>
        <div className='container'>
            <div className='cardHeader1'>Log in</div>
            <div className="form">
                <input type="name" className='input' placeholder="Name" name="name" onChange={ handleChange} />
                {/* <label htmlFor="name" className='label'>name</label>   */}
            </div>
            <div className='text'>{textName}</div>
            <div className="form">
                <input type="password" className='input' placeholder="Password" name="password" onChange={ handleChange } />
                {/* <label htmlFor="password" className='label'>password</label> */}
            </div>
            <div className='text'>{textPW}</div>
            <button type='submit' className='button'>enter</button>
            <span><Link to="/signup" className='logSignIn'>SIGN IN</Link></span>
        </div>
        </div>
    </form>   
 )
}  

export default Login
