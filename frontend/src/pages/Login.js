import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        'http://cineverse-5xo9.onrender.com/api/auth/login',
        {
          email: loginData.email,
          password: loginData.password
        }
      );

      localStorage.setItem(
        'token',
        res.data.token
      );

      localStorage.setItem(
        'user',
        JSON.stringify(res.data.user)
      );

      alert('Login Successful');

      navigate('/');

    } catch (err) {

      alert(
        err.response?.data?.message ||
        'Login Failed'
      );

    }
  };

  return (
    <div className='login-page-body'>
      <div className="login">

        <form onSubmit={handleLogin}>

          <h1 className='main-logo'>
            <span>F</span>ilmfy
          </h1>

          <h3 className='sub-head'>
            Welcome Back
          </h3>

          <label htmlFor="email">
            E-mail
          </label>

          <br />

          <input
            className='input-form'
            id='email'
            name='email'
            type="email"
            placeholder='Enter E-mail'
            value={loginData.email}
            onChange={handleChange}
            required
          />

          <br />

          <label htmlFor="password">
            Password
          </label>

          <br />

          <input
            className='input-form'
            id='password'
            name='password'
            type="password"
            placeholder='Enter Password'
            value={loginData.password}
            onChange={handleChange}
            required
          />

          <br />

          <Link
            to="/forgot-password"
            className='forgot'
          >
            Forgotten Password?
          </Link>

          <br />

          <button
            type='submit'
            id='login-btn'
          >
            Login
          </button>

          <p className='p'>
            New user?{' '}
            <Link
              to="/sign-up"
              className='sing-up'
            >
              Sign up
            </Link>
          </p>

        </form>

      </div>
    </div>
  );
};

export default Login;