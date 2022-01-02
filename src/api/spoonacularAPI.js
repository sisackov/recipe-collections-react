import axios from 'axios';
// import hits from './dummy.js';

const spoonacularAPI = axios.create({
    baseURL: 'https://api.spoonacular.com/recipes',
    params: {
        apiKey: '46bdbd59e31d4fef9fc381b3a71e94ad',
    },
});

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
        return data.results.map((item) => {
            return {
                recipeId: `sponacular-${item.id}`,
                ...item,
            };
        });
    } catch (error) {
        console.log(error);
    }
    return [];
};

//Get Similar Recipes
//GET https://api.spoonacular.com/recipes/{id}/similar

//Autocomplete Recipe Search
//GET https://api.spoonacular.com/recipes/autocomplete?query={query}
