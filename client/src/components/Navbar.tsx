import React from "react";
import { useTheme } from "../context/ThemeModeContext";
import { useNavigate } from "react-router-dom";
import { FaMoon, FaSun, FaHome } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Get isAuthenticated and logout function from AuthContext
  const { isAuthenticated, logout } = useAuth()!;

  return (
    <nav className="fixed top-0 h-16 p-4 bg-gray-200 dark:bg-gray-800 flex justify-between border-b border-gray-300 dark:border-gray-700 w-full">
      <span 
        onClick={() => navigate('/')} 
        className="text-xl hover:text-cyan-800 dark:text-white dark:hover:text-cyan-200 flex justify-center items-center gap-2 cursor-pointer transition duration-300">
          <div className="no-color-transition">
            <FaHome />
          </div> Home
      </span>
      <div className="flex justify-center items-center gap-4">
        {isAuthenticated && (
          <Button
            variant="text"
            textColor="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
            onClick={() => {
              logout();
              navigate('/');
            }}
          >logout</Button>
        )}
        {theme !== "light" ? (
          <button
            onClick={toggleTheme}
            className="bg-gray-600 text-white hover:text-yellow-300 px-3 py-1 flex justify-start items-center gap-2 rounded-md transition duration-300 cursor-pointer"
          >
            <div className="no-color-transition">
              <FaSun className="no-color-transition" />
            </div> Light
          </button>
        ) : (
          <button
            onClick={toggleTheme}
            className="bg-gray-300 hover:text-blue-800 px-3 py-1 flex justify-start items-center gap-2 rounded-md transition duration-300 cursor-pointer"
          >
            <div className="no-color-transition">
              <FaMoon className="no-color-transition" />
            </div> Dark
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
