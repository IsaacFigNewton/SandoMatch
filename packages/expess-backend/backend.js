//backend.js

import express from "express";
import cors from "cors";
import sandwiches from 
  "../../sandwich-dataset/formatted_sandwich_entries.json";

const app express();
const port = 8000;

app.use(cors());
app.use(express.json());

const findSandwichByRating = (rating) => {
  return sandwiches.filter(
    (sandwich) => sandwich["rating"] === rating
  );
};

const findSandwichByCalories = (calories) => {
  return sandwiches.filter(
    (sandwich) => sandwich["calories"] === calories
  );
};

const findSandwichByCost = (cost) => {
  return sandwiches.filter(
    (sandwich) => sandwich["cost"] === cost
  );
};

//Get sandwich by rating
app.get("/sandwiches", (req, res) => {
  const rating = req.query.rating;
  if (rating != undefined) {
    let result = findSandwichByRating(rating);
    result = //ask about this part;
    res.send(result);
  } else {
    res.send(sandwiches);
  }
});

//Get sandwich by calories
app.get("/sandwiches", (req, res) => {
  const calories = req.query.calories;
  if (calories != undefined) {
    let result = findSandwichByCalories(calories);
    result = //ask about this part;
    res.send(result);
  } else {
    res.send(sandwiches);
  }
});

//Get sandwich by cost
app.get("/sandwiches", (req, res) => {
  const cost = req.query.cost;
  if (cost != undefined) {
    let result = findSandwichByCost(cost);
    result = //ask about this part;
    res.send(result);
  } else {
    res.send(sandwiches);
  }
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

