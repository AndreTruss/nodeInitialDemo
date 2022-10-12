import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    token ? navigate('/home') : navigate('/login');
    // eslint-disable-next-line
  }, []);

  return (
    <></>
  )
}

export default Navbar