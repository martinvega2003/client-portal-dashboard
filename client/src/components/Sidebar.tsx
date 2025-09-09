import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import { FaArrowRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth()!;
  if (!isAuthenticated) return null;

  const [isOpen, setIsOpen] = useState(true);

  type SidebarLinkProps = {
    to: string;
    label: string;
  };

  const links: SidebarLinkProps[] = [
    { to: "/home", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/profile", label: "Profile" },
    { to: "/settings", label: "Settings" },
  ];

  const SidebarLink = ({ to, label }: SidebarLinkProps) => (
    <NavLink
      to={to}
      className={({ isActive }) => 
        `w-60 h-fit m-2 px-4 py-2 rounded-md transition-colors duration-300 block
        ${!isOpen ? "bg-transparent" : 
        isActive ? 
          "bg-gray-300 dark:bg-gray-700 font-semibold" : 
          "font-normal hover:bg-gray-300 dark:hover:bg-gray-700"
        }`
      }
      onClick={() => setIsOpen(false)} // Close sidebar on link click
    >
      {label}
    </NavLink>
  );

  return (
    <div className={`fixed top-16 left-0 w-64 h-full bg-zinc-100 dark:bg-gray-900 dark:text-white transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-52'}`}>
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        <h2 className="text-lg font-semibold">Sidebar</h2>
        <Button
          variant="text"
          textColor="text-gray-900 hover:text-black dark:text-gray-400 dark:hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaArrowRight className="rotate-180 transition-transform duration-500" /> : <FaArrowRight className="rotate-0 transition-transform duration-500" /> }
        </Button>
      </div>
      <nav className="w-full h-full overflow-y-auto">
        <ul>
          {links.map((link) => (
              <SidebarLink {...link} />
          ))}
          <li>
            <Button 
              variant="text" 
              textColor="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
              className="m-2 px-4 py-2" 
              onClick={logout}
            >
              Logout
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;