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
} from "./auth.js";
import sandoFilters from "./modules/filters.js"
import { MongoTopologyClosedError } from "mongodb";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sandoFilters from "./modules/filters.js";
import sandoGeneration from "./modules/generation.js";
import {
  registerUser,
  authenticateUser,
  loginUser
} from "./services/auth.js";

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


// Load Files
// TODO: Replace this with sandwich and restaurant table CRUD operations
// ----------------------------------------------------------------------------------------
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
// ----------------------------------------------------------------------------------------



// Home page
// ----------------------------------------------------------------------------------------
//Sandwiches full list
app.get("/sandwiches", (req, res) => {
  res.send({
    sandwiches_list: sandwichesList
  });
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
// ----------------------------------------------------------------------------------------

// Sorting and filtering
// ----------------------------------------------------------------------------------------
//Sorting by name, rating, calories, and cost (ascending/descending)
app.get("/sandwiches/sort", (req, res) => {
  const { sortBy } = req.query;

  //Ascending
  const sortByNameAscending = sandwichesList.toSorted((a, b) =>
    a.name.localeCompare(b.name)
  );
  const sortByRatingAscending = sandwichesList.toSorted(
    (a, b) => a.rating - b.rating
  );
  const sortByCaloriesAscending = sandwichesList.toSorted(
    (a, b) => a.calories - b.calories
  );
  const sortByCostAscending = sandwichesList.toSorted(
    (a, b) => a.cost - b.cost
  );
  //Descending
  const sortByNameDescending = sandwichesList.toSorted((a, b) =>
    b.name.localeCompare(a.name)
  );
  const sortByRatingDescending = sandwichesList.toSorted(
    (a, b) => b.rating - a.rating
  );
  const sortByCaloriesDescending = sandwichesList.toSorted(
    (a, b) => b.calories - a.calories
  );
  const sortByCostDescending = sandwichesList.toSorted(
    (a, b) => b.cost - a.cost
  );

  if (sortBy === "nameAscending") {
    res.send({ sandwiches_list: sortByNameAscending });
  } else if (sortBy === "ratingAscending") {
    res.send({ sandwiches_list: sortByRatingAscending });
  } else if (sortBy === "caloriesAscending") {
    res.send({ sandwiches_list: sortByCaloriesAscending });
  } else if (sortBy === "costAscending") {
    res.send({ sandwiches_list: sortByCostAscending });
  } else if (sortBy === "nameDescending") {
    res.send({ sandwiches_list: sortByNameDescending });
  } else if (sortBy === "ratingDescending") {
    res.send({ sandwiches_list: sortByRatingDescending });
  } else if (sortBy === "caloriesDescending") {
    res.send({ sandwiches_list: sortByCaloriesDescending });
  } else if (sortBy === "costDescending") {
    res.send({ sandwiches_list: sortByCostDescending });
  } else {
    res.send(sandwiches);
  }
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
    sandwichesList,
    id
  );

  if (result === undefined) {
    res.status(404).send("Sandwich not found.");
  } else {
    res.send(result);
  }
});

app.get("/sandwiches/filter", (req, res) => {
  const filteredSandwiches = sandoFilters.filterSandwiches(sandwichesList, req.query);
  res.json({ sandwiches_list: filteredSandwiches });
});

// Authentication routes
// ----------------------------------------------------------------------------------------
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
// ----------------------------------------------------------------------------------------



// Filtering, sorting
// ----------------------------------------------------------------------------------------
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
    console.error(
      "Error while reading the filter query: ",
      err
    );
    res.send(sandwichesList);
  }

  // parse the filters' values
  try {
    console.log("Parsing the filter query values:\n", {
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
    console.error(
      "Error while parsing the filter query: ",
      err
    );
    res.send(sandwichesList);
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
    );
  } catch (err) {
    console.error(
      "Error while parsing the filter query: ",
      err
    );
    res.send(sandwichesList);
  }

  console.log("Filtered sandwiches:\n", filteredSandwiches);
  if (filteredSandwiches) {
    res.send(filteredSandwiches);
  } else {
    res
      .status(404)
      .send("Error while filtering sandwiches on the backend");
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
    costDescending: (a, b) => b.cost - a.cost
  };

  // if a sorting function exists with the sorting query name
  const sortingFunc = sortingFunctions[sortBy];
  if (sortingFunc) {
    // do the sorting based on the sortBy query
    const sortedList = sandwichesList.toSorted(sortingFunc);
    res.send({ sandwiches_list: sortedList });
  } else {
    res.send(sandwichesList);
  }
});
// ----------------------------------------------------------------------------------------



// Sandwich Generation
// ----------------------------------------------------------------------------------------
// generate sandwich logic based on provided ingredients and associated restaurant data
// route implementation
app.post("/sandwiches/generate", (req, res) => {
  // expecting ingredients from request body
  const { ingredients } = req.body;

  if (!ingredients || typeof ingredients !== "object") {
    return res.status(400).send("Invalid ingredients");
  }

  const newSandwich =
    sandoGeneration.generateSandwich(ingredients);

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

  // save the new sandwiches in the sandwiches.json file
  sandwichesList.push(newSandwich);
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
// ----------------------------------------------------------------------------------------



// Start the server
app.listen(process.env.PORT || port, () => {
  console.log(
    "If this is a local deployment, then the REST API is listening at http://localhost:8000/, which means you'll have to update the backend URL in the frontend's App.jsx file."
  );
});
