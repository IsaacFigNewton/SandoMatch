
const findSandwichById = (
    sandwichesList,
    id
) => {
    return sandwichesList.filter((
    ) => {
      (sandwich) => sandwich["id_"] === Number(id)
    });
}


const filterSandwiches = (sandwichesList, filters) => {
    const { rating, minCalories, maxCalories, maxCost, ingredient } = filters;
    console.log("Filters: ", filters);

    let filteredSandwiches = sandwichesList;

    // Filter by ingredient (case-insensitive, within nested structure)
    if (ingredient) {
        const lowerCaseIngredient = ingredient.toLowerCase();
        filteredSandwiches = filteredSandwiches.filter((sandwich) =>
            Object.values(sandwich.ingredients || {}).some((category) =>
                Object.values(category).flat().some(
                    (item) => item.toLowerCase() === lowerCaseIngredient
                )
            )
        );
    }

    // Filter by max cost
    if (maxCost) {
        filteredSandwiches = filteredSandwiches.filter(
            (sandwich) => sandwich.costs && sandwich.costs[0] <= parseFloat(maxCost)
        );
    }

    // Filter by calories
    if (minCalories || maxCalories) {
        filteredSandwiches = filteredSandwiches.filter((sandwich) => {
            const calories = sandwich.calories && sandwich.calories[0];
            return (
                (!minCalories || calories >= parseInt(minCalories)) &&
                (!maxCalories || calories <= parseInt(maxCalories))
            );
        });
    }

    // Filter by rating
    if (rating) {
        filteredSandwiches = filteredSandwiches.filter(
            (sandwich) => sandwich.rating >= parseFloat(rating)
        );
    }

    return filteredSandwiches;
};

//export default filterSandwiches;


export default { findSandwichById, filterSandwiches };