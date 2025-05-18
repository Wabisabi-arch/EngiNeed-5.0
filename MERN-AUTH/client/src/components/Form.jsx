import React, { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import bgImage from "../assets/images/bg.svg";
import "../index.css";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { backendUrl, setisLoggedIn, getUserData } = useContext(AppContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      if (isRegister) {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          setisLoggedIn(true);
          await getUserData();
          toast.success("Successfully logged in!", {
            position: "top-right",
            autoClose: 3000,
          });
          setTimeout(() => {
            navigate("/app/home");
          }, 2000);
        } else {
          toast.error(data.message, {
            position: "top-right",
            autoClose: 3000,
          });
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });
        if (data.success) {
          setisLoggedIn(true);
          await getUserData();
          toast.success("Successfully logged in!", {
            position: "top-right",
            autoClose: 3000,
          });
          setTimeout(() => {
            navigate("/app/home");
          }, 2000);
        } else {
          toast.error(data.message, {
            position: "top-right",
            autoClose: 3000,
          });
        }
      }
    } catch (error) {
      toast.error("An error has occurred", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  return (
    <>
      <div
        className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat px-4"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-[#4a0d0d] rounded-lg shadow-lg w-full max-w-md">
          <div className="flex">
            <button
              onClick={() => setIsRegister(true)}
              className={`w-1/2 py-3 text-lg font-semibold transition ${
                isRegister
                  ? "bg-[#781f1e] text-white"
                  : "bg-white text-[#781f1e]"
              }`}
            >
              Register
            </button>
            <button
              onClick={() => setIsRegister(false)}
              className={`w-1/2 py-3 text-lg font-semibold transition ${
                !isRegister
                  ? "bg-[#781f1e] text-white"
                  : "bg-white text-[#781f1e]"
              }`}
            >
              Log In
            </button>
          </div>

          <div className="p-6">
            <div className="flex justify-center mb-4">
              <img src="/vcsmslogo.png" alt="Logo" className="h-16" />
            </div>

            <form className="space-y-4" onSubmit={onSubmitHandler}>
              {isRegister && (
                <div>
                  <label className="block text-white text-sm font-medium mb-1" id="Full Name">
                    Full Name
                  </label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    className="w-full px-3 py-2 rounded bg-white text-black focus:outline-none"
                    placeholder="Enter full name"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-white text-sm font-medium mb-1" id="Email">
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  className="w-full px-3 py-2 rounded bg-white text-black focus:outline-none"
                  placeholder="Enter email"
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-white text-sm font-medium mb-1" id="Password">
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type={showPassword ? "text" : "password"}
                  className="w-full px-3 py-2 rounded bg-white text-black focus:outline-none"
                  placeholder="Enter password"
                  required
                  autoComplete={
                    isRegister ? "new-password" : "current-password"
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[42px] text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded bg-gradient-to-r from-[#b74141] to-[#6c1b1b] text-white font-semibold"
              >
                {isRegister ? "Create my account" : "Log in"}
              </button>
            </form>

            {!isRegister && (
              <div className="text-center mt-4">
                <a
                  href="/reset-password"
                  className="text-sm text-white underline hover:text-gray-300 transition"
                >
                  Forgot password?
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
