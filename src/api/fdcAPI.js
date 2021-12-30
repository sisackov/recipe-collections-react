import axios from 'axios';
// import hits from './dummy.js';

const fdcAPI = axios.create({
    baseURL: 'https://api.nal.usda.gov/fdc/v1',
});

/**
 * @param {string} query
 * @returns returns a list of up to 20 recipes based on the query
 */
export const fdcFoodSearch = async (query) => {
    try {
        const { data } = await fdcAPI.get('foods/search', {
            params: {
                query: query,
                pageSize: 1,
                api_key: '4WakyFh4zIhqy0CbhEbotyFAnlZLT29UmtmdHIOR',
            },
        });
        console.log(data);

        // return hits.map(({ recipe }) => ({
        //     id: extractRecipeId(recipe.uri),
        //     title: recipe.label,
        //     images: recipe.images,
        //     servings: recipe.yield,
        //     prepTime: recipe.totalTime,
        //     calories: recipe.calories,
        //     cuisineType: recipe.cuisineType,
        //     mealType: parseMealType(recipe.mealType) || [],
        //     weight: recipe.totalWeight,
        //     ingredients: {
        //         lines: recipe.ingredientLines,
        //         items: recipe.ingredients,
        //     },
        //     tags: {
        //         diet: recipe.dietLabels,
        //         health: recipe.healthLabels,
        //         cautions: recipe.cautions,
        //     },
        //     nutrients: recipe.totalNutrients,
        //     source: {
        //         label: recipe.source,
        //         url: recipe.url,
        //         link: recipe.shareAs,
        //     },
        // }));
    } catch (error) {
        console.log(error);
    }
    return [];
};

// https://api.nal.usda.gov/fdc/v1/foods/search?query=chicken&pageSize=1&api_key=4WakyFh4zIhqy0CbhEbotyFAnlZLT29UmtmdHIOR
// https://api.nal.usda.gov/fdc/v1/foods/search?query=chicken&pageSize=1&app_key=4WakyFh4zIhqy0CbhEbotyFAnlZLT29UmtmdHIOR
