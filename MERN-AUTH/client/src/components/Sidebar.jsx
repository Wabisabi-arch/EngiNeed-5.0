import React, { createContext, useContext, useState } from "react";
import "../index.css";
import logo from "../assets/images/engineedlogo2.png";
import { ChevronFirst, ChevronLast, EllipsisVertical } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const {
    userData,
    backendUrl,
    setUserData,
    getUserData,
    setisLoggedIn,
    loading,
    setLoading,
  } = useContext(AppContext);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [expanded, setExpanded] = useState(true);

  const navigate = useNavigate();

  const logout = async () => {
    try {
      setLoading(true); 
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(backendUrl + "/api/auth/logout");

      if (data.success) {
        setisLoggedIn(false);
        setUserData(null);

        setTimeout(() => {
          navigate("/");
          setLoading(false); 
        }, 1000);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-maroon-900 border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={logo}
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-maroon-800 hover:bg-maroon-700 text-gold-300"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        {userData ? (
          <div className="border-t flex p-3 border-maroon-700">
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-gold-300 text-maroon-900">
              {userData.name[0]}
            </div>
            <div
              className={`flex justify-between items-center transition-all ${
                expanded ? "w-auto ml-3" : "w-0"
              }`}
            >
              <div className="leading-4 text-gold-100">
                <h4 className="font-semibold">{userData.name}</h4>
                <span
                  className="text-xs text-gold-300 block max-w-[11rem] truncate"
                  title={userData.email}
                >
                  {userData.email}
                </span>
              </div>

              {/* Ellipsis opens modal */}
              <EllipsisVertical
                className="text-gold-100 cursor-pointer ml-3"
                onClick={() => setShowLogoutModal(true)}
              />
            </div>
            {showLogoutModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm">
                  <h2 className="text-xl font-bold mb-4 text-maroon-900">
                    Confirm Logout
                  </h2>
                  <p className="mb-6 text-maroon-800">
                    Are you sure you want to log out?
                  </p>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowLogoutModal(false)}
                      className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-maroon-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={logout}
                      className="px-4 py-2 rounded bg-maroon-900 text-white hover:bg-maroon-800"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="border-t flex p-3 border-maroon-700">
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-gold-300 text-maroon-900">
              {userData.name[0]}
            </div>
            <div
              className={`flex justify-between items-center transition-all ${
                expanded ? "w-auto ml-3" : "w-0"
              }`}
            >
              <div className="leading-4 text-gold-100">
                <h4 className="font-semibold">{userData.name}</h4>
                <span
                  className="text-xs text-gold-300 block max-w-[11rem] truncate"
                  title={userData.email}
                >
                  {userData.email}
                </span>
              </div>

              {/* Ellipsis opens modal */}
              <EllipsisVertical
                className="text-gold-100 cursor-pointer ml-3"
                onClick={() => setShowLogoutModal(true)}
              />
            </div>
            {showLogoutModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm">
                  <h2 className="text-xl font-bold mb-4 text-maroon-900">
                    Confirm Logout
                  </h2>
                  <p className="mb-6 text-maroon-800">
                    Are you sure you want to log out?
                  </p>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowLogoutModal(false)}
                      className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-maroon-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={logout}
                      className="px-4 py-2 rounded bg-maroon-900 text-white hover:bg-maroon-800"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert, to }) {
  const { expanded } = useContext(SidebarContext);
  return (
    <Link to={to}>
      <li
        className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
          active
            ? "bg-gold-200 text-maroon-900"
            : "hover:bg-gold-100 hover:text-maroon-900 text-gold-300"
        }`}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-auto ml-3" : "w-0"
          }`}
        >
          {text}
        </span>

        {!expanded && (
          <div
            className={`absolute left-full rounded-md px-2 py-1 ml-6
            bg-gold-100 text-maroon-900 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
}
