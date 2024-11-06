//backend.js

import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const findSandwichByRating = (rating) => {
  return sandwiches["sandwiches_list"].filter(
    (sandwich) => sandwich["rating"] === rating
  );
};

const findSandwichByCalories = (calories) => {
  return sandwiches["sandwiches_list"].filter(
    (sandwich) => sandwich["calories"] === calories
  );
};

const findSandwichByCost = (cost) => {
  return sandwiches["sandwiches_list"].filter(
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

const sandwiches = {
  sandwiches_list: [
    {
        "id_": 0,
        "cuisine": null,
        "ingredients": {
            "breads": {},
            "meats": {},
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
        "cost": 2.3,
        "calories": 265,
        "rating": 1,
        "dietary_tags": [
            "vegan"
        ]
    },
    {
        "id_": 1,
        "cuisine": null,
        "ingredients": {
            "breads": {},
            "meats": {
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
        "cost": 3.9,
        "calories": 425,
        "rating": 2,
        "dietary_tags": []
    },
    {
        "id_": 2,
        "cuisine": null,
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
        "rating": 1,
        "dietary_tags": [
            "vegetarian"
        ]
    },
    {
        "id_": 3,
        "cuisine": "cajun_creole",
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
        "rating": 2,
        "dietary_tags": []
    },
    {
        "id_": 4,
        "cuisine": "spanish",
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
        "dietary_tags": []
    },
    {
        "id_": 5,
        "cuisine": "mexican",
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
        "rating": 5,
        "dietary_tags": []
    },
    {
        "id_": 6,
        "cuisine": "cajun_creole",
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
        "dietary_tags": []
    },
    {
        "id_": 7,
        "cuisine": "italian",
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
        "dietary_tags": []
    },
    {
        "id_": 8,
        "cuisine": "italian",
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
        "rating": 2,
        "dietary_tags": []
    },
    {
        "id_": 9,
        "cuisine": "american",
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
        "rating": 3,
        "dietary_tags": []
    },
    {
        "id_": 10,
        "cuisine": "french",
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
        "rating": 5,
        "dietary_tags": []
    },
    {
        "id_": 11,
        "cuisine": "mediterranean",
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
        "rating": 4,
        "dietary_tags": [
            "vegetarian"
        ]
    },
    {
        "id_": 12,
        "cuisine": "italian",
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
        "rating": 3,
        "dietary_tags": [
            "vegetarian"
        ]
    },
    {
        "id_": 13,
        "cuisine": "american",
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
        "rating": 5,
        "dietary_tags": []
    },
    {
        "id_": 14,
        "cuisine": "scandinavian",
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
        "rating": 5,
        "dietary_tags": [
            "vegetarian"
        ]
    },
    {
        "id_": 15,
        "cuisine": "american",
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
        "rating": 3,
        "dietary_tags": []
    },
    {
        "id_": 16,
        "cuisine": "middle_eastern",
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
        "rating": 1,
        "dietary_tags": [
            "vegan"
        ]
    },
    {
        "id_": 17,
        "cuisine": "italian",
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
        "rating": 2,
        "dietary_tags": [
            "vegetarian"
        ]
    },
    {
        "id_": 18,
        "cuisine": "french",
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
        "dietary_tags": []
    },
    {
        "id_": 19,
        "cuisine": "american",
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
        "dietary_tags": []
    },
    {
        "id_": 20,
        "cuisine": "american",
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
        "rating": 1,
        "dietary_tags": []
    },
    {
        "id_": 21,
        "cuisine": "german",
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
        "rating": 5,
        "dietary_tags": []
    },
    {
        "id_": 22,
        "cuisine": "american",
        "ingredients": {
            "breads": {
                "english muffin": [
                    "english muffin"
                ]
            },
            "meats": {
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
        "cost": 2.3,
        "calories": 250,
        "rating": 1,
        "dietary_tags": []
    },
    {
        "id_": 23,
        "cuisine": "indian",
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
        "rating": 4,
        "dietary_tags": []
    },
    {
        "id_": 24,
        "cuisine": "french",
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
        "rating": 1,
        "dietary_tags": []
    },
    {
        "id_": 25,
        "cuisine": "american",
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
        "rating": 1,
        "dietary_tags": []
    },
    {
        "id_": 26,
        "cuisine": "chinese",
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
        "dietary_tags": []
    },
    {
        "id_": 27,
        "cuisine": "italian",
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
        "cost": 6.5,
        "calories": 455,
        "rating": 4,
        "dietary_tags": [
            "vegetarian"
        ]
    },
    {
        "id_": 28,
        "cuisine": "greek",
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
        "rating": 2,
        "dietary_tags": []
    },
    {
        "id_": 29,
        "cuisine": "french",
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
        "rating": 5,
        "dietary_tags": [
            "vegetarian"
        ]
    },
    {
        "id_": 30,
        "cuisine": "american",
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
        "rating": 2,
        "dietary_tags": []
    },
    {
        "id_": 31,
        "cuisine": "california",
        "ingredients": {
            "breads": {
                "sourdough": [
                    "sourdough bread"
                ]
            },
            "meats": {},
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
        "cost": 4.1,
        "calories": 390,
        "rating": 2,
        "dietary_tags": [
            "vegan"
        ]
    },
    {
        "id_": 32,
        "cuisine": "jewish",
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
        "rating": 1,
        "dietary_tags": [
            "vegetarian"
        ]
    },
    {
        "id_": 33,
        "cuisine": "southern_us",
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
        "rating": 1,
        "dietary_tags": []
    },
    {
        "id_": 34,
        "cuisine": "middle_eastern",
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
        "rating": 1,
        "dietary_tags": [
            "vegetarian"
        ]
    },
    {
        "id_": 35,
        "cuisine": "italian",
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
        "rating": 3,
        "dietary_tags": []
    },
    {
        "id_": 36,
        "cuisine": "american",
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
        "rating": 5,
        "dietary_tags": []
    },
    {
        "id_": 37,
        "cuisine": "french",
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
        "rating": 1,
        "dietary_tags": []
    },
    {
        "id_": 38,
        "cuisine": "american",
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
        "rating": 1,
        "dietary_tags": [
            "vegan"
        ]
    },
    {
        "id_": 39,
        "cuisine": "mexican",
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
        ]
    },
    {
        "id_": 40,
        "cuisine": "german",
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
        "rating": 2,
        "dietary_tags": [
            "vegan"
        ]
    },
    {
        "id_": 41,
        "cuisine": "korean",
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
        "dietary_tags": []
    },
    {
        "id_": 42,
        "cuisine": "american",
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
        "dietary_tags": []
    },
    {
        "id_": 43,
        "cuisine": "italian",
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
        "rating": 4,
        "dietary_tags": []
    },
    {
        "id_": 44,
        "cuisine": "middle_eastern",
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
        "rating": 2,
        "dietary_tags": []
    },
    {
        "id_": 45,
        "cuisine": "vegetarian",
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
        "rating": 5,
        "dietary_tags": [
            "vegan"
        ]
    },
    {
        "id_": 46,
        "cuisine": "southern_us",
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
        "rating": 1,
        "dietary_tags": []
    },
    {
        "id_": 47,
        "cuisine": "french",
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
        "rating": 4,
        "dietary_tags": []
    },
    {
        "id_": 48,
        "cuisine": "indian",
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
        "rating": 2,
        "dietary_tags": []
    },
    {
        "id_": 49,
        "cuisine": "vegetarian",
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
        "rating": 3,
        "dietary_tags": [
            "vegetarian"
        ]
    },
    {
        "id_": 50,
        "cuisine": "german",
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
        ]
    },
    {
        "id_": 51,
        "cuisine": "new_england",
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
        "dietary_tags": []
    },
    {
        "id_": 52,
        "cuisine": "italian",
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
        "rating": 3,
        "dietary_tags": []
    },
    {
        "id_": 53,
        "cuisine": "middle_eastern",
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
        "rating": 4,
        "dietary_tags": [
            "vegan"
        ]
    },
    {
        "id_": 54,
        "cuisine": "scandinavian",
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
        "rating": 5,
        "dietary_tags": [
            "vegan"
        ]
    },
    {
        "id_": 55,
        "cuisine": "italian",
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
        "rating": 5,
        "dietary_tags": [
            "vegan"
        ]
    },
    {
        "id_": 56,
        "cuisine": "japanese",
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
        "rating": 1,
        "dietary_tags": []
    },
    {
        "id_": 57,
        "cuisine": "british",
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
        "rating": 4,
        "dietary_tags": []
    },
    {
        "id_": 58,
        "cuisine": "mediterranean",
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
        "rating": 5,
        "dietary_tags": []
    },
    {
        "id_": 59,
        "cuisine": "french",
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
        "rating": 3,
        "dietary_tags": [
            "vegetarian"
        ]
    },
    {
        "id_": 60,
        "cuisine": "american",
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
        ]
    },
    {
        "id_": 61,
        "cuisine": "venezuelan",
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
        "rating": 2,
        "dietary_tags": [
            "vegetarian"
        ]
    },
    {
        "id_": 62,
        "cuisine": "vegan",
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
        "rating": 2,
        "dietary_tags": [
            "vegan"
        ]
    },
    {
        "id_": 63,
        "cuisine": "french",
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
        "rating": 2,
        "dietary_tags": [
            "vegan"
        ]
    },
    {
        "id_": 64,
        "cuisine": "british",
        "ingredients": {
            "breads": {
                "whole wheat": [
                    "whole wheat bread"
                ]
            },
            "meats": {},
            "cheeses": {},
            "vegetables": {
                "radish": [
                    "radish slice"
                ]
            },
            "condiments": {},
            "spices": {}
        },
        "cost": 1.4,
        "calories": 190,
        "rating": 3,
        "dietary_tags": [
            "vegan"
        ]
    },
    {
        "id_": 65,
        "cuisine": "mexican",
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
        "rating": 2,
        "dietary_tags": [
            "vegetarian"
        ]
    },
    {
        "id_": 66,
        "cuisine": "scandinavian",
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
        "rating": 3,
        "dietary_tags": [
            "vegan"
        ]
    },
    {
        "id_": 67,
        "cuisine": "southern_us",
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
        "rating": 1,
        "dietary_tags": []
    },
    {
        "id_": 68,
        "cuisine": "mediterranean",
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
        "rating": 4,
        "dietary_tags": [
            "vegetarian"
        ]
    },
    {
        "id_": 69,
        "cuisine": "italian_american",
        "ingredients": {
            "breads": {
                "sourdough": [
                    "sourdough bread"
                ]
            },
            "meats": {},
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
        "cost": 3.5,
        "calories": 360,
        "rating": 4,
        "dietary_tags": [
            "vegetarian"
        ]
    },
    {
        "id_": 70,
        "cuisine": "greek",
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
        "rating": 2,
        "dietary_tags": []
    },
    {
        "id_": 71,
        "cuisine": "indian",
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
        "rating": 1,
        "dietary_tags": []
    },
    {
        "id_": 72,
        "cuisine": "french",
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
        ]
    },
    {
        "id_": 73,
        "cuisine": "vegan",
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
        "rating": 3,
        "dietary_tags": []
    },
    {
        "id_": 74,
        "cuisine": "american",
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
        "rating": 2,
        "dietary_tags": []
    },
    {
        "id_": 75,
        "cuisine": "chinese",
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
        "rating": 2,
        "dietary_tags": []
    },
    {
        "id_": 76,
        "cuisine": "italian",
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
        "rating": 5,
        "dietary_tags": [
            "vegan"
        ]
    },
    {
        "id_": 77,
        "cuisine": "mexican",
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
        "rating": 1,
        "dietary_tags": [
            "vegetarian"
        ]
    },
    {
        "id_": 78,
        "cuisine": "american",
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
        "rating": 3,
        "dietary_tags": []
    },
    {
        "id_": 79,
        "cuisine": "spanish",
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
        "rating": 5,
        "dietary_tags": [
            "vegan"
        ]
    },
    {
        "id_": 80,
        "cuisine": "indian",
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
        "rating": 1,
        "dietary_tags": [
            "vegan"
        ]
    },
    {
        "id_": 81,
        "cuisine": "vegan",
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
        "rating": 4,
        "dietary_tags": [
            "vegan"
        ]
    },
    {
        "id_": 82,
        "cuisine": "italian",
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
        "rating": 2,
        "dietary_tags": [
            "vegetarian"
        ]
    },
    {
        "id_": 83,
        "cuisine": "scandinavian",
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
        "rating": 1,
        "dietary_tags": [
            "vegetarian"
        ]
    },
    {
        "id_": 84,
        "cuisine": "southern_us",
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
        "rating": 1,
        "dietary_tags": []
    },
    {
        "id_": 85,
        "cuisine": "german",
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
        "dietary_tags": []
    },
    {
        "id_": 86,
        "cuisine": "israeli",
        "ingredients": {
            "breads": {
                "pita": [
                    "pita bread"
                ]
            },
            "meats": {},
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
        "cost": 3.3,
        "calories": 390,
        "rating": 2,
        "dietary_tags": [
            "vegan"
        ]
    },
    {
        "id_": 87,
        "cuisine": "french",
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
        "rating": 5,
        "dietary_tags": []
    },
    {
        "id_": 88,
        "cuisine": "japanese",
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
        "rating": 2,
        "dietary_tags": [
            "vegan"
        ]
    },
    {
        "id_": 89,
        "cuisine": "italian",
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
        "dietary_tags": []
    },
    {
        "id_": 90,
        "cuisine": "british",
        "ingredients": {
            "breads": {},
            "meats": {},
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
        "cost": 1.9,
        "calories": 70,
        "rating": 3,
        "dietary_tags": [
            "vegan"
        ]
    },
    {
        "id_": 91,
        "cuisine": "mexican",
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
        "rating": 2,
        "dietary_tags": [
            "vegan"
        ]
    },
    {
        "id_": 92,
        "cuisine": "french",
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
        "rating": 4,
        "dietary_tags": [
            "vegetarian"
        ]
    },
    {
        "id_": 93,
        "cuisine": "vegan",
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
        "rating": 3,
        "dietary_tags": [
            "vegan"
        ]
    },
    {
        "id_": 94,
        "cuisine": "southern_us",
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
        "rating": 5,
        "dietary_tags": [
            "vegan"
        ]
    },
    {
        "id_": 95,
        "cuisine": "chinese",
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
        "rating": 2,
        "dietary_tags": []
    },
    {
        "id_": 96,
        "cuisine": "vegan",
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
        "rating": 5,
        "dietary_tags": [
            "vegetarian"
        ]
    },
    {
        "id_": 97,
        "cuisine": "north_african",
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
        "rating": 4,
        "dietary_tags": []
    },
    {
        "id_": 98,
        "cuisine": "japanese",
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
        ]
    },
    {
        "id_": 99,
        "cuisine": "middle_eastern",
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
        "dietary_tags": []
    },
    {
        "id_": 100,
        "cuisine": "italian",
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
        ]
    },
    {
        "id_": 101,
        "cuisine": "german",
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
        "rating": 2,
        "dietary_tags": [
            "vegan"
        ]
    },
    {
        "id_": 102,
        "cuisine": "american",
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
        "dietary_tags": []
    },
    {
        "id_": 103,
        "cuisine": "levantine",
        "ingredients": {
            "breads": {
                "whole wheat": [
                    "whole wheat wrap"
                ]
            },
            "meats": {},
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
        "cost": 4.7,
        "calories": 335,
        "rating": 4,
        "dietary_tags": [
            "vegetarian"
        ]
    },
    {
        "id_": 104,
        "cuisine": "french",
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
                ]
            },
            "spices": {}
        },
        "cost": 2.0,
        "calories": 255,
        "rating": 5,
        "dietary_tags": [
            "vegan"
        ]
    },
    {
        "id_": 105,
        "cuisine": "indian",
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
        "rating": 3,
        "dietary_tags": [
            "vegetarian"
        ]
    },
    {
        "id_": 106,
        "cuisine": "middle_eastern",
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
        "rating": 4,
        "dietary_tags": [
            "vegan"
        ]
    },
    {
        "id_": 107,
        "cuisine": "mexican",
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
        "rating": 3,
        "dietary_tags": [
            "vegan"
        ]
    },
    {
        "id_": 108,
        "cuisine": "french",
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
        "rating": 3,
        "dietary_tags": []
    },
    {
        "id_": 109,
        "cuisine": "italian",
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
        "rating": 2,
        "dietary_tags": [
            "vegetarian"
        ]
    },
    {
        "id_": 110,
        "cuisine": "korean",
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
        "dietary_tags": []
    },
    {
        "id_": 111,
        "cuisine": "scandinavian",
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
        ]
    },
    {
        "id_": 112,
        "cuisine": "french",
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
        "rating": 1,
        "dietary_tags": [
            "vegan"
        ]
    },
    {
        "id_": 113,
        "cuisine": "british",
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
        "rating": 2,
        "dietary_tags": []
    },
    {
        "id_": 114,
        "cuisine": "baltic",
        "ingredients": {
            "breads": {},
            "meats": {},
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
        "cost": 1.7,
        "calories": 165,
        "rating": 3,
        "dietary_tags": [
            "vegan"
        ]
    },
    {
        "id_": 115,
        "cuisine": "italian",
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
        "rating": 4,
        "dietary_tags": [
            "vegan"
        ]
    }
]
};

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
