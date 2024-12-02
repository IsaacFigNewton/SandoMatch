//Find by
const findSandwichByRating = (
    rating,
    sandwichesList
) => {
    let filteredSandwiches = sandwichesList;
    return filteredSandwiches.filter(
    (sandwich) => sandwich["rating"] >= rating
    );
};

const findSandwichByCalories = (
    minCalories,
    maxCalories,
    sandwichesList
) => {
    let filteredSandwiches = sandwichesList;
    return filteredSandwiches.filter(
    (sandwich) =>
        (!minCalories || sandwich["calories"] >= minCalories) &&
        (!maxCalories || sandwich["calories"] <= maxCalories)
    );
};

const findSandwichByCost = (
    maxCost,
    sandwichesList
) => {
    let filteredSandwiches = sandwichesList;
    return filteredSandwiches.filter(
    (sandwich) => sandwich["cost"] <= maxCost
    );
};

const findSandwichByRatingCalories = (
    rating,
    minCalories,
    maxCalories,
    sandwichesList
) => {
    let filteredSandwiches = sandwichesList;
    return filteredSandwiches.filter(
    (sandwich) =>
        sandwich["rating"] >= rating &&
        (!minCalories || sandwich["calories"] >= minCalories) &&
        (!maxCalories || sandwich["calories"] <= maxCalories)
    );
};

const findSandwichByCaloriesCost = (
    minCalories,
    maxCalories,
    maxCost,
    sandwichesList
) => {
    let filteredSandwiches = sandwichesList;
    return filteredSandwiches.filter(
    (sandwich) =>
        (!minCalories || sandwich["calories"] >= minCalories) &&
        (!maxCalories || sandwich["calories"] <= maxCalories) &&
        sandwich["cost"] <= maxCost
    );
};

const findSandwichByRatingCost = (
    rating,
    maxCost,
    sandwichesList
) => {
    let filteredSandwiches = sandwichesList;
    return filteredSandwiches.filter(
    (sandwich) =>
        sandwich["rating"] >= rating &&
        sandwich["cost"] <= maxCost
    );
};

const findSandwichByRatingCaloriesCost = (
    rating,
    minCalories,
    maxCalories,
    maxCost,
    sandwichesList
) => {
    let filteredSandwiches = sandwichesList;
    return filteredSandwiches.filter(
    (sandwich) =>
        sandwich["rating"] >= rating &&
        (!minCalories || sandwich["calories"] >= minCalories) &&
        (!maxCalories || sandwich["calories"] <= maxCalories) &&
        sandwich["cost"] <= maxCost
    );
};

const findSandwichById = (
    id,
    sandwichesList
) => {
    sandwichesList.find(
    (sandwich) => sandwich["id_"] === Number(id)
    );
}

export default {
    findSandwichByRating,
    findSandwichByCalories,
    findSandwichByCost,
    findSandwichByRatingCost,
    findSandwichByRatingCalories,
    findSandwichByCaloriesCost,
    findSandwichByRatingCaloriesCost,
    findSandwichById
};