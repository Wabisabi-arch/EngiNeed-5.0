import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/vcsmslogo.png";

const DeadEndPage = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/src/assets/images/bg.svg')" }}
    >
      <div className="bg-[#4d0f0f] text-white p-10 rounded-lg shadow-xl max-w-md text-center">
        <img src={logo} alt="VCSMS Logo" className="mx-auto w-20 mb-4" />
        <h1 className="text-5xl font-extrabold mb-6">OOPS!</h1>
        <div
          onClick={handleRedirect}
          className="bg-white text-[#4d0f0f] font-semibold px-6 py-4 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-300"
        >
          It seems like you have hit a dead-end.{" "}
          <span className="underline">Click here to go back to home</span>
        </div>
      </div>
    </div>
  );
};

export default DeadEndPage;
