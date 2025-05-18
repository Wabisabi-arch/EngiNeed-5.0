import { createContext, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
export const AppContext = createContext();
const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

export const AppContextProvider = ({ children }) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  const getAuthState = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");
      if (data.success) {
        setisLoggedIn(true);
        await getUserData(); // await ensures userData is ready
      }
    } catch (error) {
      toast.error("Failed to fetch authentication state", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setTimeout(() => setLoading(false), 2000); // 2 seconds delay
      setInitialized(true); // Mark as initialized after check is done
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data");
      data.success
        ? setUserData(data.userData)
        : toast.error("Failed to fetch user data", {
            position: "top-right",
            autoClose: 3000,
          });
    } catch (error) {
      toast.error("Failed to fetch user data", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    if (!initialized) {
      console.log("useEffect ran: checking auth");
      getAuthState(); // Run the authentication check only once
    }
  }, [initialized]); // Dependency array only includes `initialized`

  return (
    <AppContext.Provider
      value={{
        backendUrl,
        isLoggedIn,
        setisLoggedIn,
        userData,
        setUserData,
        getUserData,
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
