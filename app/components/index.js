'use client'
import Link from 'next/link';
import React from 'react';
import Explore from './recipiofday';
import { Typewriter } from 'react-simple-typewriter';
import backgroundImage from '../../public/slide-2i.png';

export default function LandingPage() {
  const divStyle = { 
    backgroundImage: `url(${backgroundImage.src})`, 
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    height: '100vh' 
  };

  const borderStyle = {
    content: '',
    position: 'absolute',
    top: '120px',  
    width: '100%',
    height: '10px',
    background: 'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    filter: 'blur(5px)'
  };

  return (
    <div className="min-h-screen bg-[#DDFFD0] relative">
      <header className="bg-[#E3FACE] h-[120px] flex items-center justify-between px-5 relative md:h-[100px]">
        <Link href="/"><button className="text-5xl font-bold text-green-600 font-sans transition duration-300 ease-in-out transform hover:scale-110">Nutribite</button></Link>
        <div className="space-x-12 flex flex-col md:flex-row items-center justify-center md:justify-between space-y-4 md:space-y-0 px-5 py-6 bg-[#E3FACE]">
        <Link href="/auth/recipe">
          <button className="text-black text-xl transition duration-300 ease-in-out transform hover:scale-110 hover:text-green-700">Ingredients</button>
        </Link>
        <Link href="/auth/nutrition">
          <button className="text-black text-xl transition duration-300 ease-in-out transform hover:scale-110 hover:text-green-700">Nutrition Analysis</button>
        </Link>
        <Link href="/auth/famous">
          <button className="text-black text-xl transition duration-300 ease-in-out transform hover:scale-110 hover:text-green-700">Continental</button>
        </Link>
        <Link href="/auth/aboutus">
          <button className="text-black text-xl transition duration-300 ease-in-out transform hover:scale-110 hover:text-green-700">About Us</button>
        </Link>
      </div>
        <div className="flex items-center space-x-6">
          <div className="text-black text-2xl hidden md:block">
            <i className="fa-regular fa-user"></i>
          </div>

          <Link href="/auth/signup">
            <button className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white px-9 py-3 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:from-green-500 hover:to-green-700">
              Sign in
            </button>
          </Link>
        </div>
      </header>

      {/* Navigation Links Below the Header */}
      <div className="hidden flex  flex-col md:flex-row items-center justify-center md:justify-between space-y-4 md:space-y-0 px-5 py-6 bg-[#E3FACE]">
        <Link href="/auth/recipe">
          <button className="text-black text-xl transition duration-300 ease-in-out transform hover:scale-110 hover:text-green-700">Ingredients</button>
        </Link>
        <Link href="/auth/nutrition">
          <button className="text-black text-xl transition duration-300 ease-in-out transform hover:scale-110 hover:text-green-700">Nutrition Analysis</button>
        </Link>
        <Link href="/auth/famous">
          <button className="text-black text-xl transition duration-300 ease-in-out transform hover:scale-110 hover:text-green-700">Continental</button>
        </Link>
        <Link href="/auth/aboutus">
          <button className="text-black text-xl transition duration-300 ease-in-out transform hover:scale-110 hover:text-green-700">About Us</button>
        </Link>
      </div>

      

      {/* Navigation Links Below the Header */}
      

      <div style={borderStyle}></div>

      <main className="flex flex-col bg-cover items-center justify-center text-center min-h-[calc(100vh-120px)] md:min-h-[calc(100vh-100px)]" style={divStyle}>
        <h1 className="text-4xl font-bold text-black leading-snug sm:text-3xl">
          <Typewriter 
            words={['What would you like to Cook today?', 'Do you even know what you are going to Cook']}
            loop={5}
            cursor
            cursorStyle='_'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h1>
        <p className="text-lg text-black mt-6 sm:text-base">
          Our job is to fill your tummy with Genuine Food.
        </p>
        <div className="flex space-x-20 mt-10 sm:flex-col sm:space-x-0 sm:space-y-5">
          <Link href="/auth/facts" className="text-2xl text-green-700 transition duration-300 ease-in-out transform hover:scale-110 hover:text-black">
            <button>Explore More</button> 
          </Link>
        </div>
        <div className='mt-20'>
          <Explore />
        </div>
      </main>

      <footer className="relative bg-green-800 text-white py-10 px-6">
        <div className="relative z-10 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Nutribite</h2>
          <p className="text-center text-sm mb-6 sm:text-xs">
            Serving delicious recipes and nutrition tips. Your ultimate food companion!
          </p>
          <div className="flex space-x-6 sm:space-x-3">
            <a href="#" className="hover:underline">
              About Us
            </a>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </div>
          <p className="text-xs mt-6">© 2024 Nutribite. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
