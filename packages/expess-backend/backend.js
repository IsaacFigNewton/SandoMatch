//backend.js

import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

//Find by

const findSandwichByRating = (rating) => {
  return sandwiches["sandwiches_list"].filter(
    (sandwich) => sandwich["rating"] >= rating
  );
};

const findSandwichByCalories = (minCalories, maxCalories) => {
  return sandwiches["sandwiches_list"].filter(
    (sandwich) => (!minCalories || sandwich["calories"] >= minCalories) 
    && (!maxCalories || sandwich["calories"] <= maxCalories)
  );
};

const findSandwichByCost = (maxCost) => {
  return sandwiches["sandwiches_list"].filter(
    (sandwich) => sandwich["cost"] <= maxCost
  );
};

const findSandwichByRatingCalories = 
  (rating, minCalories, maxCalories) => {
  return sandwiches["sandwiches_list"].filter(
    (sandwich) => sandwich["rating"] >= rating 
    && (!minCalories || sandwich["calories"] >= minCalories) 
    && (!maxCalories || sandwich["calories"] <= maxCalories)
    );
};

const findSandwichByCaloriesCost = 
  (minCalories, maxCalories, maxCost) => {
  return sandwiches["sandwiches_list"].filter(
    (sandwich) => (!minCalories || sandwich["calories"] >= minCalories) 
    && (!maxCalories || sandwich["calories"] <= maxCalories)
    && sandwich["cost"] <= maxCost
  );
};

const findSandwichByRatingCost = (rating, maxCost) => {
  return sandwiches["sandwiches_list"].filter(
    (sandwich) => (sandwich["rating"] >= rating 
    && sandwich["cost"] <= maxCost)
  );
};

const findSandwichByRatingCaloriesCost = 
  (rating, minCalories, maxCalories, maxCost) => {
  return sandwiches["sandwiches_list"].filter(
    (sandwich) => sandwich["rating"] >= rating 
    && (!minCalories || sandwich["calories"] >= minCalories)
    && (!maxCalories || sandwich["calories"] <= maxCalories)
    && sandwich["cost"] <= maxCost
  );
};


//Sandwiches
app.get("/sandwiches", (req, res) => {
  res.send(sandwiches);
});

//Filters
app.get("/sandwiches/filter", (req, res) => {
  const { rating, minCalories, maxCalories, maxCost } = req.query;
  if (rating != undefined && (minCalories != undefined 
    || maxCalories != undefined) && maxCost != undefined) {
    let result = findSandwichByRatingCaloriesCost(parseInt(rating), 
      parseInt(minCalories), parseInt(maxCalories), parseFloat(maxCost));
    result = { sandwiches_list: result };
    res.send(result);
  } else if (rating != undefined && (minCalories != undefined 
    || maxCalories != undefined) && maxCost == undefined){
    let result = findSandwichByRatingCalories(parseInt(rating), 
      parseInt(minCalories), parseInt(maxCalories));
    result = { sandwiches_list: result };
    res.send(result);
  } else if (rating == undefined && (minCalories != undefined 
    || maxCalories != undefined) && maxCost != undefined) {
    let result = findSandwichByCaloriesCost(parseInt(minCalories), 
      parseInt(maxCalories), parseFloat(maxCost));
    result = { sandwiches_list: result };
    res.send(result);
  } else if (rating != undefined && minCalories == undefined 
    && maxCalories != undefined && maxCost != undefined) {
    let result = findSandwichByRatingCost(parseInt(rating), 
      parseFloat(maxCost));
    result = { sandwiches_list: result };
    res.send(result);
  } else if (rating != undefined && minCalories == undefined 
    && maxCalories != undefined && maxCost == undefined) {
    let result = findSandwichByRating(parseInt(rating));
    result = { sandwiches_list: result };
    res.send(result);
  } else if (rating == undefined && (minCalories != undefined 
    || maxCalories != undefined) && maxCost == undefined) {
    let result = findSandwichByCalories(parseInt(minCalories),
      parseInt(maxCalories));
    result = { sandwiches_list: result };
    res.send(result);
  } else if (rating == undefined && minCalories == undefined 
    && maxCalories == undefined && maxCost != undefined) {
    let result = findSandwichByCost(parseFloat(maxCost));
    result = { sandwiches_list: result };
    res.send(result);
  } else {
    res.send(sandwiches);
  }
});


//Sorting

app.get("/sandwiches/sort", (req, res) => {
  const { sortBy } = req.query;

  //Ascending
  const sortByNameAscending = sandwiches["sandwiches_list"].toSorted(
    (a, b) => a.name.localeCompare(b.name)
  );
  const sortByRatingAscending = sandwiches["sandwiches_list"].toSorted(
    (a, b) => a.rating - b.rating
  );
  const sortByCaloriesAscending = sandwiches["sandwiches_list"].toSorted(
    (a, b) => a.calories - b.calories
  );
  const sortByCostAscending = sandwiches["sandwiches_list"].toSorted(
    (a, b) => a.cost - b.cost
  );
  //Descending
  const sortByNameDescending = sandwiches["sandwiches_list"].toSorted(
    (a, b) => b.name.localeCompare(a.name)
  );
  const sortByRatingDescending = sandwiches["sandwiches_list"].toSorted(
    (a, b) => b.rating - a.rating
  );
  const sortByCaloriesDescending = sandwiches["sandwiches_list"].toSorted(
    (a, b) => b.calories - a.calories
  );
  const sortByCostDescending = sandwiches["sandwiches_list"].toSorted(
    (a, b) => b.cost - a.cost
  );


  if (sortBy === "nameAscending") {
    res.send({ sandwiches_list: sortByNameAscending });
  } else if (sortBy === "ratingAscending"){
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


const sandwiches = {
  sandwiches_list: [
    {
        "_id": 0,
        "cuisine": null,
        "restaurant": null,
        "ingredients": {
            "breads": {},
            "meats": {
                "egg": [
                    "egg"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "onion": [
                    "onion"
                ]
            },
            "condiments": {
                "oil": [
                    "extra-virgin olive oil"
                ],
                "butter": [
                    "butter"
                ]
            },
            "spices": {
                "black pepper": [
                    "black pepper"
                ],
                "salt": [
                    "salt"
                ]
            }
        },
        "cost": 2.8,
        "calories": 343,
        "rating": 4,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": [],
        "name": "Egg Sandwich"
    },
    {
        "_id": 1,
        "cuisine": null,
        "restaurant": null,
        "ingredients": {
            "breads": {},
            "meats": {
                "egg": [
                    "large egg"
                ],
                "chicken": [
                    "boneless skinless chicken breast"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {
                "oil": [
                    "extra-virgin olive oil"
                ],
                "butter": [
                    "unsalted butter"
                ]
            },
            "spices": {
                "black pepper": [
                    "black pepper"
                ],
                "salt": [
                    "coarse salt",
                    "unsalted butter"
                ]
            }
        },
        "cost": 4.4,
        "calories": 503,
        "rating": 4,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": [],
        "name": "Egg Sandwich"
    },
    {
        "_id": 2,
        "cuisine": null,
        "restaurant": null,
        "ingredients": {
            "breads": {},
            "meats": {},
            "cheeses": {
                "ricotta": [
                    "ricotta cheese"
                ],
                "provolone": [
                    "provolone cheese"
                ]
            },
            "vegetables": {
                "tomato": [
                    "tomatoe"
                ]
            },
            "condiments": {},
            "spices": {
                "seasoning": [
                    "italian seasoning"
                ]
            }
        },
        "cost": 3.2,
        "calories": 175,
        "rating": 4,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": [],
        "name": "Ricotta Sandwich"
    },
    {
        "_id": 3,
        "cuisine": "cajun_creole",
        "restaurant": null,
        "name": "Cajun Creole Shrimp Sandwich",
        "ingredients": {
            "breads": {
                "baguette": [
                    "baguette"
                ]
            },
            "meats": {
                "shrimp": [
                    "medium shrimp"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "tomato": [
                    "tomatoe"
                ],
                "pepper": [
                    "yellow bell pepper"
                ],
                "scallion": [
                    "scallion"
                ],
                "lettuce": [
                    "romaine lettuce"
                ]
            },
            "condiments": {
                "mustard": [
                    "dijon mustard"
                ],
                "oil": [
                    "extra-virgin olive oil"
                ],
                "mayonnaise": [
                    "reduced fat mayonnaise"
                ]
            },
            "spices": {
                "salt": [
                    "salt"
                ],
                "seasoning": [
                    "creole seasoning"
                ]
            }
        },
        "cost": 9.8,
        "calories": 635,
        "rating": 5,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 4,
        "cuisine": "spanish",
        "restaurant": null,
        "name": "Spanish Salami Sandwich",
        "ingredients": {
            "breads": {},
            "meats": {
                "salami": [
                    "hard salami"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "olive": [
                    "spanish olive"
                ]
            },
            "condiments": {
                "oil": [
                    "olive oil"
                ]
            },
            "spices": {
                "parsley": [
                    "parsley"
                ]
            }
        },
        "cost": 4.8,
        "calories": 295,
        "rating": 5,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 5,
        "cuisine": "mexican",
        "restaurant": null,
        "name": "Mexican Turkey Sandwich",
        "ingredients": {
            "breads": {},
            "meats": {
                "turkey": [
                    "turkey"
                ],
                "bacon": [
                    "cooked bacon"
                ]
            },
            "cheeses": {
                "cheddar": [
                    "cheddar cheese"
                ]
            },
            "vegetables": {},
            "condiments": {},
            "spices": {
                "powder": [
                    "chipotle chile powder"
                ]
            }
        },
        "cost": 5.0,
        "calories": 345,
        "rating": 1,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 6,
        "cuisine": "cajun_creole",
        "restaurant": null,
        "name": "Cajun Creole Salami Sandwich",
        "ingredients": {
            "breads": {},
            "meats": {
                "salami": [
                    "genoa salami"
                ],
                "ham": [
                    "ham"
                ],
                "mortadella": [
                    "mortadella"
                ]
            },
            "cheeses": {
                "mozzarella": [
                    "mozzarella cheese"
                ],
                "provolone": [
                    "provolone cheese"
                ]
            },
            "vegetables": {
                "olive": [
                    "olive"
                ]
            },
            "condiments": {},
            "spices": {}
        },
        "cost": 9.5,
        "calories": 590,
        "rating": 3,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 7,
        "cuisine": "italian",
        "restaurant": null,
        "name": "Italian Ham Sandwich",
        "ingredients": {
            "breads": {},
            "meats": {
                "ham": [
                    "deli ham"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "pepper": [
                    "roasted red pepper",
                    "crushed red pepper"
                ],
                "spinach": [
                    "spinach leave"
                ]
            },
            "condiments": {
                "mayonnaise": [
                    "low-fat mayonnaise"
                ]
            },
            "spices": {
                "basil": [
                    "basil"
                ]
            }
        },
        "cost": 4.7,
        "calories": 290,
        "rating": 3,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 8,
        "cuisine": "italian",
        "restaurant": null,
        "name": "Italian Chicken Sandwich",
        "ingredients": {
            "breads": {},
            "meats": {
                "chicken": [
                    "boneless skinless chicken breast halve"
                ]
            },
            "cheeses": {
                "mozzarella": [
                    "shredded mozzarella cheese"
                ]
            },
            "vegetables": {},
            "condiments": {
                "mustard": [
                    "brown mustard"
                ]
            },
            "spices": {}
        },
        "cost": 3.5,
        "calories": 285,
        "rating": 1,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 9,
        "cuisine": "american",
        "restaurant": null,
        "name": "American Beef Sandwich",
        "ingredients": {
            "breads": {
                "sourdough": [
                    "sourdough bread"
                ]
            },
            "meats": {
                "beef": [
                    "corned beef"
                ]
            },
            "cheeses": {
                "swiss": [
                    "swiss cheese"
                ]
            },
            "vegetables": {},
            "condiments": {
                "dressing": [
                    "russian dressing"
                ]
            },
            "spices": {}
        },
        "cost": 7.2,
        "calories": 650,
        "rating": 5,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 10,
        "cuisine": "french",
        "restaurant": null,
        "name": "French Prosciutto Sandwich",
        "ingredients": {
            "breads": {
                "baguette": [
                    "baguette"
                ]
            },
            "meats": {
                "prosciutto": [
                    "prosciutto"
                ]
            },
            "cheeses": {
                "brie": [
                    "brie cheese"
                ]
            },
            "vegetables": {},
            "condiments": {},
            "spices": {}
        },
        "cost": 5.5,
        "calories": 415,
        "rating": 1,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 11,
        "cuisine": "mediterranean",
        "restaurant": null,
        "name": "Mediterranean Feta Sandwich",
        "ingredients": {
            "breads": {
                "whole wheat": [
                    "whole wheat bread"
                ]
            },
            "meats": {},
            "cheeses": {
                "feta": [
                    "feta cheese"
                ]
            },
            "vegetables": {
                "cucumber": [
                    "cucumber"
                ],
                "tomato": [
                    "tomato"
                ],
                "olive": [
                    "kalamata olive"
                ]
            },
            "condiments": {},
            "spices": {}
        },
        "cost": 4.7,
        "calories": 330,
        "rating": 2,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 12,
        "cuisine": "italian",
        "restaurant": null,
        "name": "Italian Mozzarella Sandwich",
        "ingredients": {
            "breads": {
                "ciabatta": [
                    "ciabatta"
                ]
            },
            "meats": {},
            "cheeses": {
                "mozzarella": [
                    "mozzarella"
                ]
            },
            "vegetables": {
                "tomato": [
                    "tomato"
                ]
            },
            "condiments": {
                "pesto": [
                    "pesto"
                ]
            },
            "spices": {
                "basil": [
                    "basil leave"
                ]
            }
        },
        "cost": 5.4,
        "calories": 435,
        "rating": 2,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 13,
        "cuisine": "american",
        "restaurant": null,
        "name": "American Pastrami Sandwich",
        "ingredients": {
            "breads": {
                "rye": [
                    "rye bread"
                ]
            },
            "meats": {
                "pastrami": [
                    "pastrami"
                ]
            },
            "cheeses": {
                "swiss": [
                    "swiss cheese"
                ]
            },
            "vegetables": {},
            "condiments": {
                "dressing": [
                    "thousand island dressing"
                ]
            },
            "spices": {}
        },
        "cost": 5.7,
        "calories": 500,
        "rating": 2,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 14,
        "cuisine": "scandinavian",
        "restaurant": null,
        "name": "Scandinavian Cream Cheese Sandwich",
        "ingredients": {
            "breads": {
                "pumpernickel": [
                    "pumpernickel bread"
                ]
            },
            "meats": {},
            "cheeses": {
                "cream cheese": [
                    "cream cheese"
                ]
            },
            "vegetables": {
                "onion": [
                    "red onion"
                ]
            },
            "condiments": {},
            "spices": {
                "dill": [
                    "dill"
                ]
            }
        },
        "cost": 3.5,
        "calories": 285,
        "rating": 1,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 15,
        "cuisine": "american",
        "restaurant": null,
        "name": "American Pork Sandwich",
        "ingredients": {
            "breads": {
                "brioche": [
                    "brioche bun"
                ]
            },
            "meats": {
                "pork": [
                    "pulled pork"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {
                "sauce": [
                    "bbq sauce"
                ]
            },
            "spices": {}
        },
        "cost": 5.5,
        "calories": 570,
        "rating": 5,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 16,
        "cuisine": "middle_eastern",
        "restaurant": null,
        "name": "Middle Eastern Lettuce Sandwich",
        "ingredients": {
            "breads": {
                "pita": [
                    "pita bread"
                ]
            },
            "meats": {},
            "cheeses": {},
            "vegetables": {
                "lettuce": [
                    "lettuce"
                ],
                "tomato": [
                    "tomato"
                ],
                "cucumber": [
                    "cucumber"
                ]
            },
            "condiments": {
                "sauce": [
                    "tahini sauce"
                ]
            },
            "spices": {}
        },
        "cost": 3.0,
        "calories": 290,
        "rating": 3,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 17,
        "cuisine": "italian",
        "restaurant": null,
        "name": "Italian Goat Cheese Sandwich",
        "ingredients": {
            "breads": {
                "focaccia": [
                    "focaccia"
                ]
            },
            "meats": {},
            "cheeses": {
                "goat cheese": [
                    "goat cheese"
                ]
            },
            "vegetables": {},
            "condiments": {
                "glaze": [
                    "balsamic glaze"
                ]
            },
            "spices": {}
        },
        "cost": 4.7,
        "calories": 390,
        "rating": 5,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 18,
        "cuisine": "french",
        "restaurant": null,
        "name": "French Ham Sandwich",
        "ingredients": {
            "breads": {
                "croissant": [
                    "croissant"
                ]
            },
            "meats": {
                "ham": [
                    "ham"
                ]
            },
            "cheeses": {
                "gruyere": [
                    "gruyere cheese"
                ]
            },
            "vegetables": {},
            "condiments": {
                "mustard": [
                    "dijon mustard"
                ]
            },
            "spices": {}
        },
        "cost": 5.5,
        "calories": 545,
        "rating": 5,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 19,
        "cuisine": "american",
        "restaurant": null,
        "name": "American Chicken Sandwich",
        "ingredients": {
            "breads": {
                "tortilla": [
                    "tortilla wrap"
                ]
            },
            "meats": {
                "chicken": [
                    "grilled chicken"
                ],
                "bacon": [
                    "bacon"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "avocado": [
                    "avocado"
                ],
                "lettuce": [
                    "lettuce"
                ]
            },
            "condiments": {
                "dressing": [
                    "ranch dressing"
                ]
            },
            "spices": {}
        },
        "cost": 6.8,
        "calories": 640,
        "rating": 5,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 20,
        "cuisine": "american",
        "restaurant": null,
        "name": "American Tuna Sandwich",
        "ingredients": {
            "breads": {
                "white bread": [
                    "toasted white bread"
                ]
            },
            "meats": {
                "tuna": [
                    "tuna salad"
                ]
            },
            "cheeses": {
                "cheddar": [
                    "cheddar cheese"
                ]
            },
            "vegetables": {
                "tomato": [
                    "tomato"
                ]
            },
            "condiments": {},
            "spices": {}
        },
        "cost": 4.6,
        "calories": 440,
        "rating": 2,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 21,
        "cuisine": "german",
        "restaurant": null,
        "name": "German Bratwurst Sandwich",
        "ingredients": {
            "breads": {
                "bun": [
                    "pretzel bun"
                ]
            },
            "meats": {
                "bratwurst": [
                    "bratwurst"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {
                "mustard": [
                    "whole grain mustard"
                ]
            },
            "spices": {}
        },
        "cost": 3.0,
        "calories": 375,
        "rating": 3,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 22,
        "cuisine": "american",
        "restaurant": null,
        "name": "American Egg Sandwich",
        "ingredients": {
            "breads": {
                "english muffin": [
                    "english muffin"
                ]
            },
            "meats": {
                "egg": [
                    "egg"
                ],
                "bacon": [
                    "canadian bacon"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {
                "sauce": [
                    "hollandaise sauce"
                ]
            },
            "spices": {}
        },
        "cost": 2.8,
        "calories": 328,
        "rating": 4,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 23,
        "cuisine": "indian",
        "restaurant": null,
        "name": "Indian Chicken Sandwich",
        "ingredients": {
            "breads": {
                "naan": [
                    "naan bread"
                ]
            },
            "meats": {
                "chicken": [
                    "chicken tikka"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "cucumber": [
                    "cucumber"
                ],
                "onion": [
                    "red onion"
                ]
            },
            "condiments": {
                "sauce": [
                    "yogurt sauce"
                ]
            },
            "spices": {}
        },
        "cost": 4.5,
        "calories": 600,
        "rating": 2,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 24,
        "cuisine": "french",
        "restaurant": null,
        "name": "French Beef Sandwich",
        "ingredients": {
            "breads": {
                "baguette": [
                    "baguette"
                ]
            },
            "meats": {
                "beef": [
                    "roast beef"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "tomato": [
                    "tomato"
                ]
            },
            "condiments": {
                "sauce": [
                    "horseradish sauce"
                ]
            },
            "spices": {}
        },
        "cost": 5.6,
        "calories": 570,
        "rating": 4,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 25,
        "cuisine": "american",
        "restaurant": null,
        "name": "American Turkey Sandwich",
        "ingredients": {
            "breads": {
                "multigrain": [
                    "multigrain bread"
                ]
            },
            "meats": {
                "turkey": [
                    "turkey"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {
                "sauce": [
                    "cranberry sauce"
                ]
            },
            "spices": {}
        },
        "cost": 4.5,
        "calories": 450,
        "rating": 4,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 26,
        "cuisine": "chinese",
        "restaurant": null,
        "name": "Chinese Pork Sandwich",
        "ingredients": {
            "breads": {
                "bun": [
                    "bao bun"
                ]
            },
            "meats": {
                "pork": [
                    "pork belly"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "cucumber": [
                    "cucumber"
                ],
                "scallion": [
                    "scallion"
                ]
            },
            "condiments": {
                "sauce": [
                    "hoisin sauce"
                ]
            },
            "spices": {}
        },
        "cost": 4.4,
        "calories": 405,
        "rating": 1,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 27,
        "cuisine": "italian",
        "restaurant": null,
        "name": "Italian Egg Sandwich",
        "ingredients": {
            "breads": {
                "ciabatta": [
                    "ciabatta"
                ]
            },
            "meats": {
                "egg": [
                    "grilled eggplant"
                ]
            },
            "cheeses": {
                "mozzarella": [
                    "mozzarella"
                ]
            },
            "vegetables": {
                "eggplant": [
                    "grilled eggplant"
                ],
                "pepper": [
                    "roasted red pepper"
                ]
            },
            "condiments": {
                "pesto": [
                    "basil pesto"
                ]
            },
            "spices": {
                "basil": [
                    "basil pesto"
                ]
            }
        },
        "cost": 7.0,
        "calories": 533,
        "rating": 3,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 28,
        "cuisine": "greek",
        "restaurant": null,
        "name": "Greek Chicken Sandwich",
        "ingredients": {
            "breads": {
                "whole wheat": [
                    "whole wheat wrap"
                ]
            },
            "meats": {
                "chicken": [
                    "grilled chicken"
                ]
            },
            "cheeses": {
                "feta": [
                    "feta cheese"
                ]
            },
            "vegetables": {
                "lettuce": [
                    "lettuce"
                ],
                "tomato": [
                    "tomato"
                ],
                "onion": [
                    "red onion"
                ]
            },
            "condiments": {},
            "spices": {}
        },
        "cost": 5.7,
        "calories": 520,
        "rating": 1,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 29,
        "cuisine": "french",
        "restaurant": null,
        "name": "French Camembert Sandwich",
        "ingredients": {
            "breads": {
                "baguette": [
                    "baguette"
                ]
            },
            "meats": {},
            "cheeses": {
                "camembert": [
                    "camembert"
                ]
            },
            "vegetables": {},
            "condiments": {
                "honey": [
                    "honey"
                ]
            },
            "spices": {}
        },
        "cost": 3.7,
        "calories": 405,
        "rating": 2,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 30,
        "cuisine": "american",
        "restaurant": null,
        "name": "American Turkey Sandwich",
        "ingredients": {
            "breads": {
                "rye": [
                    "rye bread"
                ]
            },
            "meats": {
                "turkey": [
                    "smoked turkey"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {
                "dressing": [
                    "russian dressing"
                ]
            },
            "spices": {}
        },
        "cost": 5.0,
        "calories": 460,
        "rating": 5,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 31,
        "cuisine": "california",
        "restaurant": null,
        "name": "California Egg Sandwich",
        "ingredients": {
            "breads": {
                "sourdough": [
                    "sourdough bread"
                ]
            },
            "meats": {
                "egg": [
                    "poached egg"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "avocado": [
                    "avocado"
                ],
                "tomato": [
                    "cherry tomatoe"
                ]
            },
            "condiments": {},
            "spices": {}
        },
        "cost": 4.6,
        "calories": 468,
        "rating": 5,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 32,
        "cuisine": "jewish",
        "restaurant": null,
        "name": "Jewish Cream Cheese Sandwich",
        "ingredients": {
            "breads": {
                "bagel": [
                    "bagel"
                ]
            },
            "meats": {},
            "cheeses": {
                "cream cheese": [
                    "cream cheese"
                ]
            },
            "vegetables": {
                "onion": [
                    "red onion"
                ]
            },
            "condiments": {},
            "spices": {
                "dill": [
                    "dill"
                ]
            }
        },
        "cost": 2.7,
        "calories": 345,
        "rating": 2,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 33,
        "cuisine": "southern_us",
        "restaurant": null,
        "name": "Southern Us Chicken Sandwich",
        "ingredients": {
            "breads": {
                "brioche": [
                    "brioche bun"
                ]
            },
            "meats": {
                "chicken": [
                    "fried chicken"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "pickle": [
                    "pickle"
                ]
            },
            "condiments": {
                "honey": [
                    "honey"
                ],
                "butter": [
                    "butter"
                ]
            },
            "spices": {}
        },
        "cost": 6.2,
        "calories": 665,
        "rating": 2,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 34,
        "cuisine": "middle_eastern",
        "restaurant": null,
        "name": "Middle Eastern Halloumi Sandwich",
        "ingredients": {
            "breads": {
                "baguette": [
                    "baguette"
                ]
            },
            "meats": {},
            "cheeses": {
                "halloumi": [
                    "grilled halloumi"
                ]
            },
            "vegetables": {},
            "condiments": {},
            "spices": {
                "za'atar": [
                    "za'atar"
                ]
            }
        },
        "cost": 3.6,
        "calories": 365,
        "rating": 4,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 35,
        "cuisine": "italian",
        "restaurant": null,
        "name": "Italian Salami Sandwich",
        "ingredients": {
            "breads": {
                "panini": [
                    "panini bread"
                ]
            },
            "meats": {
                "salami": [
                    "salami"
                ],
                "mortadella": [
                    "mortadella"
                ]
            },
            "cheeses": {
                "provolone": [
                    "provolone"
                ]
            },
            "vegetables": {
                "pepper": [
                    "roasted red pepper"
                ],
                "olive": [
                    "olive tapenade"
                ]
            },
            "condiments": {},
            "spices": {}
        },
        "cost": 9.2,
        "calories": 580,
        "rating": 5,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 36,
        "cuisine": "american",
        "restaurant": null,
        "name": "American Crab Sandwich",
        "ingredients": {
            "breads": {
                "roll": [
                    "potato roll"
                ]
            },
            "meats": {
                "crab": [
                    "crab cake"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "lettuce": [
                    "lettuce"
                ],
                "tomato": [
                    "tomato"
                ]
            },
            "condiments": {
                "sauce": [
                    "remoulade sauce"
                ]
            },
            "spices": {}
        },
        "cost": 5.6,
        "calories": 270,
        "rating": 1,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 37,
        "cuisine": "french",
        "restaurant": null,
        "name": "French Ham Sandwich",
        "ingredients": {
            "breads": {
                "baguette": [
                    "baguette"
                ]
            },
            "meats": {
                "ham": [
                    "ham"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {
                "butter": [
                    "butter"
                ]
            },
            "spices": {}
        },
        "cost": 4.0,
        "calories": 500,
        "rating": 2,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 38,
        "cuisine": "american",
        "restaurant": null,
        "name": "American  Sandwich",
        "ingredients": {
            "breads": {
                "whole wheat": [
                    "whole wheat bread"
                ]
            },
            "meats": {},
            "cheeses": {},
            "vegetables": {},
            "condiments": {
                "butter": [
                    "almond butter"
                ],
                "honey": [
                    "honey"
                ]
            },
            "spices": {
                "cinnamon": [
                    "cinnamon"
                ]
            }
        },
        "cost": 2.8,
        "calories": 350,
        "rating": 3,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 39,
        "cuisine": "mexican",
        "restaurant": null,
        "name": "Mexican Queso Fresco Sandwich",
        "ingredients": {
            "breads": {
                "roll": [
                    "torta roll"
                ]
            },
            "meats": {},
            "cheeses": {
                "queso fresco": [
                    "queso fresco"
                ]
            },
            "vegetables": {
                "avocado": [
                    "avocado"
                ],
                "pickle": [
                    "pickled jalape\u00f1o"
                ]
            },
            "condiments": {},
            "spices": {}
        },
        "cost": 3.5,
        "calories": 335,
        "rating": 1,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 40,
        "cuisine": "german",
        "restaurant": null,
        "name": "German Onion Sandwich",
        "ingredients": {
            "breads": {
                "pumpernickel": [
                    "pumpernickel bread"
                ]
            },
            "meats": {},
            "cheeses": {},
            "vegetables": {
                "onion": [
                    "red onion"
                ]
            },
            "condiments": {
                "mustard": [
                    "mustard"
                ]
            },
            "spices": {}
        },
        "cost": 2.7,
        "calories": 235,
        "rating": 1,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 41,
        "cuisine": "korean",
        "restaurant": null,
        "name": "Korean Beef Sandwich",
        "ingredients": {
            "breads": {
                "sourdough": [
                    "sourdough bread"
                ]
            },
            "meats": {
                "beef": [
                    "bulgogi beef"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "kimchi": [
                    "kimchi"
                ],
                "cucumber": [
                    "cucumber"
                ]
            },
            "condiments": {},
            "spices": {}
        },
        "cost": 6.6,
        "calories": 500,
        "rating": 3,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 42,
        "cuisine": "american",
        "restaurant": null,
        "name": "American Bacon Sandwich",
        "ingredients": {
            "breads": {
                "white bread": [
                    "toasted white bread"
                ]
            },
            "meats": {
                "bacon": [
                    "bacon"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {
                "butter": [
                    "peanut butter"
                ],
                "honey": [
                    "honey"
                ]
            },
            "spices": {}
        },
        "cost": 3.2,
        "calories": 370,
        "rating": 1,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 43,
        "cuisine": "italian",
        "restaurant": null,
        "name": "Italian Prosciutto Sandwich",
        "ingredients": {
            "breads": {
                "ciabatta": [
                    "ciabatta"
                ]
            },
            "meats": {
                "prosciutto": [
                    "prosciutto"
                ]
            },
            "cheeses": {
                "gorgonzola": [
                    "gorgonzola"
                ]
            },
            "vegetables": {},
            "condiments": {
                "glaze": [
                    "balsamic glaze"
                ]
            },
            "spices": {}
        },
        "cost": 7.0,
        "calories": 480,
        "rating": 2,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 44,
        "cuisine": "middle_eastern",
        "restaurant": null,
        "name": "Middle Eastern Chicken Sandwich",
        "ingredients": {
            "breads": {
                "pita": [
                    "pita bread"
                ]
            },
            "meats": {
                "chicken": [
                    "shawarma chicken"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "pickle": [
                    "pickled turnip"
                ],
                "tomato": [
                    "tomatoe"
                ]
            },
            "condiments": {
                "sauce": [
                    "garlic sauce"
                ]
            },
            "spices": {
                "parsley": [
                    "parsley"
                ]
            }
        },
        "cost": 5.1,
        "calories": 480,
        "rating": 4,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 45,
        "cuisine": "vegetarian",
        "restaurant": null,
        "name": "Vegetarian Pepper Sandwich",
        "ingredients": {
            "breads": {
                "multigrain": [
                    "multigrain bread"
                ]
            },
            "meats": {},
            "cheeses": {},
            "vegetables": {
                "pepper": [
                    "roasted red pepper"
                ],
                "cucumber": [
                    "cucumber"
                ],
                "avocado": [
                    "avocado"
                ]
            },
            "condiments": {},
            "spices": {}
        },
        "cost": 4.1,
        "calories": 400,
        "rating": 1,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 46,
        "cuisine": "southern_us",
        "restaurant": null,
        "name": "Southern Us Bacon Sandwich",
        "ingredients": {
            "breads": {
                "potato bread": [
                    "potato bread"
                ]
            },
            "meats": {
                "bacon": [
                    "bacon"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "tomato": [
                    "fried green tomatoe"
                ],
                "lettuce": [
                    "lettuce"
                ]
            },
            "condiments": {},
            "spices": {}
        },
        "cost": 3.1,
        "calories": 260,
        "rating": 5,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 47,
        "cuisine": "french",
        "restaurant": null,
        "name": "French Duck Sandwich",
        "ingredients": {
            "breads": {
                "baguette": [
                    "baguette"
                ]
            },
            "meats": {
                "duck": [
                    "duck confit"
                ]
            },
            "cheeses": {
                "brie": [
                    "brie cheese"
                ]
            },
            "vegetables": {},
            "condiments": {},
            "spices": {}
        },
        "cost": 7.0,
        "calories": 695,
        "rating": 5,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 48,
        "cuisine": "indian",
        "restaurant": null,
        "name": "Indian Chicken Sandwich",
        "ingredients": {
            "breads": {
                "naan": [
                    "naan bread"
                ]
            },
            "meats": {
                "chicken": [
                    "tandoori chicken"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "onion": [
                    "onion"
                ],
                "cucumber": [
                    "cucumber raita"
                ]
            },
            "condiments": {
                "chutney": [
                    "mint chutney"
                ]
            },
            "spices": {}
        },
        "cost": 5.0,
        "calories": 600,
        "rating": 3,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 49,
        "cuisine": "vegetarian",
        "restaurant": null,
        "name": "Vegetarian Goat Cheese Sandwich",
        "ingredients": {
            "breads": {
                "sourdough": [
                    "sourdough bread"
                ]
            },
            "meats": {},
            "cheeses": {
                "goat cheese": [
                    "goat cheese"
                ]
            },
            "vegetables": {
                "beet": [
                    "beetroot hummu"
                ],
                "spinach": [
                    "spinach"
                ]
            },
            "condiments": {},
            "spices": {}
        },
        "cost": 4.7,
        "calories": 355,
        "rating": 5,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 50,
        "cuisine": "german",
        "restaurant": null,
        "name": "German  Sandwich",
        "ingredients": {
            "breads": {
                "roll": [
                    "pretzel roll"
                ]
            },
            "meats": {},
            "cheeses": {},
            "vegetables": {},
            "condiments": {
                "mustard": [
                    "mustard"
                ]
            },
            "spices": {}
        },
        "cost": 1.0,
        "calories": 125,
        "rating": 1,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 51,
        "cuisine": "new_england",
        "restaurant": null,
        "name": "New England Lobster Sandwich",
        "ingredients": {
            "breads": {
                "brioche": [
                    "brioche bun"
                ]
            },
            "meats": {
                "lobster": [
                    "lobster meat"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "celery": [
                    "celery"
                ]
            },
            "condiments": {
                "aioli": [
                    "lemon aioli"
                ]
            },
            "spices": {}
        },
        "cost": 8.8,
        "calories": 495,
        "rating": 1,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 52,
        "cuisine": "italian",
        "restaurant": null,
        "name": "Italian Mortadella Sandwich",
        "ingredients": {
            "breads": {
                "focaccia": [
                    "focaccia"
                ]
            },
            "meats": {
                "mortadella": [
                    "mortadella"
                ]
            },
            "cheeses": {
                "burrata": [
                    "burrata"
                ]
            },
            "vegetables": {},
            "condiments": {
                "pesto": [
                    "pistachio pesto"
                ]
            },
            "spices": {}
        },
        "cost": 7.0,
        "calories": 510,
        "rating": 4,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 53,
        "cuisine": "middle_eastern",
        "restaurant": null,
        "name": "Middle Eastern Pickle Sandwich",
        "ingredients": {
            "breads": {
                "whole wheat": [
                    "whole wheat wrap"
                ]
            },
            "meats": {},
            "cheeses": {},
            "vegetables": {
                "pickle": [
                    "pickled turnip"
                ]
            },
            "condiments": {
                "sauce": [
                    "tahini sauce"
                ]
            },
            "spices": {}
        },
        "cost": 2.0,
        "calories": 235,
        "rating": 1,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 54,
        "cuisine": "scandinavian",
        "restaurant": null,
        "name": "Scandinavian Pickle Sandwich",
        "ingredients": {
            "breads": {
                "rye": [
                    "rye bread"
                ]
            },
            "meats": {},
            "cheeses": {},
            "vegetables": {
                "pickle": [
                    "pickled beet"
                ]
            },
            "condiments": {
                "horseradish": [
                    "horseradish cream"
                ]
            },
            "spices": {
                "dill": [
                    "dill"
                ]
            }
        },
        "cost": 3.3,
        "calories": 220,
        "rating": 4,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 55,
        "cuisine": "italian",
        "restaurant": null,
        "name": "Italian  Sandwich",
        "ingredients": {
            "breads": {
                "ciabatta": [
                    "ciabatta"
                ]
            },
            "meats": {},
            "cheeses": {},
            "vegetables": {},
            "condiments": {
                "salsa": [
                    "salsa verde"
                ]
            },
            "spices": {}
        },
        "cost": 2.6,
        "calories": 265,
        "rating": 4,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 56,
        "cuisine": "japanese",
        "restaurant": null,
        "name": "Japanese Chicken Sandwich",
        "ingredients": {
            "breads": {
                "milk bread": [
                    "milk bread"
                ]
            },
            "meats": {
                "chicken": [
                    "katsu chicken"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "cabbage": [
                    "shredded cabbage"
                ]
            },
            "condiments": {
                "sauce": [
                    "tonkatsu sauce"
                ]
            },
            "spices": {}
        },
        "cost": 4.9,
        "calories": 495,
        "rating": 5,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 57,
        "cuisine": "british",
        "restaurant": null,
        "name": "British Beef Sandwich",
        "ingredients": {
            "breads": {
                "baguette": [
                    "baguette"
                ]
            },
            "meats": {
                "beef": [
                    "roast beef"
                ]
            },
            "cheeses": {
                "blue cheese": [
                    "blue cheese"
                ]
            },
            "vegetables": {
                "onion": [
                    "caramelized onion"
                ]
            },
            "condiments": {},
            "spices": {}
        },
        "cost": 6.4,
        "calories": 640,
        "rating": 5,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 58,
        "cuisine": "mediterranean",
        "restaurant": null,
        "name": "Mediterranean Lamb Sandwich",
        "ingredients": {
            "breads": {
                "pita": [
                    "pita pocket"
                ]
            },
            "meats": {
                "lamb": [
                    "lamb kofta"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "tomato": [
                    "tomato"
                ],
                "onion": [
                    "red onion"
                ]
            },
            "condiments": {},
            "spices": {
                "sumac": [
                    "sumac"
                ]
            }
        },
        "cost": 6.1,
        "calories": 515,
        "rating": 2,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 59,
        "cuisine": "french",
        "restaurant": null,
        "name": "French Cream Cheese Sandwich",
        "ingredients": {
            "breads": {
                "croissant": [
                    "croissant"
                ]
            },
            "meats": {},
            "cheeses": {
                "cream cheese": [
                    "dill cream cheese"
                ]
            },
            "vegetables": {
                "cucumber": [
                    "cucumber"
                ]
            },
            "condiments": {},
            "spices": {
                "dill": [
                    "dill cream cheese"
                ]
            }
        },
        "cost": 3.2,
        "calories": 345,
        "rating": 2,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 60,
        "cuisine": "american",
        "restaurant": null,
        "name": "American  Sandwich",
        "ingredients": {
            "breads": {
                "white bread": [
                    "toasted white bread"
                ]
            },
            "meats": {},
            "cheeses": {},
            "vegetables": {},
            "condiments": {},
            "spices": {}
        },
        "cost": 1.0,
        "calories": 160,
        "rating": 2,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 61,
        "cuisine": "venezuelan",
        "restaurant": null,
        "name": "Venezuelan Queso Fresco Sandwich",
        "ingredients": {
            "breads": {},
            "meats": {},
            "cheeses": {
                "queso fresco": [
                    "queso fresco"
                ]
            },
            "vegetables": {
                "avocado": [
                    "avocado"
                ]
            },
            "condiments": {},
            "spices": {}
        },
        "cost": 2.5,
        "calories": 210,
        "rating": 1,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 62,
        "cuisine": "vegan",
        "restaurant": null,
        "name": "Vegan Tomato Sandwich",
        "ingredients": {
            "breads": {
                "multigrain": [
                    "multigrain bread"
                ]
            },
            "meats": {},
            "cheeses": {},
            "vegetables": {
                "tomato": [
                    "tomato"
                ],
                "avocado": [
                    "avocado"
                ]
            },
            "condiments": {},
            "spices": {}
        },
        "cost": 3.6,
        "calories": 390,
        "rating": 4,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 63,
        "cuisine": "french",
        "restaurant": null,
        "name": "French  Sandwich",
        "ingredients": {
            "breads": {
                "baguette": [
                    "baguette"
                ]
            },
            "meats": {},
            "cheeses": {},
            "vegetables": {},
            "condiments": {
                "mustard": [
                    "dijon mustard"
                ],
                "butter": [
                    "butter"
                ]
            },
            "spices": {}
        },
        "cost": 2.5,
        "calories": 355,
        "rating": 5,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 64,
        "cuisine": "british",
        "restaurant": null,
        "name": "British Egg Sandwich",
        "ingredients": {
            "breads": {
                "whole wheat": [
                    "whole wheat bread"
                ]
            },
            "meats": {
                "egg": [
                    "egg salad"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "radish": [
                    "radish slice"
                ]
            },
            "condiments": {},
            "spices": {}
        },
        "cost": 1.9,
        "calories": 268,
        "rating": 5,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 65,
        "cuisine": "mexican",
        "restaurant": null,
        "name": "Mexican Queso Fresco Sandwich",
        "ingredients": {
            "breads": {
                "tortilla": [
                    "tortilla"
                ]
            },
            "meats": {},
            "cheeses": {
                "queso fresco": [
                    "queso fresco"
                ]
            },
            "vegetables": {},
            "condiments": {
                "guacamole": [
                    "guacamole"
                ]
            },
            "spices": {}
        },
        "cost": 3.3,
        "calories": 260,
        "rating": 3,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 66,
        "cuisine": "scandinavian",
        "restaurant": null,
        "name": "Scandinavian Onion Sandwich",
        "ingredients": {
            "breads": {
                "pumpernickel": [
                    "pumpernickel bread"
                ]
            },
            "meats": {},
            "cheeses": {},
            "vegetables": {
                "onion": [
                    "red onion"
                ]
            },
            "condiments": {
                "mustard": [
                    "mustard-dill sauce"
                ]
            },
            "spices": {
                "dill": [
                    "mustard-dill sauce"
                ]
            }
        },
        "cost": 3.2,
        "calories": 240,
        "rating": 5,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 67,
        "cuisine": "southern_us",
        "restaurant": null,
        "name": "Southern Us Crab Sandwich",
        "ingredients": {
            "breads": {
                "brioche": [
                    "brioche bun"
                ]
            },
            "meats": {
                "crab": [
                    "fried soft-shell crab"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "lettuce": [
                    "lettuce"
                ],
                "tomato": [
                    "tomato"
                ]
            },
            "condiments": {
                "sauce": [
                    "remoulade sauce"
                ]
            },
            "spices": {}
        },
        "cost": 7.6,
        "calories": 450,
        "rating": 4,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 68,
        "cuisine": "mediterranean",
        "restaurant": null,
        "name": "Mediterranean Goat Cheese Sandwich",
        "ingredients": {
            "breads": {
                "baguette": [
                    "baguette"
                ]
            },
            "meats": {},
            "cheeses": {
                "goat cheese": [
                    "goat cheese"
                ]
            },
            "vegetables": {
                "olive": [
                    "olive tapenade"
                ]
            },
            "condiments": {},
            "spices": {
                "basil": [
                    "basil"
                ]
            }
        },
        "cost": 5.0,
        "calories": 385,
        "rating": 3,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 69,
        "cuisine": "italian_american",
        "restaurant": null,
        "name": "Italian American Meatball Sandwich",
        "ingredients": {
            "breads": {
                "sourdough": [
                    "sourdough bread"
                ]
            },
            "meats": {
                "meatball": [
                    "meatball"
                ]
            },
            "cheeses": {
                "provolone": [
                    "provolone cheese"
                ]
            },
            "vegetables": {},
            "condiments": {
                "sauce": [
                    "marinara sauce"
                ]
            },
            "spices": {}
        },
        "cost": 5.5,
        "calories": 510,
        "rating": 3,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 70,
        "cuisine": "greek",
        "restaurant": null,
        "name": "Greek Gyro Sandwich",
        "ingredients": {
            "breads": {
                "pita": [
                    "pita bread"
                ]
            },
            "meats": {
                "gyro": [
                    "gyro meat"
                ]
            },
            "cheeses": {
                "feta": [
                    "feta cheese"
                ]
            },
            "vegetables": {
                "tomato": [
                    "tomatoe"
                ],
                "onion": [
                    "onion"
                ]
            },
            "condiments": {
                "sauce": [
                    "tzatziki sauce"
                ]
            },
            "spices": {}
        },
        "cost": 6.2,
        "calories": 600,
        "rating": 4,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 71,
        "cuisine": "indian",
        "restaurant": null,
        "name": "Indian Chicken Sandwich",
        "ingredients": {
            "breads": {
                "flatbread": [
                    "flatbread"
                ]
            },
            "meats": {
                "chicken": [
                    "butter chicken"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "onion": [
                    "pickled onion"
                ]
            },
            "condiments": {
                "butter": [
                    "butter chicken"
                ],
                "chutney": [
                    "cilantro chutney"
                ]
            },
            "spices": {}
        },
        "cost": 4.9,
        "calories": 570,
        "rating": 3,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 72,
        "cuisine": "french",
        "restaurant": null,
        "name": "French  Sandwich",
        "ingredients": {
            "breads": {
                "croissant": [
                    "croissant"
                ]
            },
            "meats": {},
            "cheeses": {},
            "vegetables": {},
            "condiments": {
                "butter": [
                    "almond butter"
                ],
                "honey": [
                    "honey"
                ]
            },
            "spices": {
                "cinnamon": [
                    "cinnamon"
                ]
            }
        },
        "cost": 3.3,
        "calories": 450,
        "rating": 3,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 73,
        "cuisine": "vegan",
        "restaurant": null,
        "name": "Vegan Bacon Sandwich",
        "ingredients": {
            "breads": {
                "whole wheat": [
                    "whole wheat bread"
                ]
            },
            "meats": {
                "bacon": [
                    "tempeh bacon"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "lettuce": [
                    "lettuce"
                ],
                "tomato": [
                    "tomato"
                ],
                "avocado": [
                    "avocado"
                ]
            },
            "condiments": {},
            "spices": {}
        },
        "cost": 4.6,
        "calories": 410,
        "rating": 5,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 74,
        "cuisine": "american",
        "restaurant": null,
        "name": "American Beef Sandwich",
        "ingredients": {
            "breads": {
                "rye": [
                    "rye bread"
                ]
            },
            "meats": {
                "beef": [
                    "corned beef"
                ]
            },
            "cheeses": {
                "swiss": [
                    "swiss cheese"
                ]
            },
            "vegetables": {},
            "condiments": {
                "dressing": [
                    "russian dressing"
                ]
            },
            "spices": {}
        },
        "cost": 6.7,
        "calories": 630,
        "rating": 3,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 75,
        "cuisine": "chinese",
        "restaurant": null,
        "name": "Chinese Pork Sandwich",
        "ingredients": {
            "breads": {
                "bun": [
                    "bao bun"
                ]
            },
            "meats": {
                "pork": [
                    "char siu pork"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "cucumber": [
                    "pickled cucumber"
                ],
                "scallion": [
                    "scallion"
                ]
            },
            "condiments": {
                "sauce": [
                    "hoisin sauce"
                ]
            },
            "spices": {}
        },
        "cost": 4.4,
        "calories": 405,
        "rating": 5,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 76,
        "cuisine": "italian",
        "restaurant": null,
        "name": "Italian Fennel Sandwich",
        "ingredients": {
            "breads": {
                "ciabatta": [
                    "ciabatta"
                ]
            },
            "meats": {},
            "cheeses": {},
            "vegetables": {
                "fennel": [
                    "fennel slaw"
                ]
            },
            "condiments": {
                "salsa": [
                    "salsa verde"
                ],
                "aioli": [
                    "lemon aioli"
                ]
            },
            "spices": {}
        },
        "cost": 4.8,
        "calories": 375,
        "rating": 3,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 77,
        "cuisine": "mexican",
        "restaurant": null,
        "name": "Mexican Queso Fresco Sandwich",
        "ingredients": {
            "breads": {
                "roll": [
                    "bolillo roll"
                ]
            },
            "meats": {},
            "cheeses": {
                "queso fresco": [
                    "queso fresco"
                ]
            },
            "vegetables": {
                "avocado": [
                    "avocado"
                ],
                "pickle": [
                    "pickled jalape\u00f1o"
                ]
            },
            "condiments": {},
            "spices": {}
        },
        "cost": 3.5,
        "calories": 335,
        "rating": 3,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 78,
        "cuisine": "american",
        "restaurant": null,
        "name": "American Turkey Sandwich",
        "ingredients": {
            "breads": {},
            "meats": {
                "turkey": [
                    "roasted turkey"
                ]
            },
            "cheeses": {
                "brie": [
                    "brie cheese"
                ]
            },
            "vegetables": {},
            "condiments": {
                "sauce": [
                    "cranberry sauce"
                ]
            },
            "spices": {}
        },
        "cost": 4.5,
        "calories": 325,
        "rating": 1,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 79,
        "cuisine": "spanish",
        "restaurant": null,
        "name": "Spanish  Sandwich",
        "ingredients": {
            "breads": {
                "baguette": [
                    "baguette"
                ]
            },
            "meats": {},
            "cheeses": {},
            "vegetables": {},
            "condiments": {
                "oil": [
                    "olive oil"
                ]
            },
            "spices": {}
        },
        "cost": 2.3,
        "calories": 370,
        "rating": 1,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 80,
        "cuisine": "indian",
        "restaurant": null,
        "name": "Indian Onion Sandwich",
        "ingredients": {
            "breads": {
                "naan": [
                    "naan bread"
                ]
            },
            "meats": {},
            "cheeses": {},
            "vegetables": {
                "onion": [
                    "red onion"
                ]
            },
            "condiments": {
                "chutney": [
                    "mint chutney"
                ]
            },
            "spices": {}
        },
        "cost": 2.6,
        "calories": 390,
        "rating": 5,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 81,
        "cuisine": "vegan",
        "restaurant": null,
        "name": "Vegan Pickle Sandwich",
        "ingredients": {
            "breads": {
                "roll": [
                    "potato roll"
                ]
            },
            "meats": {},
            "cheeses": {},
            "vegetables": {
                "pickle": [
                    "pickle"
                ]
            },
            "condiments": {
                "sauce": [
                    "bbq sauce"
                ]
            },
            "spices": {}
        },
        "cost": 1.5,
        "calories": 175,
        "rating": 5,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 82,
        "cuisine": "italian",
        "restaurant": null,
        "name": "Italian Mozzarella Sandwich",
        "ingredients": {
            "breads": {
                "focaccia": [
                    "focaccia"
                ]
            },
            "meats": {},
            "cheeses": {
                "mozzarella": [
                    "mozzarella"
                ]
            },
            "vegetables": {
                "tomato": [
                    "sun-dried tomatoe"
                ]
            },
            "condiments": {
                "pesto": [
                    "basil pesto"
                ]
            },
            "spices": {
                "basil": [
                    "basil pesto"
                ]
            }
        },
        "cost": 5.6,
        "calories": 435,
        "rating": 5,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 83,
        "cuisine": "scandinavian",
        "restaurant": null,
        "name": "Scandinavian Cream Cheese Sandwich",
        "ingredients": {
            "breads": {
                "sourdough": [
                    "sourdough bread"
                ]
            },
            "meats": {},
            "cheeses": {
                "cream cheese": [
                    "cream cheese"
                ]
            },
            "vegetables": {
                "cucumber": [
                    "cucumber"
                ]
            },
            "condiments": {},
            "spices": {
                "dill": [
                    "dill"
                ]
            }
        },
        "cost": 3.7,
        "calories": 285,
        "rating": 5,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 84,
        "cuisine": "southern_us",
        "restaurant": null,
        "name": "Southern Us Chicken Sandwich",
        "ingredients": {
            "breads": {
                "brioche": [
                    "brioche bun"
                ]
            },
            "meats": {
                "chicken": [
                    "nashville hot chicken"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "pickle": [
                    "pickle slice"
                ]
            },
            "condiments": {
                "dressing": [
                    "ranch dressing"
                ]
            },
            "spices": {}
        },
        "cost": 6.0,
        "calories": 585,
        "rating": 3,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 85,
        "cuisine": "german",
        "restaurant": null,
        "name": "German Bratwurst Sandwich",
        "ingredients": {
            "breads": {
                "roll": [
                    "pretzel roll"
                ]
            },
            "meats": {
                "bratwurst": [
                    "beer-braised bratwurst"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "onion": [
                    "caramelized onion"
                ]
            },
            "condiments": {
                "mustard": [
                    "beer mustard"
                ]
            },
            "spices": {}
        },
        "cost": 3.4,
        "calories": 415,
        "rating": 3,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 86,
        "cuisine": "israeli",
        "restaurant": null,
        "name": "Israeli Egg Sandwich",
        "ingredients": {
            "breads": {
                "pita": [
                    "pita bread"
                ]
            },
            "meats": {
                "egg": [
                    "eggplant",
                    "hard-boiled egg"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "eggplant": [
                    "eggplant"
                ]
            },
            "condiments": {
                "oil": [
                    "hard-boiled egg"
                ],
                "sauce": [
                    "amba sauce"
                ]
            },
            "spices": {}
        },
        "cost": 3.8,
        "calories": 468,
        "rating": 2,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 87,
        "cuisine": "french",
        "restaurant": null,
        "name": "French Beef Sandwich",
        "ingredients": {
            "breads": {
                "baguette": [
                    "baguette"
                ]
            },
            "meats": {
                "beef": [
                    "beef bourguignon"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {
                "mustard": [
                    "dijon mustard"
                ]
            },
            "spices": {}
        },
        "cost": 5.0,
        "calories": 505,
        "rating": 1,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 88,
        "cuisine": "japanese",
        "restaurant": null,
        "name": "Japanese Cucumber Sandwich",
        "ingredients": {
            "breads": {
                "milk bread": [
                    "milk bread"
                ]
            },
            "meats": {},
            "cheeses": {},
            "vegetables": {
                "cucumber": [
                    "cucumber"
                ]
            },
            "condiments": {},
            "spices": {}
        },
        "cost": 2.2,
        "calories": 230,
        "rating": 3,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 89,
        "cuisine": "italian",
        "restaurant": null,
        "name": "Italian Bresaola Sandwich",
        "ingredients": {
            "breads": {
                "ciabatta": [
                    "ciabatta"
                ]
            },
            "meats": {
                "bresaola": [
                    "bresaola"
                ]
            },
            "cheeses": {
                "parmesan": [
                    "shaved parmesan"
                ]
            },
            "vegetables": {},
            "condiments": {
                "oil": [
                    "lemon olive oil"
                ]
            },
            "spices": {}
        },
        "cost": 7.1,
        "calories": 550,
        "rating": 3,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 90,
        "cuisine": "british",
        "restaurant": null,
        "name": "British Egg Sandwich",
        "ingredients": {
            "breads": {},
            "meats": {
                "egg": [
                    "curried egg salad"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "cucumber": [
                    "cucumber"
                ],
                "lettuce": [
                    "lettuce"
                ]
            },
            "condiments": {
                "chutney": [
                    "mango chutney"
                ]
            },
            "spices": {}
        },
        "cost": 2.4,
        "calories": 148,
        "rating": 2,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 91,
        "cuisine": "mexican",
        "restaurant": null,
        "name": "Mexican Onion Sandwich",
        "ingredients": {
            "breads": {
                "roll": [
                    "torta roll"
                ]
            },
            "meats": {},
            "cheeses": {},
            "vegetables": {
                "onion": [
                    "pickled red onion"
                ],
                "avocado": [
                    "avocado"
                ]
            },
            "condiments": {
                "salsa": [
                    "habanero salsa"
                ]
            },
            "spices": {}
        },
        "cost": 3.2,
        "calories": 325,
        "rating": 4,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 92,
        "cuisine": "french",
        "restaurant": null,
        "name": "French Goat Cheese Sandwich",
        "ingredients": {
            "breads": {
                "baguette": [
                    "baguette"
                ]
            },
            "meats": {},
            "cheeses": {
                "goat cheese": [
                    "goat cheese"
                ]
            },
            "vegetables": {},
            "condiments": {
                "oil": [
                    "olive oil"
                ]
            },
            "spices": {
                "basil": [
                    "basil"
                ]
            }
        },
        "cost": 4.3,
        "calories": 455,
        "rating": 5,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 93,
        "cuisine": "vegan",
        "restaurant": null,
        "name": "Vegan Pepper Sandwich",
        "ingredients": {
            "breads": {
                "multigrain": [
                    "multigrain bread"
                ]
            },
            "meats": {},
            "cheeses": {},
            "vegetables": {
                "pepper": [
                    "roasted red pepper"
                ],
                "spinach": [
                    "spinach"
                ]
            },
            "condiments": {
                "pesto": [
                    "vegan pesto"
                ]
            },
            "spices": {}
        },
        "cost": 4.2,
        "calories": 335,
        "rating": 2,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 94,
        "cuisine": "southern_us",
        "restaurant": null,
        "name": "Southern Us Tomato Sandwich",
        "ingredients": {
            "breads": {
                "potato bread": [
                    "potato bread"
                ]
            },
            "meats": {},
            "cheeses": {},
            "vegetables": {
                "tomato": [
                    "tomato jam"
                ]
            },
            "condiments": {},
            "spices": {}
        },
        "cost": 1.6,
        "calories": 200,
        "rating": 3,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 95,
        "cuisine": "chinese",
        "restaurant": null,
        "name": "Chinese Duck Sandwich",
        "ingredients": {
            "breads": {
                "bun": [
                    "bao bun"
                ]
            },
            "meats": {
                "duck": [
                    "peking duck"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "cucumber": [
                    "cucumber"
                ],
                "scallion": [
                    "scallion"
                ]
            },
            "condiments": {
                "sauce": [
                    "hoisin sauce"
                ]
            },
            "spices": {}
        },
        "cost": 5.9,
        "calories": 535,
        "rating": 5,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 96,
        "cuisine": "vegan",
        "restaurant": null,
        "name": "Vegan Swiss Sandwich",
        "ingredients": {
            "breads": {
                "sourdough": [
                    "sourdough bread"
                ]
            },
            "meats": {},
            "cheeses": {
                "swiss": [
                    "vegan swiss cheese"
                ]
            },
            "vegetables": {},
            "condiments": {
                "dressing": [
                    "vegan thousand island dressing"
                ]
            },
            "spices": {}
        },
        "cost": 4.2,
        "calories": 400,
        "rating": 2,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 97,
        "cuisine": "north_african",
        "restaurant": null,
        "name": "North African Sausage Sandwich",
        "ingredients": {
            "breads": {
                "baguette": [
                    "baguette"
                ]
            },
            "meats": {
                "sausage": [
                    "merguez sausage"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "pepper": [
                    "roasted bell pepper"
                ]
            },
            "condiments": {},
            "spices": {
                "sage": [
                    "merguez sausage"
                ]
            }
        },
        "cost": 4.2,
        "calories": 455,
        "rating": 2,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 98,
        "cuisine": "japanese",
        "restaurant": null,
        "name": "Japanese Cabbage Sandwich",
        "ingredients": {
            "breads": {
                "milk bread": [
                    "milk bread"
                ]
            },
            "meats": {},
            "cheeses": {},
            "vegetables": {
                "cabbage": [
                    "shredded cabbage"
                ]
            },
            "condiments": {
                "sauce": [
                    "bulldog sauce"
                ]
            },
            "spices": {}
        },
        "cost": 2.9,
        "calories": 295,
        "rating": 5,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 99,
        "cuisine": "middle_eastern",
        "restaurant": null,
        "name": "Middle Eastern Shawarma Sandwich",
        "ingredients": {
            "breads": {
                "pita": [
                    "pita bread"
                ]
            },
            "meats": {
                "shawarma": [
                    "shawarma-spiced cauliflower"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "pickle": [
                    "pickled turnip"
                ]
            },
            "condiments": {
                "sauce": [
                    "tahini sauce"
                ]
            },
            "spices": {
                "parsley": [
                    "parsley"
                ]
            }
        },
        "cost": 5.0,
        "calories": 480,
        "rating": 5,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 100,
        "cuisine": "italian",
        "restaurant": null,
        "name": "Italian  Sandwich",
        "ingredients": {
            "breads": {
                "ciabatta": [
                    "ciabatta"
                ]
            },
            "meats": {},
            "cheeses": {},
            "vegetables": {},
            "condiments": {},
            "spices": {}
        },
        "cost": 1.8,
        "calories": 250,
        "rating": 3,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 101,
        "cuisine": "german",
        "restaurant": null,
        "name": "German Onion Sandwich",
        "ingredients": {
            "breads": {
                "roll": [
                    "pretzel roll"
                ]
            },
            "meats": {},
            "cheeses": {},
            "vegetables": {
                "onion": [
                    "fried onion"
                ]
            },
            "condiments": {
                "mustard": [
                    "sweet mustard"
                ]
            },
            "spices": {}
        },
        "cost": 1.4,
        "calories": 165,
        "rating": 1,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 102,
        "cuisine": "american",
        "restaurant": null,
        "name": "American Pork Sandwich",
        "ingredients": {
            "breads": {
                "brioche": [
                    "brioche bun"
                ]
            },
            "meats": {
                "pork": [
                    "pork belly"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {
                "sauce": [
                    "bourbon barbecue sauce"
                ]
            },
            "spices": {}
        },
        "cost": 5.5,
        "calories": 570,
        "rating": 2,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 103,
        "cuisine": "levantine",
        "restaurant": null,
        "name": "Levantine Egg Sandwich",
        "ingredients": {
            "breads": {
                "whole wheat": [
                    "whole wheat wrap"
                ]
            },
            "meats": {
                "egg": [
                    "roasted eggplant"
                ]
            },
            "cheeses": {
                "halloumi": [
                    "grilled halloumi"
                ]
            },
            "vegetables": {
                "eggplant": [
                    "roasted eggplant"
                ],
                "tomato": [
                    "tomato"
                ]
            },
            "condiments": {},
            "spices": {
                "za'atar": [
                    "za'atar"
                ]
            }
        },
        "cost": 5.2,
        "calories": 413,
        "rating": 2,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 104,
        "cuisine": "french",
        "restaurant": null,
        "name": "French Egg Sandwich",
        "ingredients": {
            "breads": {
                "baguette": [
                    "baguette"
                ]
            },
            "meats": {
                "egg": [
                    "quail egg yolk"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {
                "mustard": [
                    "dijon mustard"
                ]
            },
            "spices": {}
        },
        "cost": 2.5,
        "calories": 333,
        "rating": 5,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 105,
        "cuisine": "indian",
        "restaurant": null,
        "name": "Indian Paneer Sandwich",
        "ingredients": {
            "breads": {
                "naan": [
                    "naan bread"
                ]
            },
            "meats": {},
            "cheeses": {
                "paneer": [
                    "paneer tikka"
                ]
            },
            "vegetables": {
                "onion": [
                    "red onion"
                ]
            },
            "condiments": {
                "chutney": [
                    "mint chutney",
                    "tamarind chutney"
                ]
            },
            "spices": {}
        },
        "cost": 3.6,
        "calories": 490,
        "rating": 1,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 106,
        "cuisine": "middle_eastern",
        "restaurant": null,
        "name": "Middle Eastern Tomato Sandwich",
        "ingredients": {
            "breads": {
                "multigrain": [
                    "multigrain bread"
                ]
            },
            "meats": {},
            "cheeses": {},
            "vegetables": {
                "tomato": [
                    "roasted cherry tomatoe"
                ]
            },
            "condiments": {},
            "spices": {
                "za'atar": [
                    "za'atar"
                ]
            }
        },
        "cost": 2.7,
        "calories": 245,
        "rating": 3,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 107,
        "cuisine": "mexican",
        "restaurant": null,
        "name": "Mexican Onion Sandwich",
        "ingredients": {
            "breads": {
                "tortilla": [
                    "corn tortilla"
                ]
            },
            "meats": {},
            "cheeses": {},
            "vegetables": {
                "onion": [
                    "onion"
                ]
            },
            "condiments": {},
            "spices": {}
        },
        "cost": 1.2,
        "calories": 190,
        "rating": 1,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 108,
        "cuisine": "french",
        "restaurant": null,
        "name": "French Sausage Sandwich",
        "ingredients": {
            "breads": {
                "baguette": [
                    "baguette"
                ]
            },
            "meats": {
                "sausage": [
                    "blood sausage"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {
                "mustard": [
                    "wholegrain mustard"
                ]
            },
            "spices": {
                "sage": [
                    "blood sausage"
                ]
            }
        },
        "cost": 4.0,
        "calories": 440,
        "rating": 5,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 109,
        "cuisine": "italian",
        "restaurant": null,
        "name": "Italian Stracciatella Sandwich",
        "ingredients": {
            "breads": {
                "focaccia": [
                    "focaccia"
                ]
            },
            "meats": {},
            "cheeses": {
                "stracciatella": [
                    "stracciatella cheese"
                ]
            },
            "vegetables": {
                "tomato": [
                    "roasted cherry tomatoe"
                ]
            },
            "condiments": {},
            "spices": {
                "basil": [
                    "basil"
                ]
            }
        },
        "cost": 4.6,
        "calories": 365,
        "rating": 1,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 110,
        "cuisine": "korean",
        "restaurant": null,
        "name": "Korean Beef Sandwich",
        "ingredients": {
            "breads": {
                "bun": [
                    "steamed bun"
                ]
            },
            "meats": {
                "beef": [
                    "bulgogi beef"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "kimchi": [
                    "kimchi"
                ]
            },
            "condiments": {},
            "spices": {}
        },
        "cost": 4.7,
        "calories": 390,
        "rating": 5,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 111,
        "cuisine": "scandinavian",
        "restaurant": null,
        "name": "Scandinavian Pickle Sandwich",
        "ingredients": {
            "breads": {
                "rye": [
                    "rye bread"
                ]
            },
            "meats": {},
            "cheeses": {},
            "vegetables": {
                "pickle": [
                    "pickled herring"
                ],
                "onion": [
                    "red onion"
                ]
            },
            "condiments": {},
            "spices": {
                "dill": [
                    "dill"
                ]
            }
        },
        "cost": 2.9,
        "calories": 250,
        "rating": 1,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 112,
        "cuisine": "french",
        "restaurant": null,
        "name": "French  Sandwich",
        "ingredients": {
            "breads": {
                "baguette": [
                    "baguette"
                ]
            },
            "meats": {},
            "cheeses": {},
            "vegetables": {},
            "condiments": {
                "butter": [
                    "piment d'espelette butter"
                ]
            },
            "spices": {}
        },
        "cost": 2.0,
        "calories": 350,
        "rating": 2,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 113,
        "cuisine": "british",
        "restaurant": null,
        "name": "British Chicken Sandwich",
        "ingredients": {
            "breads": {
                "white bread": [
                    "toasted white bread"
                ]
            },
            "meats": {
                "chicken": [
                    "coronation chicken"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {
                "chutney": [
                    "mango chutney"
                ]
            },
            "spices": {
                "coriander": [
                    "coriander leave"
                ]
            }
        },
        "cost": 4.5,
        "calories": 420,
        "rating": 3,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 114,
        "cuisine": "baltic",
        "restaurant": null,
        "name": "Baltic Egg Sandwich",
        "ingredients": {
            "breads": {},
            "meats": {
                "egg": [
                    "hard-boiled egg"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "onion": [
                    "red onion"
                ]
            },
            "condiments": {
                "oil": [
                    "hard-boiled egg"
                ]
            },
            "spices": {
                "dill": [
                    "dill"
                ]
            }
        },
        "cost": 2.2,
        "calories": 243,
        "rating": 2,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 115,
        "cuisine": "italian",
        "restaurant": null,
        "name": "Italian Fennel Sandwich",
        "ingredients": {
            "breads": {
                "ciabatta": [
                    "ciabatta"
                ]
            },
            "meats": {},
            "cheeses": {},
            "vegetables": {
                "fennel": [
                    "fennel"
                ]
            },
            "condiments": {
                "salsa": [
                    "salsa verde"
                ]
            },
            "spices": {}
        },
        "cost": 3.8,
        "calories": 285,
        "rating": 3,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 116,
        "cuisine": null,
        "restaurant": "mr_pickles",
        "name": "The Mr. Pickle",
        "ingredients": {
            "breads": {},
            "meats": {
                "chicken": [
                    "chicken breast"
                ],
                "bacon": [
                    "bacon"
                ]
            },
            "cheeses": {
                "monterey jack": [
                    "monterey jack"
                ]
            },
            "vegetables": {
                "avocado": [
                    "avocado"
                ],
                "tomato": [
                    "tomato"
                ],
                "onion": [
                    "onion"
                ],
                "pickle": [
                    "pickle"
                ],
                "pepper": [
                    "pepperoncini"
                ],
                "lettuce": [
                    "lettuce"
                ]
            },
            "condiments": {
                "mayonnaise": [
                    "mayonnaise"
                ],
                "mustard": [
                    "mustard"
                ],
                "sauce": [
                    "garlic sauce"
                ]
            },
            "spices": {}
        },
        "cost": 14.69,
        "calories": 740,
        "rating": 4,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 117,
        "cuisine": null,
        "restaurant": "mr_pickles",
        "name": "G.O.A.T.",
        "ingredients": {
            "breads": {},
            "meats": {
                "ham": [
                    "hot ham"
                ],
                "capicola": [
                    "capicola"
                ],
                "salami": [
                    "salami"
                ],
                "pepperoni": [
                    "pepperoni"
                ]
            },
            "cheeses": {
                "provolone": [
                    "provolone"
                ]
            },
            "vegetables": {
                "tomato": [
                    "tomato"
                ],
                "onion": [
                    "onion"
                ],
                "pickle": [
                    "pickle"
                ],
                "pepper": [
                    "pepperoncini"
                ],
                "lettuce": [
                    "lettuce"
                ]
            },
            "condiments": {
                "vinegar": [
                    "red wine vinegar"
                ]
            },
            "spices": {}
        },
        "cost": 13.99,
        "calories": 625,
        "rating": 1,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 118,
        "cuisine": null,
        "restaurant": "mr_pickles",
        "name": "Kickin' Chicken",
        "ingredients": {
            "breads": {},
            "meats": {
                "chicken": [
                    "chicken breast"
                ]
            },
            "cheeses": {
                "pepper jack": [
                    "pepper jack"
                ]
            },
            "vegetables": {
                "tomato": [
                    "tomato"
                ],
                "onion": [
                    "onion"
                ],
                "pickle": [
                    "pickle"
                ],
                "pepper": [
                    "pepperoncini"
                ],
                "lettuce": [
                    "lettuce"
                ]
            },
            "condiments": {
                "sauce": [
                    "baja sauce",
                    "hot sauce",
                    "garlic sauce"
                ],
                "mayonnaise": [
                    "mayonnaise"
                ],
                "mustard": [
                    "mustard"
                ]
            },
            "spices": {}
        },
        "cost": 14.39,
        "calories": 540,
        "rating": 2,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 119,
        "cuisine": null,
        "restaurant": "mr_pickles",
        "name": "Reuben",
        "ingredients": {
            "breads": {
                "rye": [
                    "toasted marble rye"
                ]
            },
            "meats": {
                "pastrami": [
                    "pastrami"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {},
            "spices": {}
        },
        "cost": 14.69,
        "calories": 320,
        "rating": 4,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 120,
        "cuisine": null,
        "restaurant": "mr_pickles",
        "name": "Mrs. Pickle",
        "ingredients": {
            "breads": {},
            "meats": {
                "turkey": [
                    "turkey breast"
                ],
                "bacon": [
                    "bacon"
                ]
            },
            "cheeses": {
                "monterey jack": [
                    "monterey jack"
                ]
            },
            "vegetables": {
                "avocado": [
                    "avocado"
                ],
                "tomato": [
                    "tomato"
                ],
                "onion": [
                    "onion"
                ],
                "pickle": [
                    "pickle"
                ],
                "pepper": [
                    "pepperoncini"
                ],
                "lettuce": [
                    "lettuce"
                ]
            },
            "condiments": {
                "mayonnaise": [
                    "mayonnaise"
                ],
                "mustard": [
                    "mustard"
                ],
                "sauce": [
                    "garlic sauce"
                ]
            },
            "spices": {}
        },
        "cost": 14.69,
        "calories": 720,
        "rating": 3,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 121,
        "cuisine": null,
        "restaurant": "mr_pickles",
        "name": "Hot \"T\"",
        "ingredients": {
            "breads": {},
            "meats": {
                "turkey": [
                    "turkey breast"
                ]
            },
            "cheeses": {
                "pepper jack": [
                    "pepper jack"
                ]
            },
            "vegetables": {
                "tomato": [
                    "tomato"
                ],
                "onion": [
                    "onion"
                ],
                "pickle": [
                    "pickle"
                ],
                "pepper": [
                    "pepperoncini"
                ],
                "lettuce": [
                    "lettuce"
                ]
            },
            "condiments": {
                "sauce": [
                    "baja sauce",
                    "cranberry sauce",
                    "garlic sauce"
                ],
                "mayonnaise": [
                    "mayonnaise"
                ],
                "mustard": [
                    "mustard"
                ]
            },
            "spices": {}
        },
        "cost": 14.39,
        "calories": 520,
        "rating": 2,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 122,
        "cuisine": null,
        "restaurant": "mr_pickles",
        "name": "Rachel",
        "ingredients": {
            "breads": {
                "rye": [
                    "toasted marble rye"
                ]
            },
            "meats": {
                "turkey": [
                    "turkey breast"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {},
            "spices": {}
        },
        "cost": 14.69,
        "calories": 380,
        "rating": 1,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 123,
        "cuisine": null,
        "restaurant": "mr_pickles",
        "name": "CJ's Pastrami",
        "ingredients": {
            "breads": {},
            "meats": {
                "pastrami": [
                    "pastrami"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "pickle": [
                    "pickle"
                ]
            },
            "condiments": {
                "mustard": [
                    "mustard"
                ]
            },
            "spices": {}
        },
        "cost": 14.69,
        "calories": 130,
        "rating": 3,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 124,
        "cuisine": null,
        "restaurant": "mr_pickles",
        "name": "Hang Loose",
        "ingredients": {
            "breads": {},
            "meats": {
                "pastrami": [
                    "pastrami"
                ],
                "bacon": [
                    "bacon"
                ]
            },
            "cheeses": {
                "cream cheese": [
                    "cream cheese"
                ]
            },
            "vegetables": {
                "avocado": [
                    "avocado"
                ],
                "tomato": [
                    "tomato"
                ],
                "onion": [
                    "onion"
                ],
                "pickle": [
                    "pickle"
                ],
                "pepper": [
                    "pepperoncini"
                ],
                "lettuce": [
                    "lettuce"
                ]
            },
            "condiments": {
                "mayonnaise": [
                    "mayonnaise"
                ],
                "mustard": [
                    "mustard"
                ],
                "sauce": [
                    "garlic sauce"
                ]
            },
            "spices": {}
        },
        "cost": 14.99,
        "calories": 620,
        "rating": 4,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 125,
        "cuisine": null,
        "restaurant": "mr_pickles",
        "name": "BBQ Melt",
        "ingredients": {
            "breads": {},
            "meats": {
                "chicken": [
                    "chicken breast"
                ]
            },
            "cheeses": {
                "cheddar": [
                    "cheddar"
                ]
            },
            "vegetables": {
                "tomato": [
                    "tomato"
                ],
                "onion": [
                    "onion"
                ],
                "pickle": [
                    "pickle"
                ],
                "pepper": [
                    "pepperoncini"
                ],
                "lettuce": [
                    "lettuce"
                ]
            },
            "condiments": {
                "sauce": [
                    "bbq sauce",
                    "garlic sauce"
                ],
                "mayonnaise": [
                    "mayonnaise"
                ],
                "mustard": [
                    "mustard"
                ]
            },
            "spices": {}
        },
        "cost": 14.39,
        "calories": 560,
        "rating": 5,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 126,
        "cuisine": null,
        "restaurant": "mr_pickles",
        "name": "Mama Mia!",
        "ingredients": {
            "breads": {},
            "meats": {
                "meatball": [
                    "meatball"
                ],
                "capicola": [
                    "capicola"
                ],
                "pepperoni": [
                    "pepperoni"
                ]
            },
            "cheeses": {
                "pepper jack": [
                    "pepper jack"
                ]
            },
            "vegetables": {},
            "condiments": {
                "sauce": [
                    "marinara sauce",
                    "garlic sauce"
                ]
            },
            "spices": {}
        },
        "cost": 14.99,
        "calories": 460,
        "rating": 5,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 127,
        "cuisine": null,
        "restaurant": "mr_pickles",
        "name": "Meatball",
        "ingredients": {
            "breads": {},
            "meats": {
                "meatball": [
                    "meatball"
                ]
            },
            "cheeses": {
                "provolone": [
                    "provolone"
                ]
            },
            "vegetables": {},
            "condiments": {
                "sauce": [
                    "marinara sauce",
                    "garlic sauce"
                ]
            },
            "spices": {}
        },
        "cost": 14.69,
        "calories": 290,
        "rating": 4,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 128,
        "cuisine": null,
        "restaurant": "mr_pickles",
        "name": "Got Beef",
        "ingredients": {
            "breads": {},
            "meats": {
                "beef": [
                    "roast beef"
                ],
                "pastrami": [
                    "pastrami"
                ]
            },
            "cheeses": {
                "monterey jack": [
                    "monterey jack"
                ]
            },
            "vegetables": {
                "tomato": [
                    "tomato"
                ],
                "onion": [
                    "onion"
                ],
                "pickle": [
                    "pickle"
                ],
                "pepper": [
                    "pepperoncini"
                ],
                "lettuce": [
                    "lettuce"
                ]
            },
            "condiments": {
                "mayonnaise": [
                    "mayonnaise"
                ],
                "mustard": [
                    "mustard"
                ],
                "sauce": [
                    "garlic sauce"
                ]
            },
            "spices": {}
        },
        "cost": 14.99,
        "calories": 710,
        "rating": 4,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 129,
        "cuisine": null,
        "restaurant": "mr_pickles",
        "name": "French Dip",
        "ingredients": {
            "breads": {},
            "meats": {
                "beef": [
                    "roast beef"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {
                "horseradish": [
                    "horseradish mayo"
                ],
                "sauce": [
                    "garlic sauce"
                ]
            },
            "spices": {}
        },
        "cost": 14.99,
        "calories": 310,
        "rating": 5,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 130,
        "cuisine": null,
        "restaurant": "mr_pickles",
        "name": "Baja Cheesesteak",
        "ingredients": {
            "breads": {},
            "meats": {
                "beef": [
                    "roast beef"
                ]
            },
            "cheeses": {
                "pepper jack": [
                    "pepper jack"
                ]
            },
            "vegetables": {
                "pepper": [
                    "red bell pepper",
                    "pepperoncini"
                ],
                "onion": [
                    "onion"
                ]
            },
            "condiments": {
                "sauce": [
                    "baja sauce"
                ]
            },
            "spices": {}
        },
        "cost": 14.99,
        "calories": 450,
        "rating": 5,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 131,
        "cuisine": null,
        "restaurant": "mr_pickles",
        "name": "Santa Maria Tri-Tip",
        "ingredients": {
            "breads": {},
            "meats": {},
            "cheeses": {},
            "vegetables": {
                "tomato": [
                    "tomato"
                ],
                "onion": [
                    "onion"
                ],
                "pickle": [
                    "pickle"
                ],
                "pepper": [
                    "pepperoncini"
                ],
                "lettuce": [
                    "lettuce"
                ]
            },
            "condiments": {
                "mayonnaise": [
                    "mayonnaise"
                ],
                "mustard": [
                    "mustard"
                ],
                "sauce": [
                    "garlic sauce"
                ]
            },
            "spices": {}
        },
        "cost": 15.99,
        "calories": 250,
        "rating": 4,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 132,
        "cuisine": null,
        "restaurant": "mr_pickles",
        "name": "Goomba",
        "ingredients": {
            "breads": {},
            "meats": {
                "ham": [
                    "ham"
                ],
                "capicola": [
                    "capicola"
                ],
                "salami": [
                    "salami"
                ],
                "pepperoni": [
                    "pepperoni"
                ]
            },
            "cheeses": {
                "provolone": [
                    "provolone"
                ]
            },
            "vegetables": {
                "tomato": [
                    "tomato"
                ],
                "onion": [
                    "onion"
                ],
                "pickle": [
                    "pickle"
                ],
                "pepper": [
                    "pepperoncini"
                ],
                "lettuce": [
                    "lettuce"
                ]
            },
            "condiments": {
                "vinegar": [
                    "red wine vinegar"
                ]
            },
            "spices": {}
        },
        "cost": 14.39,
        "calories": 625,
        "rating": 3,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 133,
        "cuisine": null,
        "restaurant": "mr_pickles",
        "name": "Listen Linda",
        "ingredients": {
            "breads": {},
            "meats": {
                "turkey": [
                    "turkey breast"
                ],
                "bacon": [
                    "bacon"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "avocado": [
                    "avocado"
                ],
                "tomato": [
                    "tomato"
                ],
                "onion": [
                    "onion"
                ],
                "pickle": [
                    "pickle"
                ],
                "pepper": [
                    "pepperoncini"
                ],
                "lettuce": [
                    "lettuce"
                ]
            },
            "condiments": {
                "mayonnaise": [
                    "mayonnaise"
                ],
                "mustard": [
                    "mustard"
                ],
                "sauce": [
                    "garlic sauce"
                ]
            },
            "spices": {}
        },
        "cost": 14.69,
        "calories": 630,
        "rating": 2,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 134,
        "cuisine": null,
        "restaurant": "mr_pickles",
        "name": "Big Jake",
        "ingredients": {
            "breads": {},
            "meats": {
                "turkey": [
                    "turkey breast"
                ]
            },
            "cheeses": {
                "cream cheese": [
                    "cream cheese"
                ]
            },
            "vegetables": {
                "avocado": [
                    "avocado"
                ],
                "tomato": [
                    "tomato"
                ],
                "onion": [
                    "onion"
                ],
                "pickle": [
                    "pickle"
                ],
                "pepper": [
                    "pepperoncini"
                ],
                "lettuce": [
                    "lettuce"
                ]
            },
            "condiments": {
                "mayonnaise": [
                    "mayonnaise"
                ],
                "mustard": [
                    "mustard"
                ],
                "sauce": [
                    "garlic sauce"
                ]
            },
            "spices": {}
        },
        "cost": 14.69,
        "calories": 630,
        "rating": 1,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 135,
        "cuisine": null,
        "restaurant": "mr_pickles",
        "name": "Italian",
        "ingredients": {
            "breads": {},
            "meats": {
                "pastrami": [
                    "pastrami"
                ],
                "ham": [
                    "ham"
                ],
                "salami": [
                    "salami"
                ]
            },
            "cheeses": {
                "provolone": [
                    "provolone"
                ]
            },
            "vegetables": {
                "tomato": [
                    "tomato"
                ],
                "onion": [
                    "onion"
                ],
                "pickle": [
                    "pickle"
                ],
                "pepper": [
                    "pepperoncini"
                ],
                "lettuce": [
                    "lettuce"
                ]
            },
            "condiments": {
                "dressing": [
                    "italian dressing"
                ],
                "mayonnaise": [
                    "mayonnaise"
                ],
                "mustard": [
                    "mustard"
                ],
                "sauce": [
                    "garlic sauce"
                ]
            },
            "spices": {}
        },
        "cost": 14.39,
        "calories": 810,
        "rating": 2,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 136,
        "cuisine": null,
        "restaurant": "mr_pickles",
        "name": "Tom Turkey",
        "ingredients": {
            "breads": {},
            "meats": {
                "turkey": [
                    "turkey breast"
                ],
                "bacon": [
                    "bacon"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "tomato": [
                    "tomato"
                ],
                "onion": [
                    "onion"
                ],
                "pickle": [
                    "pickle"
                ],
                "pepper": [
                    "pepperoncini"
                ],
                "lettuce": [
                    "lettuce"
                ]
            },
            "condiments": {
                "mayonnaise": [
                    "mayonnaise"
                ],
                "mustard": [
                    "mustard"
                ],
                "sauce": [
                    "garlic sauce"
                ]
            },
            "spices": {}
        },
        "cost": 14.39,
        "calories": 480,
        "rating": 5,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 137,
        "cuisine": null,
        "restaurant": "mr_pickles",
        "name": "Della's Deli",
        "ingredients": {
            "breads": {},
            "meats": {
                "turkey": [
                    "turkey breast"
                ],
                "salami": [
                    "salami"
                ],
                "ham": [
                    "ham"
                ]
            },
            "cheeses": {
                "cheddar": [
                    "cheddar"
                ]
            },
            "vegetables": {
                "tomato": [
                    "tomato"
                ],
                "onion": [
                    "onion"
                ],
                "pickle": [
                    "pickle"
                ],
                "pepper": [
                    "pepperoncini"
                ],
                "lettuce": [
                    "lettuce"
                ]
            },
            "condiments": {
                "mayonnaise": [
                    "mayonnaise"
                ],
                "mustard": [
                    "mustard"
                ],
                "sauce": [
                    "garlic sauce"
                ]
            },
            "spices": {}
        },
        "cost": 14.39,
        "calories": 810,
        "rating": 2,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 138,
        "cuisine": null,
        "restaurant": "mr_pickles",
        "name": "Big Easy",
        "ingredients": {
            "breads": {},
            "meats": {
                "chicken": [
                    "chicken salad"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "avocado": [
                    "avocado"
                ],
                "tomato": [
                    "tomato"
                ],
                "onion": [
                    "onion"
                ],
                "pickle": [
                    "pickle"
                ],
                "pepper": [
                    "pepperoncini"
                ],
                "lettuce": [
                    "lettuce"
                ]
            },
            "condiments": {
                "mayonnaise": [
                    "mayonnaise"
                ],
                "mustard": [
                    "mustard"
                ],
                "sauce": [
                    "garlic sauce"
                ]
            },
            "spices": {}
        },
        "cost": 14.39,
        "calories": 600,
        "rating": 4,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 139,
        "cuisine": null,
        "restaurant": "mr_pickles",
        "name": "Cali Tuna",
        "ingredients": {
            "breads": {},
            "meats": {
                "tuna": [
                    "albacore tuna salad"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "avocado": [
                    "avocado"
                ],
                "cucumber": [
                    "cucumber"
                ],
                "tomato": [
                    "tomato"
                ],
                "onion": [
                    "onion"
                ],
                "pickle": [
                    "pickle"
                ],
                "pepper": [
                    "pepperoncini"
                ],
                "lettuce": [
                    "lettuce"
                ]
            },
            "condiments": {
                "mayonnaise": [
                    "mayonnaise"
                ],
                "mustard": [
                    "mustard"
                ],
                "sauce": [
                    "garlic sauce"
                ]
            },
            "spices": {}
        },
        "cost": 15.39,
        "calories": 560,
        "rating": 3,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 140,
        "cuisine": null,
        "restaurant": "mr_pickles",
        "name": "The Hero",
        "ingredients": {
            "breads": {},
            "meats": {
                "beef": [
                    "roast beef"
                ],
                "turkey": [
                    "turkey breast"
                ],
                "ham": [
                    "ham"
                ]
            },
            "cheeses": {
                "cheddar": [
                    "cheddar"
                ]
            },
            "vegetables": {
                "tomato": [
                    "tomato"
                ],
                "onion": [
                    "onion"
                ],
                "pickle": [
                    "pickle"
                ],
                "pepper": [
                    "pepperoncini"
                ],
                "lettuce": [
                    "lettuce"
                ]
            },
            "condiments": {
                "mayonnaise": [
                    "mayonnaise"
                ],
                "mustard": [
                    "mustard"
                ],
                "sauce": [
                    "garlic sauce"
                ]
            },
            "spices": {}
        },
        "cost": 15.99,
        "calories": 940,
        "rating": 3,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 141,
        "cuisine": null,
        "restaurant": "mr_pickles",
        "name": "Veggie Pestoli",
        "ingredients": {
            "breads": {},
            "meats": {},
            "cheeses": {
                "cheddar": [
                    "cheddar"
                ]
            },
            "vegetables": {
                "avocado": [
                    "avocado"
                ],
                "pepper": [
                    "red bell pepper",
                    "pepperoncini"
                ],
                "cucumber": [
                    "cucumber"
                ],
                "tomato": [
                    "tomato"
                ],
                "onion": [
                    "onion"
                ],
                "pickle": [
                    "pickle"
                ],
                "lettuce": [
                    "lettuce"
                ]
            },
            "condiments": {
                "pesto": [
                    "pesto aioli"
                ]
            },
            "spices": {}
        },
        "cost": 13.99,
        "calories": 445,
        "rating": 3,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 142,
        "cuisine": null,
        "restaurant": "mr_pickles",
        "name": "Truly Vegan",
        "ingredients": {
            "breads": {},
            "meats": {},
            "cheeses": {},
            "vegetables": {
                "pepper": [
                    "roasted red pepper hummu",
                    "red bell pepper",
                    "pepperoncini"
                ],
                "avocado": [
                    "avocado"
                ],
                "cucumber": [
                    "cucumber"
                ],
                "tomato": [
                    "tomato"
                ],
                "onion": [
                    "onion"
                ],
                "pickle": [
                    "pickle"
                ],
                "lettuce": [
                    "lettuce"
                ]
            },
            "condiments": {
                "mustard": [
                    "mustard"
                ],
                "sauce": [
                    "garlic sauce"
                ]
            },
            "spices": {}
        },
        "cost": 13.99,
        "calories": 310,
        "rating": 1,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 143,
        "cuisine": null,
        "restaurant": "mr_pickles",
        "name": "Summer Love Wrap",
        "ingredients": {
            "breads": {
                "wrap": [
                    "wrap"
                ]
            },
            "meats": {
                "turkey": [
                    "turkey breast"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "avocado": [
                    "avocado"
                ],
                "pepper": [
                    "roasted red pepper hummu",
                    "pepperoncini"
                ],
                "tomato": [
                    "tomato"
                ],
                "onion": [
                    "onion"
                ],
                "pickle": [
                    "pickle"
                ],
                "lettuce": [
                    "lettuce"
                ]
            },
            "condiments": {
                "sauce": [
                    "baja sauce",
                    "garlic sauce"
                ],
                "mayonnaise": [
                    "mayonnaise"
                ],
                "mustard": [
                    "mustard"
                ]
            },
            "spices": {}
        },
        "cost": 14.39,
        "calories": 730,
        "rating": 3,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 144,
        "cuisine": null,
        "restaurant": "mr_pickles",
        "name": "Club",
        "ingredients": {
            "breads": {},
            "meats": {
                "turkey": [
                    "turkey breast"
                ],
                "ham": [
                    "ham"
                ],
                "bacon": [
                    "bacon"
                ]
            },
            "cheeses": {
                "cheddar": [
                    "cheddar"
                ]
            },
            "vegetables": {
                "tomato": [
                    "tomato"
                ],
                "lettuce": [
                    "lettuce"
                ]
            },
            "condiments": {},
            "spices": {}
        },
        "cost": 14.69,
        "calories": 520,
        "rating": 1,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 145,
        "cuisine": null,
        "restaurant": "mr_pickles",
        "name": "BLAT",
        "ingredients": {
            "breads": {},
            "meats": {
                "bacon": [
                    "bacon"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "lettuce": [
                    "lettuce"
                ],
                "avocado": [
                    "avocado"
                ],
                "tomato": [
                    "tomato"
                ]
            },
            "condiments": {},
            "spices": {}
        },
        "cost": 14.39,
        "calories": 230,
        "rating": 3,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 146,
        "cuisine": null,
        "restaurant": "mr_pickles",
        "name": "BLT",
        "ingredients": {
            "breads": {},
            "meats": {
                "bacon": [
                    "bacon"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "lettuce": [
                    "lettuce"
                ],
                "tomato": [
                    "tomato"
                ]
            },
            "condiments": {},
            "spices": {}
        },
        "cost": 14.39,
        "calories": 80,
        "rating": 1,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 147,
        "cuisine": null,
        "restaurant": "subway",
        "name": "Elite Chicken & Bacon Ranch",
        "ingredients": {
            "breads": {},
            "meats": {
                "chicken": [
                    "chicken breast"
                ],
                "bacon": [
                    "bacon"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {
                "dressing": [
                    "ranch dressing"
                ]
            },
            "spices": {}
        },
        "cost": 15.28,
        "calories": 580,
        "rating": 3,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 148,
        "cuisine": "American",
        "restaurant": "subway",
        "name": "The Philly",
        "ingredients": {
            "breads": {},
            "meats": {},
            "cheeses": {},
            "vegetables": {},
            "condiments": {},
            "spices": {}
        },
        "cost": 13.78,
        "calories": 505,
        "rating": 3,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 149,
        "cuisine": null,
        "restaurant": "subway",
        "name": "Subway Club",
        "ingredients": {
            "breads": {},
            "meats": {
                "turkey": [
                    "turkey breast"
                ],
                "ham": [
                    "black forest ham"
                ],
                "beef": [
                    "roast beef"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {},
            "spices": {}
        },
        "cost": 14.78,
        "calories": 500,
        "rating": 1,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 150,
        "cuisine": "American",
        "restaurant": "subway",
        "name": "All-American Club",
        "ingredients": {
            "breads": {},
            "meats": {
                "turkey": [
                    "turkey breast"
                ],
                "ham": [
                    "black forest ham"
                ],
                "bacon": [
                    "bacon"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {},
            "spices": {}
        },
        "cost": 14.28,
        "calories": 540,
        "rating": 1,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 151,
        "cuisine": "Italian",
        "restaurant": "subway",
        "name": "The Hotshot Italiano",
        "ingredients": {
            "breads": {},
            "meats": {
                "salami": [
                    "genoa salami"
                ],
                "pepperoni": [
                    "pepperoni"
                ],
                "ham": [
                    "ham"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {},
            "spices": {}
        },
        "cost": 12.28,
        "calories": 630,
        "rating": 2,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 152,
        "cuisine": "Italian",
        "restaurant": "subway",
        "name": "The Ultimate B.M.T.",
        "ingredients": {
            "breads": {},
            "meats": {
                "ham": [
                    "ham"
                ],
                "salami": [
                    "genoa salami"
                ],
                "pepperoni": [
                    "pepperoni"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {},
            "spices": {}
        },
        "cost": 12.78,
        "calories": 560,
        "rating": 3,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 153,
        "cuisine": null,
        "restaurant": "subway",
        "name": "Titan Turkey",
        "ingredients": {
            "breads": {},
            "meats": {
                "turkey": [
                    "turkey breast"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {},
            "spices": {}
        },
        "cost": 12.68,
        "calories": 490,
        "rating": 3,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 154,
        "cuisine": null,
        "restaurant": "subway",
        "name": "Home Run Ham",
        "ingredients": {
            "breads": {},
            "meats": {
                "ham": [
                    "ham"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {},
            "spices": {}
        },
        "cost": 12.18,
        "calories": 510,
        "rating": 5,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 155,
        "cuisine": "BBQ",
        "restaurant": "subway",
        "name": "Honey Mustard BBQ Chicken",
        "ingredients": {
            "breads": {},
            "meats": {
                "chicken": [
                    "chicken breast"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {
                "mustard": [
                    "honey mustard"
                ]
            },
            "spices": {}
        },
        "cost": 13.78,
        "calories": 510,
        "rating": 2,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 156,
        "cuisine": null,
        "restaurant": "subway",
        "name": "The Boss",
        "ingredients": {
            "breads": {},
            "meats": {},
            "cheeses": {},
            "vegetables": {},
            "condiments": {},
            "spices": {}
        },
        "cost": 14.58,
        "calories": 690,
        "rating": 2,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 157,
        "cuisine": null,
        "restaurant": "subway",
        "name": "Spicy Nacho Chicken",
        "ingredients": {
            "breads": {},
            "meats": {
                "chicken": [
                    "chicken breast"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {},
            "spices": {}
        },
        "cost": 13.78,
        "calories": 440,
        "rating": 1,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 158,
        "cuisine": null,
        "restaurant": "subway",
        "name": "Cheesy Garlic Steak",
        "ingredients": {
            "breads": {},
            "meats": {},
            "cheeses": {},
            "vegetables": {},
            "condiments": {
                "oil": [
                    "herb garlic oil"
                ]
            },
            "spices": {}
        },
        "cost": 13.78,
        "calories": 510,
        "rating": 3,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 159,
        "cuisine": null,
        "restaurant": "subway",
        "name": "Garlic Roast Beef",
        "ingredients": {
            "breads": {},
            "meats": {
                "beef": [
                    "roast beef"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {
                "oil": [
                    "herb garlic oil"
                ]
            },
            "spices": {}
        },
        "cost": 10.69,
        "calories": 490,
        "rating": 3,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 160,
        "cuisine": null,
        "restaurant": "subway",
        "name": "The Beast",
        "ingredients": {
            "breads": {},
            "meats": {},
            "cheeses": {},
            "vegetables": {},
            "condiments": {},
            "spices": {}
        },
        "cost": 11.19,
        "calories": 740,
        "rating": 3,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 161,
        "cuisine": "Japanese",
        "restaurant": "subway",
        "name": "Teriyaki Blitz",
        "ingredients": {
            "breads": {},
            "meats": {
                "chicken": [
                    "chicken teriyaki"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {},
            "spices": {}
        },
        "cost": 9.49,
        "calories": 460,
        "rating": 2,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 162,
        "cuisine": null,
        "restaurant": "subway",
        "name": "The Outlaw",
        "ingredients": {
            "breads": {},
            "meats": {},
            "cheeses": {},
            "vegetables": {},
            "condiments": {},
            "spices": {}
        },
        "cost": 9.49,
        "calories": 590,
        "rating": 3,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 163,
        "cuisine": null,
        "restaurant": "subway",
        "name": "The Monster",
        "ingredients": {
            "breads": {},
            "meats": {},
            "cheeses": {},
            "vegetables": {},
            "condiments": {},
            "spices": {}
        },
        "cost": 10.99,
        "calories": 590,
        "rating": 1,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 164,
        "cuisine": "Japanese",
        "restaurant": "subway",
        "name": "Sweet Onion Chicken Teriyaki",
        "ingredients": {
            "breads": {},
            "meats": {
                "chicken": [
                    "chicken teriyaki"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {
                "sauce": [
                    "sweet onion sauce"
                ]
            },
            "spices": {}
        },
        "cost": 6.99,
        "calories": 430,
        "rating": 5,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 165,
        "cuisine": null,
        "restaurant": "subway",
        "name": "Pickleball Club",
        "ingredients": {
            "breads": {},
            "meats": {},
            "cheeses": {},
            "vegetables": {},
            "condiments": {},
            "spices": {}
        },
        "cost": 6.99,
        "calories": 500,
        "rating": 5,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 166,
        "cuisine": null,
        "restaurant": "subway",
        "name": "Black Forest Ham",
        "ingredients": {
            "breads": {},
            "meats": {
                "ham": [
                    "black forest ham"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {},
            "spices": {}
        },
        "cost": 5.99,
        "calories": 320,
        "rating": 4,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 167,
        "cuisine": null,
        "restaurant": "subway",
        "name": "B.L.T.",
        "ingredients": {
            "breads": {},
            "meats": {
                "bacon": [
                    "bacon"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "lettuce": [
                    "lettuce"
                ],
                "tomato": [
                    "tomato"
                ]
            },
            "condiments": {},
            "spices": {}
        },
        "cost": 5.99,
        "calories": 370,
        "rating": 5,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 168,
        "cuisine": null,
        "restaurant": "subway",
        "name": "Cold Cut Combo",
        "ingredients": {
            "breads": {},
            "meats": {
                "turkey": [
                    "turkey ham",
                    "turkey salami",
                    "turkey bologna"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {},
            "spices": {}
        },
        "cost": 5.99,
        "calories": 370,
        "rating": 3,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 169,
        "cuisine": null,
        "restaurant": "subway",
        "name": "Grilled Chicken",
        "ingredients": {
            "breads": {},
            "meats": {
                "chicken": [
                    "chicken breast"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {},
            "spices": {}
        },
        "cost": 6.99,
        "calories": 330,
        "rating": 2,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 170,
        "cuisine": "Italian",
        "restaurant": "subway",
        "name": "Meatball Marinara",
        "ingredients": {
            "breads": {},
            "meats": {
                "meatball": [
                    "italian meatball"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {
                "sauce": [
                    "marinara sauce"
                ]
            },
            "spices": {}
        },
        "cost": 6.99,
        "calories": 520,
        "rating": 5,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 180,
        "cuisine": null,
        "restaurant": "subway",
        "name": "Oven-Roasted Turkey",
        "ingredients": {
            "breads": {},
            "meats": {
                "turkey": [
                    "turkey breast"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {},
            "spices": {}
        },
        "cost": 5.99,
        "calories": 310,
        "rating": 4,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 181,
        "cuisine": "Italian",
        "restaurant": "subway",
        "name": "Pizza Sub",
        "ingredients": {
            "breads": {},
            "meats": {
                "pepperoni": [
                    "pepperoni"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {
                "sauce": [
                    "marinara sauce"
                ]
            },
            "spices": {}
        },
        "cost": 4.99,
        "calories": 490,
        "rating": 2,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 182,
        "cuisine": null,
        "restaurant": "subway",
        "name": "Oven-Roasted Turkey & Ham",
        "ingredients": {
            "breads": {},
            "meats": {
                "turkey": [
                    "turkey breast"
                ],
                "ham": [
                    "ham"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {},
            "spices": {}
        },
        "cost": 5.99,
        "calories": 310,
        "rating": 1,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 183,
        "cuisine": null,
        "restaurant": "subway",
        "name": "Rotisserie-Style Chicken",
        "ingredients": {
            "breads": {},
            "meats": {
                "chicken": [
                    "chicken breast"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {},
            "spices": {}
        },
        "cost": 6.99,
        "calories": 350,
        "rating": 3,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 184,
        "cuisine": null,
        "restaurant": "subway",
        "name": "Roast Beef",
        "ingredients": {
            "breads": {},
            "meats": {
                "beef": [
                    "roast beef"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {},
            "spices": {}
        },
        "cost": 6.99,
        "calories": 350,
        "rating": 3,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 185,
        "cuisine": null,
        "restaurant": "subway",
        "name": "Steak & Cheese",
        "ingredients": {
            "breads": {},
            "meats": {},
            "cheeses": {},
            "vegetables": {},
            "condiments": {},
            "spices": {}
        },
        "cost": 6.99,
        "calories": 370,
        "rating": 1,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 186,
        "cuisine": null,
        "restaurant": "subway",
        "name": "Tuna",
        "ingredients": {
            "breads": {},
            "meats": {
                "tuna": [
                    "tuna"
                ]
            },
            "cheeses": {},
            "vegetables": {},
            "condiments": {},
            "spices": {}
        },
        "cost": 5.99,
        "calories": 510,
        "rating": 5,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 187,
        "cuisine": null,
        "restaurant": "subway",
        "name": "Veggie Delite",
        "ingredients": {
            "breads": {},
            "meats": {},
            "cheeses": {},
            "vegetables": {
                "lettuce": [
                    "lettuce"
                ],
                "tomato": [
                    "tomato"
                ],
                "cucumber": [
                    "cucumber"
                ],
                "pepper": [
                    "green pepper"
                ],
                "onion": [
                    "onion"
                ]
            },
            "condiments": {},
            "spices": {}
        },
        "cost": 5.99,
        "calories": 220,
        "rating": 1,
        "dietary_tags": [
            "vegan"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 188,
        "cuisine": null,
        "restaurant": "urbane_cafe",
        "name": "So Cal",
        "ingredients": {
            "breads": {},
            "meats": {
                "chicken": [
                    "roasted chicken"
                ]
            },
            "cheeses": {
                "pepper jack": [
                    "pepper jack cheese"
                ]
            },
            "vegetables": {
                "avocado": [
                    "avocado"
                ],
                "lettuce": [
                    "green leaf lettuce"
                ]
            },
            "condiments": {
                "salsa": [
                    "tomatillo salsa"
                ],
                "aioli": [
                    "chipotle aioli"
                ]
            },
            "spices": {}
        },
        "cost": 11.5,
        "calories": 555,
        "rating": 1,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 189,
        "cuisine": "Southwestern",
        "restaurant": "urbane_cafe",
        "name": "Southwest",
        "ingredients": {
            "breads": {},
            "meats": {
                "chicken": [
                    "marinated southwest chicken"
                ]
            },
            "cheeses": {
                "pepper jack": [
                    "pepper jack cheese"
                ]
            },
            "vegetables": {
                "avocado": [
                    "avocado"
                ]
            },
            "condiments": {
                "salsa": [
                    "corn & black bean salsa"
                ],
                "aioli": [
                    "chipotle aioli"
                ]
            },
            "spices": {}
        },
        "cost": 11.5,
        "calories": 545,
        "rating": 3,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 190,
        "cuisine": "Vietnamese",
        "restaurant": "urbane_cafe",
        "name": "Uc Banh Mi",
        "ingredients": {
            "breads": {},
            "meats": {
                "chicken": [
                    "roasted chicken"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "cucumber": [
                    "cucumber"
                ],
                "carrot": [
                    "pickled carrot"
                ],
                "radish": [
                    "pickled white radish"
                ]
            },
            "condiments": {
                "aioli": [
                    "sweet chili aioli"
                ]
            },
            "spices": {}
        },
        "cost": 11.5,
        "calories": 340,
        "rating": 1,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 191,
        "cuisine": "Italian",
        "restaurant": "urbane_cafe",
        "name": "Pesto & Sundried Tomato",
        "ingredients": {
            "breads": {},
            "meats": {
                "chicken": [
                    "roasted chicken"
                ]
            },
            "cheeses": {
                "mozzarella": [
                    "mozzarella cheese"
                ]
            },
            "vegetables": {
                "tomato": [
                    "sundried tomatoe"
                ]
            },
            "condiments": {
                "pesto": [
                    "basil pesto"
                ]
            },
            "spices": {
                "basil": [
                    "basil pesto"
                ]
            }
        },
        "cost": 11.5,
        "calories": 385,
        "rating": 4,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 192,
        "cuisine": null,
        "restaurant": "urbane_cafe",
        "name": "Cilantro Torta",
        "ingredients": {
            "breads": {},
            "meats": {
                "chicken": [
                    "marinated cilantro chicken"
                ]
            },
            "cheeses": {
                "pepper jack": [
                    "pepper jack cheese"
                ]
            },
            "vegetables": {
                "avocado": [
                    "avocado"
                ],
                "onion": [
                    "pickled onion"
                ]
            },
            "condiments": {
                "salsa": [
                    "corn & black bean salsa",
                    "tomatillo salsa"
                ],
                "aioli": [
                    "chipotle aioli"
                ]
            },
            "spices": {}
        },
        "cost": 11.5,
        "calories": 585,
        "rating": 4,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 193,
        "cuisine": "Barbecue",
        "restaurant": "urbane_cafe",
        "name": "Santa Maria BBQ",
        "ingredients": {
            "breads": {},
            "meats": {
                "chicken": [
                    "marinated bbq chicken"
                ],
                "bacon": [
                    "applewood-smoked bacon"
                ]
            },
            "cheeses": {
                "cheddar": [
                    "cheddar cheese"
                ]
            },
            "vegetables": {},
            "condiments": {
                "dressing": [
                    "ranch dressing"
                ]
            },
            "spices": {}
        },
        "cost": 11.5,
        "calories": 440,
        "rating": 5,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 194,
        "cuisine": null,
        "restaurant": "urbane_cafe",
        "name": "Cranberry Brie",
        "ingredients": {
            "breads": {},
            "meats": {
                "turkey": [
                    "roasted turkey"
                ]
            },
            "cheeses": {
                "brie": [
                    "french brie"
                ]
            },
            "vegetables": {},
            "condiments": {
                "chutney": [
                    "cranberry chutney"
                ],
                "aioli": [
                    "herb aioli"
                ]
            },
            "spices": {}
        },
        "cost": 11.5,
        "calories": 415,
        "rating": 4,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 195,
        "cuisine": null,
        "restaurant": "urbane_cafe",
        "name": "Club",
        "ingredients": {
            "breads": {},
            "meats": {
                "turkey": [
                    "roasted turkey"
                ],
                "bacon": [
                    "applewood-smoked bacon"
                ]
            },
            "cheeses": {
                "cheddar": [
                    "cheddar cheese"
                ]
            },
            "vegetables": {
                "avocado": [
                    "avocado"
                ],
                "tomato": [
                    "tomato"
                ],
                "lettuce": [
                    "green leaf lettuce"
                ]
            },
            "condiments": {
                "aioli": [
                    "herb aioli"
                ]
            },
            "spices": {}
        },
        "cost": 11.5,
        "calories": 610,
        "rating": 5,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 196,
        "cuisine": null,
        "restaurant": "urbane_cafe",
        "name": "The Californian",
        "ingredients": {
            "breads": {},
            "meats": {},
            "cheeses": {
                "mozzarella": [
                    "mozzarella cheese"
                ]
            },
            "vegetables": {
                "artichoke": [
                    "house marinated artichoke heart"
                ],
                "avocado": [
                    "avocado"
                ],
                "tomato": [
                    "sundried tomatoe"
                ],
                "lettuce": [
                    "green leaf lettuce"
                ]
            },
            "condiments": {
                "aioli": [
                    "herb aioli"
                ]
            },
            "spices": {}
        },
        "cost": 11.5,
        "calories": 410,
        "rating": 5,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 197,
        "cuisine": null,
        "restaurant": "urbane_cafe",
        "name": "Bella Portobello",
        "ingredients": {
            "breads": {},
            "meats": {},
            "cheeses": {
                "mozzarella": [
                    "mozzarella cheese"
                ]
            },
            "vegetables": {
                "tomato": [
                    "sundried tomatoe"
                ]
            },
            "condiments": {
                "pesto": [
                    "basil pesto"
                ],
                "dressing": [
                    "mixed greens with balsamic dressing"
                ]
            },
            "spices": {
                "basil": [
                    "basil pesto"
                ]
            }
        },
        "cost": 11.5,
        "calories": 265,
        "rating": 1,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 198,
        "cuisine": "American",
        "restaurant": "urbane_cafe",
        "name": "Gourmet Grilled Cheese",
        "ingredients": {
            "breads": {},
            "meats": {},
            "cheeses": {
                "cheddar": [
                    "cheddar"
                ],
                "gorgonzola": [
                    "gorgonzola"
                ],
                "pepper jack": [
                    "pepper jack cheese"
                ]
            },
            "vegetables": {
                "avocado": [
                    "avocado"
                ]
            },
            "condiments": {
                "salsa": [
                    "tomatillo salsa"
                ]
            },
            "spices": {}
        },
        "cost": 9.75,
        "calories": 465,
        "rating": 5,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 199,
        "cuisine": "Vietnamese",
        "restaurant": "urbane_cafe",
        "name": "Tofu Banh Mi",
        "ingredients": {
            "breads": {},
            "meats": {},
            "cheeses": {
                "feta": [
                    "fyh feta (v)"
                ]
            },
            "vegetables": {
                "cucumber": [
                    "cucumber"
                ],
                "carrot": [
                    "pickled carrot"
                ],
                "radish": [
                    "pickled white radish"
                ]
            },
            "condiments": {
                "aioli": [
                    "sweet chili aioli"
                ]
            },
            "spices": {}
        },
        "cost": 11.5,
        "calories": 210,
        "rating": 5,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 200,
        "cuisine": null,
        "restaurant": "urbane_cafe",
        "name": "BBQ Tri Tip",
        "ingredients": {
            "breads": {},
            "meats": {},
            "cheeses": {
                "pepper jack": [
                    "pepper jack cheese"
                ]
            },
            "vegetables": {},
            "condiments": {
                "aioli": [
                    "chipotle aioli"
                ]
            },
            "spices": {}
        },
        "cost": 12.95,
        "calories": 180,
        "rating": 3,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 201,
        "cuisine": "Argentinian",
        "restaurant": "urbane_cafe",
        "name": "Chimichurri Steak",
        "ingredients": {
            "breads": {},
            "meats": {},
            "cheeses": {
                "feta": [
                    "feta"
                ]
            },
            "vegetables": {},
            "condiments": {
                "sauce": [
                    "housemade chimichurri sauce"
                ],
                "aioli": [
                    "cranberry chutney aioli"
                ]
            },
            "spices": {}
        },
        "cost": 12.95,
        "calories": 210,
        "rating": 3,
        "dietary_tags": [
            "vegetarian"
        ],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 202,
        "cuisine": null,
        "restaurant": "urbane_cafe",
        "name": "Pastrami Tri Tip",
        "ingredients": {
            "breads": {},
            "meats": {
                "pastrami": [
                    "pastrami tri tip"
                ]
            },
            "cheeses": {
                "swiss": [
                    "swiss cheese"
                ]
            },
            "vegetables": {},
            "condiments": {
                "aioli": [
                    "remoulade aioli"
                ],
                "butter": [
                    "bread and butter pickle"
                ]
            },
            "spices": {}
        },
        "cost": 12.95,
        "calories": 410,
        "rating": 3,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 203,
        "cuisine": null,
        "restaurant": "urbane_cafe",
        "name": "BLAT",
        "ingredients": {
            "breads": {},
            "meats": {
                "bacon": [
                    "bacon"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "lettuce": [
                    "lettuce"
                ],
                "avocado": [
                    "avocado"
                ],
                "tomato": [
                    "tomato"
                ]
            },
            "condiments": {},
            "spices": {}
        },
        "cost": 14.69,
        "calories": 230,
        "rating": 2,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    },
    {
        "_id": 204,
        "cuisine": "American",
        "restaurant": "urbane_cafe",
        "name": "BLT",
        "ingredients": {
            "breads": {},
            "meats": {
                "bacon": [
                    "bacon"
                ]
            },
            "cheeses": {},
            "vegetables": {
                "lettuce": [
                    "lettuce"
                ],
                "tomato": [
                    "tomato"
                ]
            },
            "condiments": {},
            "spices": {}
        },
        "cost": 14.39,
        "calories": 230,
        "rating": 4,
        "dietary_tags": [],
        "review_count": 1,
        "reviews": []
    }
]
}


// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
