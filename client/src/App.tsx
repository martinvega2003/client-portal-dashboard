// Libraries`
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Contexts
import { ThemeProvider } from './context/ThemeModeContext'
import { AuthProvider } from './context/AuthContext'

// Pages and Components
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar';
import InitialPage from './pages/InitialPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import Auth from './pages/Auth';

// Routes
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

function App() {

  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <ToastContainer position="top-right" autoClose={3000} />
          <Navbar />
          <Sidebar />
          <Routes>

            {/* Initial And Auth Related Public Pages */ }
            <Route
              path="/"
              element={
                <PublicRoute>
                  <InitialPage />
                </PublicRoute>
              }
            />

            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              }
            />

            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />

            {/* Protected Routes */ }
            <Route
              path="/auth"
              element={
                <ProtectedRoute>
                  <Auth />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ ThemeProvider>
    </AuthProvider>
  )
}

export default App
