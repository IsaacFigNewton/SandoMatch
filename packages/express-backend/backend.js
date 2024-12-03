// backend.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {
  registerUser,
  authenticateUser,
  loginUser
} from "./modules/auth.js";
import { MongoTopologyClosedError } from "mongodb";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sandoFilters from "./modules/filters.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8000;

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING)
  .catch((error) => console.log(error));

app.use(cors());
app.use(express.json());

let costCalEstimates = {};
let restaurantIngredientsList = [];
let sandwichesList = [];
let generatedSandwiches = [];

// Get file paths
const restaurantIngredientsPath = path.resolve(
  __dirname,
  "../../sandwich-dataset/db-tables/restaurant_ingredients.json"
);

const sandwichesPath = path.resolve(
  __dirname,
  "../../sandwich-dataset/db-tables/sandwiches.json"
);

// load the default cost and calorie estimates from the JSON file
try {
  const data = fs.readFileSync(
    restaurantIngredientsPath[0],
    "utf8"
  );
  costCalEstimates = JSON.parse(data);

} catch (err) {
  console.error(
    "Error reading cost and calorie estimates file:",
    err
  );
}
// load sandwiches list from JSON file
try {
  const fileData = fs.readFileSync(sandwichesPath, "utf8");
  sandwichesList = JSON.parse(fileData);
  console.log("Loaded sandwiches table");

} catch (err) {
  console.error("Error reading sandwiches list file:", err);
}

// load restaurant cost and calorie estimates from JSON file
try {
  const fileData = fs.readFileSync(
    restaurantIngredientsPath,
    "utf8"
  );
  restaurantIngredientsList = JSON.parse(fileData);
  console.log("Loaded restaurant-ingredients table");

} catch (err) {
  console.error(
    "Error reading restaurant ingredients file:",
    err
  );
}
console.log("Restaurants file is being read");

// list of non-vegan ingredients for checking
const nonVeganIngredients = ["eggs", "cheese", "meat"];

const getVeganIngredients = () => {
  const veganIngredients = {};
  for (const category in costCalEstimates) {
    veganIngredients[category] = Object.keys(
      costCalEstimates[category]
    ).filter(
      (ingredient) => !nonVeganIngredients.includes(ingredient)
    );
  }
  return veganIngredients;
};

// make a function that selects from the list of ingredients ex: vegetables and check for duplicates
const selectRandomIngredients = (veganIngredients) => {
  return {
    vegetables: veganIngredients.vegetables
      ? veganIngredients.vegetables.slice(0, 2)
      : [], // select 2 random vegetable
    condiments: veganIngredients.condiments
      ? veganIngredients.condiments.slice(0, 1)
      : [], // select 1 random condiment
    spices: veganIngredients.spices
      ? veganIngredients.spices.slice(0, 1)
      : [] // select 1 random spice
  };
};

// vegan route is still in a work in progress
// route to generate vegan sandwich
app.get("/sandwiches/vegan", (req, res) => {
  const veganIngredients = getVeganIngredients();
  const selectedIngredients =
    selectRandomIngredients(veganIngredients);

  // calculate total cost and calories
  const cost = Object.values(selectedIngredients)
    .flatMap((category) =>
      category.map(
        (ingredient) => costCalEstimates[ingredient]?.cost || 0
      )
    )
    .reduce((total, price) => total + price, 0);

  const calories = Object.values(selectedIngredients)
    .flatMap((category) =>
      category.map(
        (ingredient) =>
          costCalEstimates[ingredient]?.calories || 0
      )
    )
    .reduce((total, cal) => total + cal, 0);

  // create vegan sandwich object
  const veganSandwich = {
    id_: sandwichesList.length,
    name: `Vegan Sandwich ${sandwichesList.length + 1}`,
    ingredients: selectedIngredients,
    cost,
    calories,
    dietary_tags: ["vegan"]
  };

  sandwichesList.push(veganSandwich);
  res.send(veganSandwich);
});

//Random
app.get("/sandwiches/random", (req, res) => {
  const randomIndex = Math.floor(
    Math.random() * sandwichesList.length
  );
  const randomSandwich = sandwichesList[randomIndex];

  if (randomSandwich) {
    console.log(randomSandwich);
    res.send(randomSandwich);
  } else {
    console.error("Couldn't find random sandwich");
    res.status(404).send("No sandwich found.");
  }
});

//Sandwiches full list
app.get("/sandwiches", (req, res) => {
  res.send({
    sandwiches_list: sandwichesList
  });
});

//Filter by rating, cost, and calories on Filtering Page
app.post("/sandwiches/filter", (req, res) => {
  
  try {
    console.log("Reading in filter query: ", req.query);
    const {
      ingredients,
      maxCost,
      minCalories,
      maxCalories,
      rating
    } = req.query;
    
  } catch (err) {
    console.error("Error while reading the filter query: ", err)
    return sandwichesList
  }

  // parse the filters' values
  try {
    console.log("Parsing the filter query values: \n", {
      ingredients,
      maxCost,
      minCalories,
      maxCalories,
      rating
    });

    maxCost = parseFloat(maxCost);
    minCalories = parseInt(minCalories);
    maxCalories = parseInt(maxCalories);
    rating = parseInt(rating);
  
  } catch (err) {
    console.error("Error while parsing the filter query: ", err)
    return sandwichesList
  }

  try {
    console.log("Filtering the sandwiches...");
    const filteredSandwiches = sandoFilters.filterSandwiches(
      sandwichesList,
      ingredients.include,
      ingredients.exclude,
      maxCost,
      minCalories,
      maxCalories,
      rating
    )

  } catch (err) {
    console.error("Error while parsing the filter query: ", err)
    return sandwichesList
  }

  if (sandwichesList) {
    res.send(filteredSandwiches)

  } else {
    res.status(404).send("Error while filtering sandwiches on the backend");
  }
});

//Sorting by name, rating, calories, and cost (ascending/descending)
app.get("/sandwiches/sort", (req, res) => {
  const { sortBy } = req.query;

  // hashmap mapping different sorts to sorting functions
  const sortingFunctions = {
    nameAscending: (a, b) => a.name.localeCompare(b.name),
    ratingAscending: (a, b) => a.rating - b.rating,
    caloriesAscending: (a, b) => a.calories - b.calories,
    costAscending: (a, b) => a.cost - b.cost,
    nameDescending: (a, b) => b.name.localeCompare(a.name),
    ratingDescending: (a, b) => b.rating - a.rating,
    caloriesDescending: (a, b) => b.calories - a.calories,
    costDescending: (a, b) => b.cost - a.cost,
  };

  // if a sorting function exists with the sorting query name
  const sortingFunc = sortingFunctions[sortBy]
  if (sortingFunc) {
    
    // do the sorting based on the sortBy query
    const sortedList = sandwichesList.toSorted(sortingFunc);
    res.send({ sandwiches_list: sortedList });
  
  } else {
    res.send(sandwichesList);
  }
});

//Filtering by ingredients on Preference Page
app.post("/sandwiches/preferences", (req, res) => {
  const { include = [], exclude = [] } = req.body;
  console.log("Received filters:", { include, exclude });

  const filteredSandwiches = sandwichesList.filter(
    (sandwich) => {
      const ingredients = Object.values(
        sandwich.ingredients || {}
      ).flatMap((category) => Object.values(category).flat());

      // Case-insensitive include and exclude logic
      const includesAll = include.every((item) =>
        ingredients.some(
          (ingredient) =>
            ingredient.toLowerCase() === item.toLowerCase()
        )
      );
      const excludesAll = exclude.every((item) =>
        ingredients.every(
          (ingredient) =>
            ingredient.toLowerCase() !== item.toLowerCase()
        )
      );

      return includesAll && excludesAll;
    }
  );

  console.log("Filtered sandwiches:", filteredSandwiches);
  res.json(filteredSandwiches);
});

//ID
app.get("/sandwiches/:id", (req, res) => {
  const id = req.params["id"];

  if (isNaN(id)) {
    return res
      .status(400)
      .json({ error: "Invalid sandwich ID." });
  }

  const result = sandoFilters.findSandwichById(
    id,
    sandwichesList
  );

  if (result === undefined) {
    res.status(404).send("Sandwich not found.");
  } else {
    res.send(result);
  }
});

//Sign Up
app.post("/signup", registerUser);

//Authenticate
app.post("/users", authenticateUser, (req, res) => {
  const userToAdd = req.body;
  Users.addUser(userToAdd).then((result) =>
    res.status(201).send(result)
  );
});

//Login
app.post("/login", loginUser);

// -------------------------------
// get ingredients from Specific Restaurant
const getIngredientsForRestaurant = (restaurantId) => {
  console.log("Parsed Data:", restaurantIngredientsList); // log the parse object
  const restaurantEntry = restaurantIngredientsList.find(
    (entry) => entry._id === restaurantId
  );
  return (
    restaurantEntry ||
    restaurantIngredientsList.find(
      (entry) => entry._id === "default"
    )
  );
};

// calculate Cost and Calories
const calculateCostAndCalories = (
  ingredients,
  restaurantData
) => {
  let cost = 0;
  let calories = 0;

  for (const [category, items] of Object.entries(ingredients)) {
    for (const item of items) {
      const ingredientData =
        restaurantData[category]?.[item.toLowerCase()];
      if (ingredientData) {
        cost += parseFloat(ingredientData.cost) || 0;
        calories += parseInt(ingredientData.calories) || 0;
      }
    }
  }
  return { cost, calories };
};

// check for existing sandwich in database
const findExistingSandwich = (ingredients, restaurantId) => {
  return sandwichesList.find(
    (sandwich) =>
      sandwich.restaurant_id === restaurantId &&
      JSON.stringify(sandwich.ingredients) ===
        JSON.stringify(ingredients)
  );
};

// generate Id for a new sandwich
const generateUniqueId = () => Date.now() + Math.random();

// generate sandwich logic based on provided ingredients and associated restaurant data
// route implementation
app.post("/sandwiches/generate", (req, res) => {
  const { ingredients } = req.body; // expecting ingredients from request body

  if (!ingredients || typeof ingredients !== "object") {
    return res.status(400).send("Invalid ingredients");
  }

  const restaurants = ["mr_pickles", "subway"]; // list of restaurants IDs to check
  const sandwiches = []; // local array to Store the sandwiches we generate

  // step 1: generate sandwich using default restaurant data
  const defaultData = getIngredientsForRestaurant("default");
  const defaultCalc = calculateCostAndCalories(
    ingredients,
    defaultData
  );

  const defaultSandwich = {
    id: generateUniqueId(),
    name: "Generated Sandwich",
    ingredients,
    cost: defaultCalc.cost,
    calories: defaultCalc.calories,
    dietary_tags: determineDietaryTags(ingredients),
    restaurant_id: null // no restaurant selected
  };

  sandwiches.push(defaultSandwich);

  // Step 2: Check restaurants for matching ingredient combinations
  for (const restaurant of restaurants) {
    const restaurantData =
      getIngredientsForRestaurant(restaurant);

    // verfify all provided ingredients exist in the restaurants data
    // if ingredients match, calculate for specific restaurant
    const allIngredientsExist = Object.entries(
      ingredients
    ).every(([category, items]) =>
      items.every(
        (item) => restaurantData[category]?.[item.toLowerCase()]
      )
    );

    if (!allIngredientsExist) {
      console.log(
        `Skipping ${restaurant} - Missing ingredients.`
      );
      continue; // skip if ingredients don't match restaurant ingredients
    }

    // check if sandwich with same ingredients already exists
    const existingSandwich = findExistingSandwich(
      ingredients,
      restaurant
    );
    if (existingSandwich) {
      sandwiches.push(existingSandwich);
      continue; // skip if existing sandwich found
    }

    // generate a new sandwich for the restaurant
    const restaurantCalc = calculateCostAndCalories(
      ingredients,
      restaurantData
    );

    const newSandwich = {
      id: generateUniqueId(),
      name: `Generated Sandwich (${restaurant})`,
      ingredients,
      cost: restaurantCalc.cost,
      calories: restaurantCalc.calories,
      dietary_tags: determineDietaryTags(ingredients),
      restaurant_id: restaurant
    };
    sandwiches.push(newSandwich);
  }

  // save the new sandwiches in the sandwiches.json file
  sandwichesList.push(...sandwiches);
  try {
    fs.writeFileSync(
      sandwichesPath,
      JSON.stringify(sandwichesList, null, 2)
    );
    console.log("Updated sandwiches.json file.");
  } catch (err) {
    console.error(
      "Error writing to sandwiches.json file:",
      err
    );
  }
  res.json(sandwiches);
});

// Determine dietary tags
const determineDietaryTags = (ingredients) => {
  const nonVegan = ["cheese", "eggs", "meat"];
  const nonVegetarian = ["meat"];

  const allItems = Object.values(ingredients)
    .flat()
    .map((item) => item.toLowerCase());
  const tags = [];

  if (allItems.every((item) => !nonVegan.includes(item))) {
    tags.push("vegan");
  } else if (
    allItems.every((item) => !nonVegetarian.includes(item))
  ) {
    tags.push("vegetarian");
  }

  return tags;
};

//--------------------------------------------
app.post("/signup", registerUser);

app.post("/users", authenticateUser, (req, res) => {
  const userToAdd = req.body;
  Users.addUser(userToAdd).then((result) =>
    res.status(201).send(result)
  );
});

app.post("/login", loginUser);

// Start the server
app.listen(process.env.PORT || port, () => {
  console.log(
    "If this is a local deployment, then the REST API is listening at http://localhost:8000/, which means you'll have to update the backend URL in the frontend's App.jsx file."
  );
});
