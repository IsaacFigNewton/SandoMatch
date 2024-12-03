const findSandwichById = (id, sandwichesList) => {
  sandwichesList.find(
    (sandwich) => sandwich["id_"] === Number(id)
  );
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

const filterSandwiches = (
  sandwichesList,
  ingredientsToInclude,
  ingredientsToExclude,
  maxCost,
  minCalories,
  maxCalories,
  rating
) => {
  // TODO: Fix one of the following to index into the sandwich objects' "ingredients" fields
  // Variation 1
  /*
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
  )
  */

  // Variation 2
  /*
    // filter by ingredients to INCLUDE
    sandwichesList = sandwichesList.filter((sandwich) =>
        Object.values(sandwich.ingredients).some((category) =>
        Object.keys(category).includes(ingredientsToInclude)
        )
    );

    // filter by ingredients to EXCLUDE
    sandwichesList = sandwichesList.filter((sandwich) =>
        Object.values(sandwich.ingredients).some((category) =>
        Object.keys(category).includes(ingredientsToExclude)
        )
    );
  */

  // filter by cost
  if (maxCost) {
    sandwichesList = sandwichesList.filter(
      (sandwich) => sandwich.cost <= Number(maxCost)
    );
  }

  // filter by calories
  sandwichesList = sandwichesList.filter(
    (sandwich) =>
      (!minCalories ||
        sandwich.calories >= Number(minCalories)) &&
      (!maxCalories || sandwich.calories <= Number(maxCalories))
  );

  // filter by rating
  sandwichesList = sandwichesList.filter(
    (sandwich) => sandwich.rating >= Number(rating)
  );

  return sandwichesList;
};

export default {
  findSandwichById,
  filterSandwiches
};
