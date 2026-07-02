import React, { useState } from 'react';
import './sign-up.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [userData, setUserData] = useState({
    firstName: '',
    email: '',
    password: ''
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
        'https://cineverse-5xo9.onrender.com/api/auth/signup',
        {
          name: userData.firstName,
          email: userData.email,
          password: userData.password
        }
      );

      const email = userData.email;

      navigate("/verify-otp", {
        state: { email }
      });

      setUserData({
        firstName: '',
        email: '',
        password: ''
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
    <div className='sign-up-body'>
      <div className="sign-up">

        <form onSubmit={handleSubmit}>

          <h1 className='main-logo-sign'>
            <span>F</span>ilmfy
          </h1>

          <h3 className='sub-heading'>Welcome Back</h3>

          <label htmlFor="firstName">
            First Name
          </label>
          <br />

          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={userData.firstName}
            onChange={handleChange}
            required
          />

          <br />

          <label htmlFor="email">
            E-mail
          </label>

          <br />

          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter E-mail"
            value={userData.email}
            onChange={handleChange}
            required
          />


          <br />

          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter Password"
              value={userData.password}
              onChange={handleChange}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle"
            >
              {showPassword ? <i class="bx bx-eye-closed" style={{color:'#ffffff'}} /> : <i class="bx bx-eye-alt" style={{color:'#ffffff'}} />}
            </button>
          </div>

          <br />

          <button type="submit" id="sign-up-btn">
            Sign Up
          </button>
          <Link to='/login' className="login-btn">Login</Link>

        </form>

      </div>
    </div>
  );
};

export default SignUp;