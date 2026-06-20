import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOTP = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");

  const verifyOTP = async () => {

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
        err.response?.data?.message
      );

    }

  };

  return (
    <div>
      <h2>Verify OTP</h2>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e)=>
          setOtp(e.target.value)
        }
      />

      <button onClick={verifyOTP}>
        Verify OTP
      </button>
    </div>
  );
};

export default VerifyOTP;