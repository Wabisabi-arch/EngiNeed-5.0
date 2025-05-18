import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/vcsmslogo.png";

const PageisLoading = () => {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/src/assets/images/bg.svg')" }}
    >
      <div className="bg-[#4d0f0f] text-white p-10 rounded-lg shadow-xl max-w-md text-center">
        <img src={logo} alt="VCSMS Logo" className="mx-auto w-20 mb-4" />
        <h1 className="text-5xl font-extrabold mb-6">Page is Loading</h1>
        <div className="flex justify-center">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default PageisLoading;
