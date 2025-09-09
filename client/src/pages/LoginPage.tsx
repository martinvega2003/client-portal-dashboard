import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button';
import CustomMessage from '../components/CustomMessage';
import { loginSchema } from '../schemas/auth.schemas';
import api from '../api/api';
import axios from 'axios';
import { notifySuccess } from '../utils/toast';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {

  interface LoginData {
    email: string;
    password: string;
  }

  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  });

  type LoginErrors = Partial<Record<keyof LoginData, string>>
  const [errors, setErrors] = useState<LoginErrors>({});
  const [loginError, setLoginError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Get login function from AuthContext
  const { login } = useAuth()!;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  }
  
  const handleSubmit = async () => {
    
    // Validate using Zod schema
    const result = loginSchema.safeParse(loginData);
    if (!result.success) {
      const error: Record<string, string> = {};
      result.error.issues.forEach(err => {
        error[(err.path[0] as string) || "_"] = err.message;
      });
      setErrors(error);
      return;
    }
    setErrors({});    

    try {
      const response = await api.post("/auth/login/", {
        email: loginData.email,
        password: loginData.password
      });
      setLoginData({
        email: '',
        password: '',
      });

      // On successful login, get token and user from response
      const { token, user } = response.data;
      login(token, user); // Update context and localStorage

      notifySuccess("Successfully logged in");
      navigate('/auth');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // if backend sent a response (e.g., 400 or 401)
        if (error.response) {
          const backendError: string = error.response.data?.error || "Unexpected server error";
          setLoginError(backendError); // using react-toastify
        } else if (error.request) {
          setLoginError("No response from server. Please try again.");
        } else {
          setLoginError(error.message);
        }
      } else {
        setLoginError("An unexpected error occurred");
      }
      setTimeout(() => setLoginError(null), 5000); // Clear error after 5 seconds
      console.error("Login error:", error);
    }
  }

  return (
    <div className='w-screen h-fit lg:h-screen flex justify-center items-center'>
      <div 
        className='w-fit aspect-square 
        bg-transparent sm:bg-white sm:dark:bg-gray-900 px-16 py-4 flex 
        flex-col justify-center items-start rounded-2xl sm:shadow-lg 
        text-center sm:border sm:border-gray-300 sm:dark:border-gray-700'
      >
        <h1 className='text-xl sm:text-2xl lg:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-200'>
          Welcome to the PERN Auth App!
        </h1>

        <p className='text-sm sm:text-md md:text-lg mb-6 text-gray-600 dark:text-gray-400'>
          Login or <Button variant='link' onClick={() => navigate('/register')}>Register</Button> if you don't have an account
        </p>

        <input 
          type="email" 
          name='email'
          placeholder='Email'
          onChange={handleChange}
          value={loginData.email}
          className="w-full px-4 sm:px-8 py-4 mb-4 dark:text-white text-sm sm:text-md md:text-lg placeholder:text-gray-400 border border-green-600 dark:border-green-200 rounded-full outline-0" 
        />

        {errors.email && <p className="text-sm text-red-500 mb-4 ml-4 sm:ml-8">{errors.email}</p>}

        <input 
          type="password" 
          name='password'
          placeholder='Password'
          onChange={handleChange}
          value={loginData.password}
          className="w-full px-4 sm:px-8 py-4 mb-4 dark:text-white text-sm sm:text-md md:text-lg placeholder:text-gray-400 border border-green-600 dark:border-green-200 rounded-full outline-0" 
        />

        {errors.email ? null : errors.password ? <p className="text-sm text-red-500 mb-4 ml-4 sm:ml-8">{errors.password}</p> : null}

        {loginError && <CustomMessage type="error" text={loginError} className='w-full' />}

        <Button 
          onClick={handleSubmit} 
          variant='gradient' 
          textColor='text-white'
          gradientFrom='from-green-300 dark:from-green-500' 
          gradientTo='to-green-700 dark:to-green-900' 
          className='mb-4 w-full py-4 rounded-full'
          >
          Login
        </Button>

      </div>
    </div>
  )
}

export default LoginPage;
