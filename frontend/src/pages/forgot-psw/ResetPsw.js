import React from 'react'
import './forgotPsw.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const ResetPsw = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const email = location.state?.email;

    const [userData, setUserData] = useState({
        newPassword: '',
        confirmPassword: '',
        email: email,
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
                'https://cineverse-5xo9.onrender.com/api/auth/update-psw',
                {
                    newPassword: userData.newPassword,
                    confirmPassword: userData.confirmPassword,
                    email: userData.email
                }
            );

            setUserData({
                newPassword: '',
                confirmPassword: '',
            });

            alert("Password updated.")

            navigate('/login')

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
                    <label htmlFor="email" className='label'>New password</label>

                    <input
                        className='input-form'
                        type={showPassword ? "text" : "password"}
                        name="newPassword"
                        placeholder="Enter new Password"
                        value={userData.newPassword}
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

                    <label htmlFor="email" className='label'>Condirm password</label>

                    <input
                        className='input-form'
                        id='confirmPassword'
                        name='confirmPassword'
                        type={showPassword ? "text" : "password"}
                        placeholder='Enter Password'
                        value={userData.confirmPassword}
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

                    <button id="reset-btn">Reset password</button>
                </form>
                <p className="copryright">© 2026 Filmfy. All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default ResetPsw
