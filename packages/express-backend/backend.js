// backend.js
import dotenv from "dotenv";

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// Modules
import sandoFilters from "./modules/filters.js"
import sandoGeneration from "./modules/generation.js";
import { MongoTopologyClosedError } from "mongodb";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Services
import {
  registerUser,
  authenticateUser,
  loginUser
} from "./services/auth.js";
import sandwichService from "./services/sandwich-services.js";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING)
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
let sandwichesList = [];


// Home page
// ----------------------------------------------------------------------------------------
//Sandwiches full list
app.get("/sandwiches", (req, res) => {
  sandwichService.getSandwiches()
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(404).send("Resource not found.");
      }
    })
    .catch((error) => {
      res.status(500).send(error.name);
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
app.get("/sandwiches/filter", (req, res) => {
  const filteredSandwiches = sandoFilters.filterSandwiches(sandwichesList, req.query);
  res.json({ sandwiches_list: filteredSandwiches });
});

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
  
  sandwichService.findSandwichById(id)
    .then((result) => {
      if (result === undefined || result === null) {
        res.status(404).send("Sandwich not found.");
      } else {
        res.send(result);
      }
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});
// ----------------------------------------------------------------------------------------

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
