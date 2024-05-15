import React from 'react'
import { useState, useEffect } from 'react'
import LoadingBar from 'react-top-loading-bar'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate();


  const handleTOPLoad = () => {
    setProgress(10); // Set initial progress

    setTimeout(() => {
      setProgress(30); // Update progress after 1 second
    }, 1000);

    setTimeout(() => {
      setProgress(50); // update progress after 2 seconds
    }, 2000);

    setTimeout(() => {
      setProgress(100); // update progress after 3 seconds
      // Check network connection before navigating
      if (navigator.onLine) {
        navigate('/home');
      } else {
        alert('No internet connection. Please check your network settings.');
      }
    }, 3000);
  };


  return (
    <>
      <div className="w-full text-secondColor font-secondFont mt-24 px-8">
        <div className="w-3/4 rounded-md h-[32rem] mx-auto bg-[#2C3E50] flex flex-col justify-evenly items-center gap-4 max-[640px]:h-[25rem] max-[640px]:w-11/12">
          <h1 className='text-5xl font-semibold max-[640px]:text-3xl text-center'>Welcome to Cinemaplay</h1>
          <div className="object-cover">
            <img className='' src="./Cover.png" alt="" />
          </div>
          <p className='text-center max-[640px]:text-xs px-2'>Explore a Universe of Unlimited Movies and Endless Entertainment, Exclusively at Cinemaplay!</p>
        </div>
        <div className="flex items-center justify-center my-6">
          <button className='px-2 py-1 bg-elemColor text-zinc-900 font-medium rounded-sm' onClick={handleTOPLoad}>
            Enter Homepage
          </button>
          <LoadingBar
            color='#f11946'
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
        </div>



      </div>
    </>
  )
}

export default LandingPage
