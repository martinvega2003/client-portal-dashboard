import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button';
import CustomMessage from '../components/CustomMessage';
import { registerSchema } from '../schemas/auth.schemas';
import api from '../api/api';
import axios from 'axios';
import { notifySuccess } from '../utils/toast';
import { useAuth } from '../context/AuthContext';

const RegisterPage: React.FC = () => {

  interface RegisterData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  const [registerData, setRegisterData] = useState<RegisterData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  type RegisterErrors = Partial<Record<keyof RegisterData, string>>
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [registerError, setRegisterError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Get login function from AuthContext
  const { login } = useAuth()!;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async () => {

    // Validate using Zod schema
    const result = registerSchema.safeParse(registerData);
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
      const response = await api.post("/auth/register/", {
        username: registerData.username,
        email: registerData.email,
        password: registerData.password
      });
      setRegisterData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      // On successful registration, get token and user from response
      const { token, user } = response.data;
      login(token, user); // Update context and localStorage

      notifySuccess("Registration successful!");
      navigate('/auth');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const backendError: string = error.response.data?.error || "Unexpected server error";
          setRegisterError(backendError);
        } else if (error.request) {
          setRegisterError("No response from server. Please try again.");
        } else {
          setRegisterError(error.message);
        }
      } else {
        setRegisterError("An unexpected error occurred");
      }
      setTimeout(() => setRegisterError(null), 5000); // Clear error after 5 seconds
      console.error("Registration error:", error);
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
          Register or <Button variant='link' onClick={() => navigate('/login')}>Login</Button> if you already have an account
        </p>

        <input 
          type="text" 
          name='username'
          placeholder='Username'
          onChange={handleChange}
          value={registerData.username}
          className="w-full px-4 sm:px-8 py-4 mb-4 dark:text-white text-sm sm:text-md md:text-lg placeholder:text-gray-400 border border-cyan-800 dark:border-cyan-200 rounded-full outline-0" 
        />

        {errors.username && <p className="text-sm text-red-500 mb-4 ml-4 sm:ml-8">{errors.username}</p>}

        <input 
          type="email" 
          name='email'
          placeholder='Email'
          onChange={handleChange}
          value={registerData.email}
          className="w-full px-4 sm:px-8 py-4 mb-4 dark:text-white text-sm sm:text-md md:text-lg placeholder:text-gray-400 border border-cyan-800 dark:border-cyan-200 rounded-full outline-0" 
        />

        {errors.username ? null : errors.email ? <p className="text-sm text-red-500 mb-4 ml-4 sm:ml-8">{errors.email}</p> : null}

        <input 
          type="password" 
          name='password'
          placeholder='Password'
          onChange={handleChange}
          value={registerData.password}
          className="w-full px-4 sm:px-8 py-4 mb-4 dark:text-white text-sm sm:text-md md:text-lg placeholder:text-gray-400 border border-cyan-800 dark:border-cyan-200 rounded-full outline-0" 
        />

        {errors.username || errors.email ? null : errors.password ? <p className="text-sm text-red-500 mb-4 ml-4 sm:ml-8">{errors.password}</p> : null}

        <input 
          type="password" 
          name='confirmPassword'
          placeholder='Confirm Password'
          onChange={handleChange}
          value={registerData.confirmPassword}
          className="w-full px-4 sm:px-8 py-4 mb-4 dark:text-white text-sm sm:text-md md:text-lg placeholder:text-gray-400 border border-cyan-800 dark:border-cyan-200 rounded-full outline-0" 
        />

        {errors.username || errors.email || errors.password ? null : errors.confirmPassword ? <p className="text-sm text-red-500 mb-4 ml-4 sm:ml-8">{errors.confirmPassword}</p> : null}

        {registerError && <CustomMessage type="error" text={registerError} className='w-full' />}

        <Button 
          onClick={handleSubmit} 
          variant='gradient' 
          textColor='text-white'
          gradientFrom='from-cyan-300 dark:from-cyan-500' 
          gradientTo='to-cyan-700 dark:to-cyan-900' 
          className='mb-4 w-full py-4 rounded-full'
          >
          Register
        </Button>

      </div>
    </div>
  )
}

export default RegisterPage;
