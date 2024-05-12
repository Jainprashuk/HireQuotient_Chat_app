import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import Header from "./components/Header/Header";
import Starter from "./components/Starter";

function App() {
  const { authUser } = useAuthContext();
  const [showStarter, setShowStarter] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStarter(false);
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <>
      {showStarter ? (
        <Starter /> // Render Starter component for the first 5 seconds
      ) : (
        <>
          <Header />
          <div className='p-4 h-screen flex items-center justify-center bg-gradient-to-r from-rose-100 to-teal-100'>
            <Routes>
              <Route
                path='/'
                element={authUser ? <Home /> : <Navigate to={"/login"} />}
              />
              <Route
                path='/login'
                element={authUser ? <Navigate to='/' /> : <Login />}
              />
              <Route
                path='/signup'
                element={authUser ? <Navigate to='/' /> : <SignUp />}
              />
            </Routes>
            <Toaster />
          </div>
        </>
      )}
    </>
  );
}
export default App;
