import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button';

const InitialPage: React.FC = () => {

  const navigate = useNavigate();

  return (
    <div className='w-screen h-fit lg:h-screen flex justify-center items-center'>
      <div 
        className='w-fit aspect-square 
        bg-transparent sm:bg-white sm:dark:bg-gray-900 px-16 flex 
        flex-col justify-center items-center rounded-2xl sm:shadow-lg 
        text-center sm:border sm:border-gray-300 sm:dark:border-gray-700'
      >
        <h1 className='text-xl sm:text-2xl lg:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-200'>
          Welcome to the PERN Auth App!
        </h1>
        <p className='text-sm sm:text-md md:text-lg mb-12 text-gray-600 dark:text-gray-400'>
          Create an Account or Login if you have one
        </p>
        <Button onClick={() => navigate('/register')} variant='filled' className='mb-4 w-full sm:w-3/4 py-4 rounded-full'>
          Register
        </Button>
        <Button onClick={() => navigate('/login')} variant='outlined' className='w-full sm:w-3/4 py-4 rounded-full'>
          Login
        </Button>
      </div>
    </div>
  )
}

export default InitialPage;
