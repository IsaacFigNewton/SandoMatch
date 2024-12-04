// check for existing sandwich in database
const getExistingSandwich = (ingredients, restaurantId) => {
  return sandwichesList.find(
    (sandwich) =>
      sandwich.restaurant_id === restaurantId &&
      JSON.stringify(sandwich.ingredients) ===
        JSON.stringify(ingredients)
  );
};

// Determine dietary tags
const getDietaryTags = (ingredients) => {
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

// TODO: Integrate this in the random ingredient selection function, using the filter schema
const getVeganIngredients = () => {
  // list of non-vegan ingredients for checking
  const nonVeganIngredients = ["eggs", "cheese", "meat"];
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

// TODO: Integrate this with the db-tables/sandwiches.json entries until Madi finishes sando CRUD
// make a function that selects from the list of ingredients ex: vegetables and check for duplicates
const getRandomIngredients = (veganIngredients) => {
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
const getCostAndCalories = (ingredients, restaurantData) => {
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

// TODO: Merge this function with the one below
// vegan route is still in a work in progress
// route to generate vegan sandwich
const generateVeganSandwich = () => {
  const veganIngredients = getVeganIngredients();
  const selectedIngredients =
    getRandomIngredients(veganIngredients);

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

  // return vegan sandwich object
  return {
    sandwich: {
      id_: sandwichesList.length,
      name: `Vegan Sandwich ${sandwichesList.length + 1}`,
      ingredients: selectedIngredients,
      cost,
      calories,
      dietary_tags: ["vegan"]
    },
    addEntry: False
  };
};

/*
// Default filter values for reference; the ingredient category fields will contain strings that can be used to filter the 1st ingredients
const [filters, setFilters] = useState({
    dietary_tags: [],
    ingredients: {
      include: {
        breads: [],
        meats: [],
        cheeses: [],
        vegetables: [],
        condiments: [],
        spices: []
      },
      exclude: {
        breads: [],
        meats: [],
        cheeses: [],
        vegetables: [],
        condiments: [],
        spices: []
      }
    },
    maxCost: 1000,
    minCalories: 0,
    maxCalories: 1000,
    rating: 0
  });

// Note that the sandwich objects' ingredients fields will look something like the following:
"breads": {
        "baguette": ["baguette"]
      },
      "meats": {
        "beef": ["beef bourguignon"]
      },
      "cheeses": {},
      "vegetables": {},
      "condiments": {
        "mustard": ["dijon mustard"]
      },
      "spices": {}
*/

// generate a new sandwich
// TODO: Integrate this with filters (once the other stuff is fixed)
const generateSandwich = () => {
  const sandoIngredients = getRandomIngredients();

  // list of restaurants IDs to check
  const restaurants = ["default", "mr_pickles", "subway"];

  // TODO: Implement this
  // if the sandwich is available at the restaurant, add it to the list below
  const availableAtRestaurants = [];

  // check restaurants for matching ingredient combinations
  for (const restaurant of restaurants) {
    const restaurantData =
      getIngredientsForRestaurant(restaurant);

    // verify all provided ingredients exist in the restaurants data
    // if ingredients match, calculate for specific restaurant
    const allIngredientsExist = Object.entries(
      ingredients
    ).every(([category, items]) =>
      items.every(
        (item) => restaurantData[category]?.[item.toLowerCase()]
      )
    );

    // skip if ingredients don't match restaurant ingredients
    if (!allIngredientsExist) {
      console.log(
        `Skipping ${restaurant} - Missing ingredients.`
      );
      continue;
    }

    // check if sandwich with same ingredients already exists
    const existingSandwich = getExistingSandwich(
      sandoIngredients,
      restaurant
    );
    // if it does, return it
    if (existingSandwich) {
      return {
        sandwich: existingSandwich,
        addEntry: False
      };
    }

    // generate a new sandwich for the restaurant
    const restaurantCalc = getCostAndCalories(
      sandoIngredients,
      restaurantData
    );

    return {
      sandwich: {
        id: sandwichesList.length,
        name: `Generated Sandwich (${restaurant})`,
        ingredients: sandoIngredients,
        cost: restaurantCalc.cost,
        calories: restaurantCalc.calories,
        dietary_tags: getDietaryTags(sandoIngredients),
        restaurant_id: restaurant
      },
      addEntry: False
    };
  }
};

export default { generateSandwich };
