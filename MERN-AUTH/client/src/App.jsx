import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./components/Form.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Nico from "./pages/nico.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AppContextProvider } from "./context/AppContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeadEndPage from "./pages/DeadEndPage.jsx";
import PageisLoading from "./pages/PageisLoading.jsx";
import Logout from "./pages/Logout.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Layout from "./components/Layout.jsx";
import SidebarItem from "./components/Sidebar.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Features from "./pages/Features.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Orders from "./pages/Orders.jsx";
import History from "./pages/History.jsx";
import Settings from "./pages/Settings.jsx";
import OtpPage from "./pages/Otp";

export default function App() {
  return (
    <AppContextProvider>
      <ToastContainer />
      <Router>
        <main className="App flex m-0 p-0">
          <Routes>
            {/*Public Routes*/}
            <Route path="/" element={<Form />} />
            <Route path="/side-bar" element={<Sidebar />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/404" element={<DeadEndPage />} />
            <Route path="/pageisloading" element={<PageisLoading />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/send-otp" element={<OtpPage />} />

            {/*Private Routes*/}
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="features" element={<Features />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="history" element={<History />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </main>
      </Router>
    </AppContextProvider>
  );
}
