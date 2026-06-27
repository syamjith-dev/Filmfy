import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import './verifyOTP.css'

function VerifyOtp() {

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");

  const [timer, setTimer] = useState(60);

  const [canResend, setCanResend] = useState(false);

  useEffect(() => {

    if (timer <= 0) {

      setCanResend(true);

      return;

    }

    const interval = setInterval(() => {

      setTimer(prev => prev - 1);

    }, 1000);

    return () => clearInterval(interval);

  }, [timer]);


  const resendOtp = async () => {

    try {

      await axios.post(
        "https://cineverse-5xo9.onrender.com/api/auth/resend-otp",
        {
          email
        }
      );

      setTimer(10);

      setCanResend(false);

      alert("OTP sent again");

    } catch (error) {

      alert(
        error.response?.data?.message
      );

    }

  };


  const handleVerify = async () => {

    try {

      const res = await axios.post(
        "https://cineverse-5xo9.onrender.com/api/auth/verify-otp",
        {
          email,
          otp
        }
      );

      alert(res.data.message);

      navigate("/login");

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Verification failed"
      );

    }

  };

  return (
    <div className="main-body">
      <div className="verify-otp">
        <h2 className="main-heading"> <span>V</span>erify OTP</h2>

        <p className="Email">{email}</p>

        <input 
          className="input-otp"
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button onClick={handleVerify} className="verify-btn">
          Verify OTP
        </button>

        <p style={{ color: "#ffff" }} className="counter">
          OTP expires in:
          {Math.floor(timer / 60)}:
          {String(timer % 60).padStart(2, "0")}
        </p>

        <button
          onClick={resendOtp}
          disabled={!canResend}
          className="resend-otp"
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
}

export default VerifyOtp;