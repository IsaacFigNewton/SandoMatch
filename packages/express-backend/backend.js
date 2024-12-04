// backend.js
import dotenv from "dotenv";
dotenv.config();

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
import UserModel from "./models/users.js";

// Services
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
    restaurantIngredientsPath,
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

//adding a sando to the users bookmark field
app.post("/users/bookmark", authenticateUser, (req, res) => {
  console.log("req.user:", req.user);
  const { sandwichId } = req.body;
  const userId = req.user._id;

  if (sandwichId === undefined || sandwichId === null) {
    return res.status(400).json({error: "No sandwich Id"});
  }

  let validSandoId;
  try {
    validSandoId = new mongoose.Types.ObjectId(sandwichId);
  } catch (error) {
    return res.status(400).json({ error: "Invalid sando id"});
  }

  UserModel.findById(userId)
    .then((user) => {
      console.log("User found:", user);
      if (!user) {
        return res.status(404).json({error: "user not found"});
      }

      if (!user.bookmarkedSandos.includes(validSandoId)) {
        user.bookmarkedSandos.push(validSandoId);
        return user.save().then(() => {
          res.status(200).json({ message: "Sando bokmarked:"});
        });
      } else {
        return res.status(200).json({ message: "Sando allready bookmarked"});
      }

    })
    .catch((error) => {
      console.error("Error bookmarking sando", error);
    });
});

//adding sando to user's tried field

app.post("/users/try", authenticateUser, (req, res) => {
  console.log("req.user:", req.user);
  const { sandwichId } = req.body;
  const userId = req.user._id;

  console.log("Request Body:", req.body);
  console.log("User ID:", req.user._id);


  if (sandwichId === undefined || sandwichId === null) {
    return res.status(400).json({error: "No sandwich Id"});
  }

  let validSandoId;
  try {
    validSandoId = new mongoose.Types.ObjectId(sandwichId);
  } catch (error) {
    return res.status(400).json({ error: "Invalid sando id"});
  }

  UserModel.findById(userId)
    .then((user) => {
      console.log("User found:", user);
      if (!user) {
        return res.status(404).json({error: "user not found"});
      }

      if (!user.triedSandos.includes(validSandoId)) {
        user.triedSandos.push(validSandoId);
        return user.save().then(() => {
          res.status(200).json({ message: "Sando tried:"});
        });
      } else {
        return res.status(200).json({ message: "Sando allready tried"});
      }

    })
    .catch((error) => {
      console.error("Error trying sando", error);
    });
});

app.post("/users/favorite", authenticateUser, (req, res) => {
  console.log("req.user: ", req.user);
  const { sandwichId } = req.body;
  const userId = req.user._id;

  if (sandwichId === undefined || sandwichId === null) {
    return res.status(400).json({ error: "No sandwich Id"});
  }

  let validSandoId;
  try {
    validSandoId = new mongoose.Types.ObjectId(sandwichId);
  } catch (error) {
    return res.status(400).json({ error: "Invalid sando id"});
  }

  UserModel.findById(userId)
    .then((user) => {
      console.log("User found:", user);
      if (!user) {
        return res.status(404).json({ error: "user not foound"});
      }

      user.favoriteSando = validSandoId;
      return user.save().then(() => {
        res.status(200).json({ message: "favorite sando set"});
      });
    })
    .catch((error) => {
      console.error("Error setting favorite sandwich", error);
    });
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

  const result = sandoFilters.findSandwichById(id);
  

  if (result === undefined) {
    res.status(404).send("Sandwich not found.");
  } else {
    res.send(result);
  }
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