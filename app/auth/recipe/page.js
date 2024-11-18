// app/landing/recipes.js
"use client";
import Recipi2 from "./recipi2";
import React, { useState } from "react";
import Link from 'next/link';
import backgroundImage from '../../../public/slide-3.jpg';
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
const divStyle = { 
  backgroundImage: `url(${backgroundImage.src})`, 
  backgroundSize: 'cover', 
  backgroundPosition: 'center', 
  height: '100vh' 
};
const Recipes = () => {
  const [id, setId] = useState([]); // Recipe IDs
  const [search, setSearch] = useState(""); // Search query
  const [titles, setTitles] = useState([]); // Recipe titles
  const [error, setError] = useState(null); // Error state
  const [ingredients, setIngredients] = useState([]); // Ingredients state
  const [loading, setLoading] = useState(false); // Loading state
  const [selectedRecipeTitle, setSelectedRecipeTitle] = useState(""); // Title for the selected recipe
  const [loadingRecipeId, setLoadingRecipeId] = useState(null); // To track which recipe is being loaded

  const handleFetchIngredients = async (id, title) => {
    setLoading(true);
    setSelectedRecipeTitle(title); // Set the selected recipe title
    setLoadingRecipeId(id); // Set the recipe being loaded

    try {
      const response = await fetch(`https://cosylab.iiitd.edu.in/recipe/${id}`);
      const data = await response.json();

      if (data.payload && Array.isArray(data.payload.ingredients)) {
        setIngredients(data.payload.ingredients);
      } else {
        setIngredients([]);
      }
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fetchRecipe();
    }
  };

  const fetchRecipe = async () => {
    const url = `https://cosylab.iiitd.edu.in/recipe-search/recipe?pageSize=10&searchText=${search}`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success === "true" && Array.isArray(data.payload.data)) {
        const recipeIds = data.payload.data.map((recipe) => recipe.Recipe_id);
        setId(recipeIds);
        setTitles(data.payload.data);
        setError(null);
      } else {
        setTitles([]);
        setError("No recipes found.");
      }
    } catch (err) {
      setError(`Error fetching recipes: ${err.message}`);
      setTitles([]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-100 to-green-300 text-gray-800">
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
      

      


      <main style={divStyle} className="">
        <h1 className="flex-grow max-w-4xl mx-auto p-6 text-3xl font-bold text-center text-green-900 mb-8">
          Recipe Finder
        </h1>
        <div className="flex-grow max-w-4xl mx-auto p-6 flex items-center justify-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search for recipes"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-3 rounded-lg border border-green-500 focus:outline-none focus:ring focus:ring-green-300 transition duration-300 ease-in-out transform hover:scale-105"
          />
          <button
            onClick={fetchRecipe}
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:bg-green-700"
          >
            Search
          </button>
        </div>

        {error && <p className="flex-grow max-w-4xl mx-auto p-6 text-red-600 text-center mb-4">{error}</p>}

        <ul className="flex-grow max-w-4xl mx-auto p-6 space-y-4">
          {titles.length > 0 ? (
            titles.map((recipe, index) => (
              <li
                key={index}
                className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
              >
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-lg text-green-700">
                    {recipe.Recipe_title.replace(/<[^>]+>/g, "") || "No Title"}
                  </h2>
                  <button
                    onClick={() => handleFetchIngredients(recipe.Recipe_id, recipe.Recipe_title)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md shadow transition duration-300 ease-in-out transform hover:scale-105 hover:bg-green-600"
                  >
                    View Ingredients
                  </button>
                </div>

                {loading && loadingRecipeId === recipe.Recipe_id && (
                  <p className="text-center text-green-600 mt-4">Loading...</p>
                )}

                {ingredients.length > 0 && loadingRecipeId === recipe.Recipe_id && (
                  <div className="mt-8 bg-white shadow-md rounded-lg p-6 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
                    <h3 className="text-2xl font-bold text-green-800 mb-4">
                      Ingredients for {selectedRecipeTitle.replace(/<[^>]+>/g, "")}
                    </h3>
                    <ul className="space-y-2">
                      {ingredients.map((ingredient, index) => (
                        <li key={index} className="text-gray-700">
                          <span className="font-semibold">
                            {ingredient.ingredient}:
                          </span>{" "}
                          {ingredient.quantity} {ingredient.unit}
                          {ingredient.Carbohydrate && (
                            <span> | Carbs: {ingredient.Carbohydrate}g</span>
                          )}
                          {ingredient.Protein && (
                            <span> | Protein: {ingredient.Protein}g</span>
                          )}
                          {ingredient.Energy && (
                            <span> | Energy: {ingredient.Energy} kcal</span>
                          )}
                          {ingredient["Total lipid (fat)"] && (
                            <span> | Fat: {ingredient["Total lipid (fat)"]}g</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))
          ) : (
            <div><Recipi2 /></div>
          )}
        </ul>
      </main>

      <footer className="bg-green-800 text-white py-8 px-6">
  <div className="relative z-10 flex flex-col items-center justify-center">
    <h2 className="text-2xl font-bold mb-4 transition duration-300 ease-in-out transform hover:scale-110">Nutribite</h2>
    <p className="text-center text-sm mb-6">
      Serving delicious recipes and nutrition tips. Your ultimate food companion!
    </p>
    <div className="flex space-x-6">
      <a href="#" className="hover:underline transition duration-300 ease-in-out transform hover:scale-110">About Us</a>
      <a href="#" className="hover:underline transition duration-300 ease-in-out transform hover:scale-110">Privacy Policy</a>
      <a href="#" className="hover:underline transition duration-300 ease-in-out transform hover:scale-110">Contact</a>
    </div>
    <p className="text-xs mt-6">© 2024 Nutribite. All Rights Reserved.</p>
  </div>
</footer>
</div>
  )
}
export default Recipes;