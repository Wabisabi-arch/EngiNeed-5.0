// pages/Home.jsx
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import vcsmslogo from "../assets/images/vcsmslogo.png";
import engineedlogo from "../assets/images/engineedlogo2.png";


const Home = () => {
  const { userData } = useContext(AppContext);

  return (
    // <div className="z-10 flex flex-col items-center justify-center text-center text-white bg-[#4a0d0d] rounded-lg shadow-lg w-auto">
    <div className="flex flex-col items-center justify-center h-screen w-full py-5 text-center text-white">
      {/* Logos and Brand */}
      <div className="flex items-center gap-6 mb-10">
        <img
          src={vcsmslogo}
          alt="VCSMS Logo"
          className="w-24 h-24 sm:w-28 sm:h-28"
        />
        <h1 className="text-6xl sm:text-7xl font-extrabold flex items-center">
          Engi<span className="text-yellow-400">NEED</span>
        </h1>
      </div>

      {/* Welcome Message */}
      <h2 className="text-[5rem] sm:text-[6rem] font-bold text-gold-100 mb-6 drop-shadow-lg my-6">
        Welcome, {userData?.name || "User"}
      </h2>
      <p className="text-lg sm:text-xl text-gray-200 mb-10 max-w-2xl">
        Your go-to platform for managing requests and solutions in ValMaSci.
      </p>

      {/* Button */}
      <button className="text-xl sm:text-2xl bg-maroon-700 hover:bg-maroon-800 text-white font-semibold py-4 px-10 rounded-full shadow-lg transition duration-300 ease-in-out">
        Get Started
      </button>
    </div>
  );
};

export default Home;
