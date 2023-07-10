import React from 'react'
import { useNavigate } from 'react-router-dom';

const Sucess = () => {
    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate("/showthings");
    }
    const handlePublish = ()=>{
      navigate("/publish");
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-700">
          <h1 className="text-6xl font-bold text-white mb-8">Success!</h1>
          <p className="text-xl text-white">Your request has been processed successfully.</p>
          <br/>
          <br/>
          <div className='flex flex-row'>
          <button onClick={handleClick} className='px-10 py-4 text-xl font-semibold text-center text-white transition duration-300 rounded-lg hover:from-purple-600 hover:to-pink-600 ease bg-gradient-to-br from-blue-500 to-red-500 md:w-auto'>Take Survey Quiz</button>
          <button onClick={handlePublish} className='mx-9 px-10 py-4 text-xl font-semibold text-center text-white transition duration-300 rounded-lg hover:from-purple-600 hover:to-pink-600 ease bg-gradient-to-br from-green-500 to-orange-500 md:w-auto'>Publish Form</button>
          </div>
        </div>
      );
}


export default Sucess
