import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function VerifyOTP() {

  const [otp, setOtp] = useState("");

  const location = useLocation();

  const email = location.state.email;

  const verifyOTP = async () => {
    try {

      const response = await axios.post(
        `${API_URL}/verify-otp`,
        {
          email,
          otp
        }
      );

      alert(response.data.message);

    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Enter OTP"
        onChange={(e) => setOtp(e.target.value)}
      />

      <button onClick={verifyOTP}>
        Verify
      </button>
    </>
  );
}

export default VerifyOTP;