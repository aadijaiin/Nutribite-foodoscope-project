"use client";
import React, { useState, useEffect } from "react";

const Explore = () => {
  const [recipe, setRecipe] = useState(null); // State to store recipe data
  const [error, setError] = useState(null); // State to handle errors

  const url = "https://cosylab.iiitd.edu.in/recipe/recipeOftheDay";

  const fetchRecipeOfTheDay = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.success === "true") {
        setRecipe(data.payload); // Set the recipe data
        setError(null); // Clear any previous errors
      } else {
        setError(data.message || "Failed to fetch recipe");
      }
    } catch (err) {
      setError("Error fetching recipe: " + err.message);
    }
  };

  useEffect(() => {
    fetchRecipeOfTheDay(); // Fetch recipe data on component mount
  }, []);

  return (
    <div className="transition duration-300 ease-in-out transform hover:scale-110 backdrop-blur-md from-green-100 via-green-50 to-green-200 p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-green-800 mb-4 text-center">
        Recipe of the Day
      </h1>

      {/* Display error if any */}
      {error && (
        <p className="text-red-500 text-center font-medium">{error}</p>
      )}

      {/* Display recipe if data is available */}
      {recipe ? (
        <div className="bg-gradient-to-r p-6 rounded-lg shadow-md border border-green-300">
          <h2 className="text-2xl font-semibold text-green-700 mb-3">
            {recipe.Recipe_title}
          </h2>

          {/* Uncomment to use the image */}
          {/* <img
            src={recipe.img_url}
            alt={recipe.Recipe_title}
            className="w-full h-auto rounded-md mb-4"
          /> */}

          <p className="text-gray-700 mb-2">
            <strong className="text-green-600">Region:</strong> {recipe.Region}{" "}
            ({recipe.Sub_region})
          </p>
          <p className="text-gray-700 mb-2">
            <strong className="text-green-600">Calories:</strong>{" "}
            {recipe.Calories} kcal
          </p>
          <p className="text-gray-700 mb-4">
            <strong className="text-green-600">Servings:</strong>{" "}
            {recipe.servings}
          </p>
          <a
            href={recipe.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition block text-center"
          >
            View Full Recipe
          </a>
        </div>
      ) : (
        !error && <p className="text-gray-600 text-center">Loading...</p>
      )}
    </div>
  );
};

export default Explore;
