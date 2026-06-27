import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/sign-up/SignUp";
import Watchlist from "./pages/MyList/watchlist";
import VerifyOTP from "./pages/verify-otp/verifyOTP";
import ForgotPsw from "./pages/forgot-psw/forgotPsw";
import VerifyOTPpsw from "./pages/verify-otp/verifyOTPpsw";
import ResetPsw from "./pages/forgot-psw/ResetPsw";

import SplashScreen from "./Components/SplashScreen/SplashScreen";

function App() {

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);

  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/Watchlist" element={<Watchlist />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/forgot-password" element={<ForgotPsw />} />
        <Route path="/verify-otp-psw" element={<VerifyOTPpsw />} />
        <Route path="/reset-psw" element={<ResetPsw />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;