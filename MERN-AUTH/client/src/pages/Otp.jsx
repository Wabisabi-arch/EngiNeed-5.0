import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/vcsmslogo.png";

const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    // Only allow numbers and up to 6 digits
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/src/assets/images/bg.svg')" }}
    >
      <div className="bg-[#4d0f0f] text-white p-10 rounded-lg shadow-xl max-w-md w-full text-center">
        <img src={logo} alt="VCSMS Logo" className="mx-auto w-20 mb-4" />
        <h1 className="text-3xl font-bold mb-4">Enter OTP</h1>
        <p className="mb-6 text-sm">
          Please enter the 6-digit code sent to your email.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={otp}
            onChange={handleChange}
            className="w-full p-3 text-white text-center rounded-lg mb-4 outline-none"
            placeholder="Enter OTP"
            inputMode="numeric"
            maxLength={6}
          />
          <button
            type="submit"
            className="bg-white text-[#4d0f0f] font-bold py-2 px-6 rounded-lg hover:bg-gray-200 transition duration-200"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpPage;
