import axios from 'axios';
// import hits from './dummy.js';

const spoonacularAPI = axios.create({
    baseURL: 'https://api.spoonacular.com/recipes',
    params: {
        apiKey: '46bdbd59e31d4fef9fc381b3a71e94ad',
    },
});

// const extractRecipeId = (uri) => {
//     return uri.slice(uri.lastIndexOf('_') + 1);
// };

// const parseMealType = (mealType) => {
//     return mealType.length && mealType[0].split('/');
// };

/**
 * @param {string} query
 * @returns returns a list of up to 20 recipes based on the query
 */
export const getSpoonacularComplexSearch = async (query = '', count = 0) => {
    const param = {};
    if (query) {
        param.query = query;
    }
    if (count) {
        param.number = count;
    }

    try {
        const { data } = await spoonacularAPI.get('complexSearch', {
            params: {
                ...param,
                addRecipeInformation: true,
                fillIngredients: true,
                addRecipeNutrition: true,
            },
        });
        console.log('getSpoonacularComplexSearch', data.results);
        return data.results;
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

//Get Similar Recipes
//GET https://api.spoonacular.com/recipes/{id}/similar

//Autocomplete Recipe Search
//GET https://api.spoonacular.com/recipes/autocomplete?query={query}
