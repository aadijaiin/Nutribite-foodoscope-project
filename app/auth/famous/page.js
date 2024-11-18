"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import backgroundImage from '../../../public/slide-3.jpg';
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
const ContinentFoods = () => {
  const [search, setSearch] = useState(""); // Search query
  const [titles, setTitles] = useState([]); // Recipe titles
  const [error, setError] = useState(null); // Error state

  const fetchTitles = async () => {
    const url = `https://cosylab.iiitd.edu.in/recipe-search/continents?searchText=${search}&pageSize=10`; // Correct string interpolation
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Full Response:', data); // Log the full response
      if (data.success === "true" && Array.isArray(data.payload.data) && data.payload.data.length > 0) {
        setTitles(data.payload.data);
      } else {
        setTitles([]);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError(error.message); // Set error message
      setTitles([]);
    }
  };

  return (
    <div style={divStyle} className="min-h-screen flex flex-col">
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
      

      
      <main  className='flex-grow max-w-4xl mx-auto py-8 px-4'>
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Continent Foods</h1>
        <div className="mb-6">
          
          <div className="flex lg:scale-150">
          <input
  type="text"
  id="search"
  placeholder="Enter continent name"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  onKeyDown={(e) => e.key === "Enter" && fetchTitles()}
  className="flex-1 rounded-l-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2 sm:px-3 sm:py-2 md:px-4 md:py-2"
/>

            <button
              onClick={fetchTitles}
              className="rounded-r-md bg-blue-600 text-white hover:bg-blue-700 px-4 py-2"
            >
              Search
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 text-center mb-6">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {titles.length > 0 ? (
            titles.map((title, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg hover:shadow-xl p-6">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{title.Recipe_title.replace(/<[^>]+>/g, "") || "No Title"}</h3>
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center text-lg text-gray-500">No recipes to display</p>
          )}
        </div>
      </main>

      <footer className="bg-green-800 text-white py-6 mt-auto">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Nutribite</h2>
          <p className="text-center text-sm mb-6">
            Serving delicious recipes and nutrition tips. Your ultimate food companion!
          </p>
          <div className="flex space-x-6">
            <a href="#" className="hover:underline">About Us</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
          <p className="text-xs mt-6">© 2024 Nutribite. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ContinentFoods;
