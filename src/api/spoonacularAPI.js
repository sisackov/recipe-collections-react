import axios from 'axios';
import { SPOONACULAR_API_KEY } from '../utils/keys';
import { setRecipeInDB } from './firebase';

const spoonacularAPI = axios.create({
    baseURL: 'https://api.spoonacular.com/recipes',
    params: {
        apiKey: SPOONACULAR_API_KEY,
    },
});

const mapSpoonacularId = (results, save = true) => {
    console.log('mapSpoonacularId', results);
    return results.map((recipe) => {
        const newRecipe = {
            recipeId: `sponacular-${recipe.id}`,
            ...recipe,
        };
        save && setRecipeInDB(newRecipe);
        return newRecipe;
    });
};

/**
 * @param {string} query
 * @returns returns a list of up to 20 recipes based on the query
 */
const getSpoonacularComplexSearch = async (
    query = '',
    count = 0,
    recipeInfo = false,
    ingredients = false,
    nutrition = false
) => {
    const param = {
        ...(query && { query: query }),
        ...(count && { number: count }),
        ...(recipeInfo && { addRecipeInformation: true }),
        ...(ingredients && { fillIngredients: true }),
        ...(nutrition && { addRecipeNutrition: true }),
    };

    const { data } = await spoonacularAPI.get('complexSearch', {
        params: {
            ...param,
        },
    });
    console.log('getSpoonacularComplexSearch', data);
    return mapSpoonacularId(data.results);
};

/**
 * Use a recipe id to get full information about a recipe, such as ingredients,
 * nutrition, diet and allergen information, etc
 * includes instructions, ingredients, and other information
 * 1 point and 0.1 points if includeNutrition is true
 */
const getSpoonacularRecipeInfo = async (id, nutrition) => {
    const { data } = await spoonacularAPI.get(`${id}/information`, {
        params: {
            ...(nutrition && { includeNutrition: true }),
        },
    });
    return data;
};

/**
 * Get information about multiple recipes at once.
 * This is equivalent to calling the Get Recipe Information endpoint multiple times, but faster.
 * @param {string} ids
 * @param {boolean} nutrition
 * @returns
 */
const getSpoonacularRecipeInfoBulk = async (ids, nutrition) => {
    const { data } = await spoonacularAPI.get(`informationBulk`, {
        params: {
            ...(nutrition && { includeNutrition: true }),
            ids: ids,
        },
    });
    // const recipes = Object.values(data.recipes).map((recipe) => recipe);
    console.log('getSpoonacularRecipeInfoBulk', Object.values(data));
    const recipes = [];
    for (const recipe of data) {
        console.log('getSpoonacularRecipeInfoBulk wer', recipe);
        recipes.push(recipe);
    }

    return mapSpoonacularId(recipes);
};

/**
 * Find random (popular) recipes
 * @param {*} numOfRecipes The number of random recipes to be returned (between 1 and 100)
 * @param {*} tags -The tags (can be diets, meal types, cuisines, or intolerances) that the recipe must have.
 * 1 point and 0.01 points per recipe returned
 */
const getSpoonacularRandomRecipes = async (numOfRecipes = 10, tags = '') => {
    const { data } = await spoonacularAPI.get('random', {
        params: {
            number: numOfRecipes,
            ...(tags && { tags: tags }),
        },
    });
    return mapSpoonacularId(data.recipes);
};

/**
 * Autocomplete a partial input to suggest possible recipe names.
 * @param {string} query The query to be autocompleted.
 * @param {number} numOfResults The number of results to return (between 1 and 25).
 * 0.1 points
 */
const getSpoonacularAutocomplete = async (query, numOfResults) => {
    const { data } = await spoonacularAPI.get('autocomplete', {
        params: {
            query: query,
            number: numOfResults,
        },
    });
    // console.log('getSpoonacularAutocomplete', data);
    return data;
};

const getSpoonacularSimilar = async (id, numOfRecipes) => {
    const { data } = await spoonacularAPI.get(`${id}/similar`, {
        params: {
            number: numOfRecipes,
        },
    });
    console.log('getSpoonacularSimilar', data);
    return mapSpoonacularId(data, false);
};

export {
    getSpoonacularComplexSearch,
    getSpoonacularRecipeInfo,
    getSpoonacularRecipeInfoBulk,
    getSpoonacularRandomRecipes,
    getSpoonacularAutocomplete,
    getSpoonacularSimilar,
};

//Get Similar Recipes - 1 point and 0.01 points per recipe returned
//GET https://api.spoonacular.com/recipes/{id}/similar

//Autocomplete Recipe Search - 0.1 points
//GET https://api.spoonacular.com/recipes/autocomplete?query={query}
