const findSandwichById = (id, sandwichesList) => {
  sandwichesList.find(
    (sandwich) => sandwich["id_"] === Number(id)
  );
};

const filterSandwiches = (
  sandwichesList,
  ingredientsToInclude,
  ingredientsToExclude,
  maxCost,
  minCalories,
  maxCalories,
  rating
) => {
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
