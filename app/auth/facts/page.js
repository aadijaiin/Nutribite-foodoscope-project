"use client";
import React, { useState } from "react";
import Link from 'next/link'
const foodFacts = [
    "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still safe to eat.",
    "Bananas are berries, but strawberries are not.",
    "Avocados and watermelon are classified as berries.",
    "Carrots were originally purple, not orange.",
    "Peanuts are not nuts; they are legumes.",
    "Tomatoes were once thought to be poisonous in Europe.",
    "The world's most expensive spice is saffron.",
    "Potatoes were the first vegetable grown in space.",
    "Chocolate was once used as currency in ancient civilizations like the Aztecs.",
    "Pineapples take two years to grow.",
    "Ripe cranberries can bounce; that's how farmers know they are ready for harvesting.",
    "Apples float in water because they are 25% air.",
    "There are over 7,500 varieties of apples worldwide.",
    "Coffee beans are actually seeds of the coffee fruit, often called coffee cherries.",
    "Vanilla is the second most expensive spice after saffron.",
    "The popsicle was invented by an 11-year-old in 1905 by accident.",
    "Fortune cookies were invented in the United States, not China.",
    "Arachibutyrophobia is the fear of peanut butter sticking to the roof of your mouth.",
    "Lemons contain more sugar than strawberries.",
    "One of the first food items consumed on the moon was bacon.",
    "Margherita pizza is named after Queen Margherita of Savoy.",
    "An average ear of corn has about 800 kernels arranged in 16 rows.",
    "Almonds are seeds, not nuts.",
    "The most stolen food in the world is cheese.",
    "Chickpeas are also known as garbanzo beans.",
    "The French word for “broccoli” is “chou-fleur,” which means “flowering cabbage.”",
    "Rice is a staple food for more than half of the world's population.",
    "Watermelons are 92% water.",
    "Eggs age more in one day at room temperature than in one week in the refrigerator.",
    "Oregano means 'joy of the mountain' in Greek.",
    "The largest pumpkin ever grown weighed over 2,600 pounds.",
    "There are about 10,000 taste buds on your tongue.",
    "The most expensive coffee in the world, Kopi Luwak, is made from beans eaten and excreted by a civet.",
    "The word 'hamburger' comes from Hamburg, Germany, not ham.",
    "Chewing gum while cutting onions can prevent tears.",
    "The original recipe for Coca-Cola included coca leaves, which contain cocaine.",
    "Hot dogs were first called 'dachshund sausages.'",
    "Ketchup was once sold as medicine in the 1830s.",
    "Grapes will explode if you microwave them.",
    "Milk was first delivered in glass bottles in 1878.",
    "White chocolate is not technically chocolate, as it doesn't contain cocoa solids.",
    "Pistachios are seeds, not nuts.",
    "Arachibutyrophobia is the fear of peanut butter sticking to the roof of your mouth.",
    "Broccoli contains more protein per calorie than steak.",
    "Eating an apple gives you more energy than a cup of coffee.",
    "Ginger can help reduce nausea.",
    "The dots on raspberries are called drupelets.",
    "Ice cream was once called 'cream ice' in 17th-century England.",
    "French fries originated in Belgium, not France.",
    "Popcorn has been around for more than 5,000 years.",
    "Cucumbers are 95% water.",
    "Mushrooms are more closely related to animals than plants.",
    "In Japan, square watermelons are grown for easy stacking and shipping.",
    "In the U.S., a pound of peanut butter must contain at least 90% peanuts.",
    "Sugar was once considered a luxury and was called 'white gold.'",
    "Eating carrots can help improve night vision.",
    "Capsaicin, found in chili peppers, is what gives them their heat.",
    "Potatoes are the most commonly consumed vegetable in the United States.",
    "Cinnamon is made from the inner bark of trees.",
    "There are over 1,200 varieties of watermelon.",
    "The Caesar salad originated in Mexico.",
    "The most expensive mushroom is the white truffle.",
    "Mozzarella is traditionally made from buffalo milk.",
    "The first written recipe was for beer, dating back to 5,000 BC.",
    "Rhubarb leaves are poisonous.",
    "Almonds are a member of the rose family.",
    "Peppers are fruits, not vegetables.",
    "Chili peppers are measured in Scoville Heat Units (SHU).",
    "Eating garlic can repel mosquitoes.",
    "Onions contain a natural sugar called sucrose.",
    "Maple syrup comes from the sap of maple trees.",
    "Tea is the most consumed beverage in the world after water.",
    "A cluster of bananas is called a hand, and a single banana is called a finger.",
    "Coconut water can be used as an emergency blood plasma substitute.",
    "Cheese is the most stolen food item worldwide.",
    "A single strand of spaghetti is called a spaghetto.",
    "Avocado seeds contain more antioxidants than the fruit.",
    "The holes in Swiss cheese are called 'eyes.'",
    "Bread was first made over 30,000 years ago.",
    "Blueberries are one of the only foods that are naturally blue in color.",
    "Peppers are classified as fruits because they contain seeds.",
    "Honey is the only food that includes all the substances necessary to sustain life.",
    "Figs contain wasp parts as part of their pollination process.",
    "Caramel was first created by the Arabs in the 10th century.",
    "A tomato is both a fruit and a vegetable.",
    "Sweet potatoes and yams are not the same.",
    "Corn is grown on every continent except Antarctica.",
    "Salt was used as currency in ancient Rome.",
    "Olive oil has been used for over 4,000 years.",
    "Soy sauce was first made in China over 2,500 years ago.",
    "The average American eats 35 pounds of cheese each year.",
    "It takes about 50 gallons of sap to make one gallon of maple syrup.",
    "There are 350 slices in an average loaf of bread.",
    "The first chocolate bar was made in 1847.",
    "The world's oldest bottle of wine is over 1,650 years old.",
    "Honeybees must visit about 2 million flowers to make one pound of honey.",
    "Dark chocolate contains antioxidants that are good for your heart.",
    "The color of a chili pepper does not determine its heat level.",
    "Grapefruit can interfere with certain medications.",
    "Pasta is traditionally eaten with a fork and spoon in Italy.",
    "Yogurt is one of the oldest fermented foods, dating back to 6,000 BC."
  ];
  

const RandomFact = () => {
  const [fact, setFact] = useState(getRandomFact());

  function getRandomFact() {
    return foodFacts[Math.floor(Math.random() * foodFacts.length)];
  }

  const handleNewFact = () => {
    setFact(getRandomFact());
  };

  return (
    <div>
        <header className="bg-[#E3FACE] h-[120px] flex items-center justify-between px-5 relative">
      <Link href="/"><button className="text-5xl font-bold text-green-600 font-sans transition duration-300 ease-in-out transform hover:scale-110">Nutribite</button></Link>
        <nav className="flex items-center space-x-12">
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
          </nav>
        <div className="flex items-center space-x-6">
          <div className="text-black text-2xl">
            <i className="fa-regular fa-user"></i>
          </div>

          <Link href="/auth/signup">
            <button className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white px-9 py-3 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:from-green-500 hover:to-green-700">
              Sign in
            </button>
          </Link>
        </div>
      </header>
        <div className="scale-150 flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Random Food Fact 🍴</h1>
        <p className="text-lg text-gray-700 mb-6">{fact}</p>
        <button
          onClick={handleNewFact}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
        >
          Show Another Fact
        </button>
      </div>
    </div>
    <footer className="relative bg-green-800 text-white">
        <div className="relative z-10 flex flex-col items-center justify-center py-10 px-6">
          <h2 className="text-2xl font-bold mb-4">Nutribite</h2>
          <p className="text-center text-sm mb-6">
            Serving delicious recipes and nutrition tips. Your ultimate food companion!
          </p>
          <div className="flex space-x-6">
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
};

export default RandomFact;