import React from "react";
import { useAuth } from "../context/AuthContext";

const Auth: React.FC = () => {

  // Get user from AuthContext
  const { user } = useAuth()!;
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center dark:text-gray-200">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {user ? (
        <div className="text-center flex flex-col justify-start items-center">
          <p>Welcome, <span className="font-semibold">{user.username}</span>!</p>
          <p>Your email: <span className="font-semibold">{user.email}</span></p>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  )
};

export default Auth;
