import React, { createContext, useState, useEffect, useContext } from "react";
import type { ReactNode } from "react";

// Define the shape of user
interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

// Define the context type
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | null>(null);

interface ContextType {
  children: ReactNode;
}

// Create a provider component
export const AuthProvider: React.FC<ContextType> = ({ children }: { children: ReactNode }) => {

  // State to hold user and token
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  // On initial load, check localStorage for token and user
  useEffect(() => {
    if (token) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [token]);

  // Login function to set user and token
  const login = (token: string, user: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  // Logout function to clear user and token
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  // Provide the context values to children
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token, // ✅ flag
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
