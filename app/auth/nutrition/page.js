"use client";
import React, { useState } from "react";
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
const Recipes = () => {
  const [steps, setSteps] = useState([]);
  const [search, setSearch] = useState("");
  const [titles, setTitles] = useState([]);
  const [error, setError] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [nutrition, setNutrition] = useState(null);
  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState({});

  const clearDetails = () => {
    setIngredients([]);
    setSteps([]);
    setNutrition(null);
  };

  const handleFetchIngredients = async (recipeId) => {
    setLoadingDetails((prev) => ({ ...prev, [recipeId]: { ...prev[recipeId], ingredients: true } }));
    clearDetails(); // Clear other details before fetching ingredients
    try {
      const response = await fetch(`https://cosylab.iiitd.edu.in/recipe/${recipeId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch details for recipe ID: ${recipeId}`);
      }
      const data = await response.json();
      console.log('Ingredients Response:', data); // Log response
      setIngredients(data.payload?.ingredients || []);
    } catch (err) {
      setError(`Error fetching ingredients: ${err.message}`);
      setIngredients([]);
    } finally {
      setLoadingDetails((prev) => ({ ...prev, [recipeId]: { ...prev[recipeId], ingredients: false } }));
    }
  };
  

  const handleFetchSteps = async (recipeId) => {
    setLoadingDetails((prev) => ({ ...prev, [recipeId]: { ...prev[recipeId], steps: true } }));
    clearDetails(); // Clear other details before fetching steps
    try {
      const response = await fetch(`https://cosylab.iiitd.edu.in/recipe/${recipeId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch details for recipe ID: ${recipeId}`);
      }
      const data = await response.json();
      setSteps(data.payload?.instructions || []);
    } catch (err) {
      setError(`Error fetching steps: ${err.message}`);
      setSteps([]);
    } finally {
      setLoadingDetails((prev) => ({ ...prev, [recipeId]: { ...prev[recipeId], steps: false } }));
    }
  };

  const handleFetchNutrition = async (recipeId) => {
    setLoadingDetails((prev) => ({ ...prev, [recipeId]: { ...prev[recipeId], nutrition: true } }));
    clearDetails(); // Clear other details before fetching nutrition
    try {
      const response = await fetch(`https://cosylab.iiitd.edu.in/recipe/${recipeId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch details for recipe ID: ${recipeId}`);
      }
      const data = await response.json();
      setNutrition(data.payload?.nutritions || null);
    } catch (err) {
      setError(`Error fetching nutrition details: ${err.message}`);
      setNutrition(null);
    } finally {
      setLoadingDetails((prev) => ({ ...prev, [recipeId]: { ...prev[recipeId], nutrition: false } }));
    }
  };

  const fetchRecipe = async () => {
    setLoadingRecipes(true);
    setError(null);
    setTitles([]);
    clearDetails(); // Clear any previously displayed details when new search is made

    const url = `https://cosylab.iiitd.edu.in/recipe-search/recipe?pageSize=10&searchText=${encodeURIComponent(search)}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setTitles(data.payload?.data || []);
    } catch (err) {
      setError(`Error fetching recipes: ${err.message}`);
      setTitles([]);
    } finally {
      setLoadingRecipes(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fetchRecipe();
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
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
      

      
      <main style={divStyle} className=" py-8 px-4 flex-grow">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 animate__animated animate__fadeIn">
          Recipes App
        </h1>

        <div className="max-w-4xl mx-auto mb-6 animate__animated animate__fadeInUp">
          {/* <label htmlFor="search" className="block font-medium mb-2 text-gray-700">Search for Recipes</label> */}
          <div className="flex">
            <input
              type="text"
              id="search"
              placeholder="Enter recipe name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 rounded-l-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-5 "
            />
            <button
              onClick={fetchRecipe}
              disabled={loadingRecipes}
              className="rounded-r-md bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 px-4 py-2 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              {loadingRecipes ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 text-center mb-6 animate__animated animate__shakeX">{error}</p>}

        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {titles.length > 0 ? (
            titles.map((recipe, index) => (
              <div
  key={index}
  className="bg-white rounded-lg shadow-lg hover:shadow-xl p-6 transition-transform duration-300 ease-in-out transform hover:scale-105"
>
  <h3 className="text-2xl font-bold mb-4 text-gray-800">{recipe.Recipe_title.replace(/<[^>]+>/g, "") || "No Title"}</h3>
  
  <div className="flex flex-wrap justify-between gap-2 mt-4">
    <button
      onClick={() => handleFetchIngredients(recipe.Recipe_id)}
      disabled={loadingDetails[recipe.Recipe_id]?.ingredients}
      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 transition-all duration-300 ease-in-out transform hover:scale-105 w-full sm:w-auto"
    >
      {loadingDetails[recipe.Recipe_id]?.ingredients ? "Loading..." : "Ingredients"}
    </button>
    
    <button
      onClick={() => handleFetchSteps(recipe.Recipe_id)}
      disabled={loadingDetails[recipe.Recipe_id]?.steps}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 transition-all duration-300 ease-in-out transform hover:scale-105 w-full sm:w-auto"
    >
      {loadingDetails[recipe.Recipe_id]?.steps ? "Loading..." : "Steps"}
    </button>
    
    <button
      onClick={() => handleFetchNutrition(recipe.Recipe_id)}
      disabled={loadingDetails[recipe.Recipe_id]?.nutrition}
      className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-400 transition-all duration-300 ease-in-out transform hover:scale-105 w-full sm:w-auto"
    >
      {loadingDetails[recipe.Recipe_id]?.nutrition ? "Loading..." : "Nutrition"}
    </button>
  </div>
</div>

            ))
          ) : (
            <p className="text-center text-xl text-gray-600">No recipes found.</p>
          )}
        </div>
        {ingredients.length > 0 && (
          <section className="mt-8 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-teal-400 text-center">
            Ingredients
          </h2>
          <ul className="list-disc pl-6 text-black space-y-4">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="leading-relaxed">
                {ingredient.ingredient && (
                  <span className="font-semibold">{ingredient.ingredient}</span>
                )}
                {ingredient.quantity && (
                  <span> - {ingredient.quantity}</span>
                )}
                {ingredient.unit && <span> {ingredient.unit}</span>}
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
        </section>
        
        )}

        {/* Steps Section */}
        {steps.length > 0 && (
          <section className="mt-8 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-teal-400 text-center">
            Steps
          </h2>
          <ol className="list-decimal pl-6 text-black space-y-4">
            {steps.map((step, index) => (
              <li key={index} className="leading-relaxed">
                {step}
              </li>
            ))}
          </ol>
        </section>
        
        )}

        {/* Nutrition Section */}
          {nutrition && (
            <section className="mt-8 flex justify-center">
            <div className="max-w-lg bg-white p-6 rounded-lg shadow-xl border border-gray-200">
              <h2 className="text-3xl font-bold mb-6 text-teal-500 text-center">
                Nutrition Details
              </h2>
              <ul className="list-none text-gray-700 space-y-4">
                <li className="flex justify-between">
                  <span className="font-semibold">Calcium:</span>
                  <span>{nutrition["Calcium, Ca (mg)"]} mg</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">Protein:</span>
                  <span>{nutrition["Protein (g)"]} g</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">Cholesterol:</span>
                  <span>{nutrition["Cholesterol (mg)"]} mg</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">Sugar:</span>
                  <span>{nutrition["Sugars, total (g)"]} g</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">Fat:</span>
                  <span>{nutrition["Total lipid (fat) (g)"]} g</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">Caffeine:</span>
                  <span>{nutrition["Caffeine (mg)"]} mg</span>
                </li>
              </ul>
            </div>
          </section>
          )}
      </main>
      
      
    </div>
  );
};

export default Recipes;
