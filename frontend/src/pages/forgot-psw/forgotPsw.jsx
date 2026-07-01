import React from 'react'
import './forgotPsw.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ForgotPsw = () => {

  const navigate = useNavigate();
  

  const [userData, setUserData] = useState({
    email: '',
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await axios.post(
        'https://cineverse-5xo9.onrender.com/api/auth/resend-otp',
        {
          email: userData.email,
        }
      );

      const email = userData.email;

      navigate("/verify-otp-psw", {
        state: { email }
      });

      setUserData({
        email: '',
      });

      alert("OTP sent to your email");

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <div className='page-body'>
      <div className="section">
        <h1 className="main-logo"><span>F</span>ilmfy</h1>
        <h3 className="sub-head">Forgot password</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className='label'>E mail</label>

          <input
            className='input-form'
            type="email"
            id="email"
            name="email"
            placeholder="Enter E-mail"
            value={userData.email}
            onChange={handleChange}
            required
          />

          <button id="reset-btn">Reset password</button>
        </form>
        <p className="copryright">© 2026 Filmfy. All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default ForgotPsw;
