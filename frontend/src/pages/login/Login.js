import React, { useState } from 'react';
import "./Login.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

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
        'https://cineverse-5xo9.onrender.com/api/auth/login',
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

          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className='input-form'
              name="password"
              placeholder="Enter Password"
              value={loginData.password}
              onChange={handleChange}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle"
            >
              {showPassword ? <i class="bx bx-eye-closed" style={{ color: '#ffffff' }} /> : <i class="bx bx-eye-alt" style={{ color: '#ffffff' }} />}
            </button>
          </div>

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


          <Link
            to="/sign-up"
            className='sing-up'
          >
            Sign up
          </Link>


        </form>

      </div>
    </div>
  );
};

export default Login;