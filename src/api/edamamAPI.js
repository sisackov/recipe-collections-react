import axios from 'axios';
// import hits from './dummy.js';

const edamamAPI = axios.create({
    baseURL: 'https://api.edamam.com/api/recipes/v2',
    params: {
        type: 'public',
        beta: 'true',
        app_id: '10cb6daa',
        app_key: '92ed9903b5fc8d578bbd07b8f015f474',
    },
});

const extractRecipeId = (uri) => {
    return uri.slice(uri.lastIndexOf('_') + 1);
};

const parseMealType = (mealType) => {
    return mealType.length && mealType[0].split('/');
};

/**
 * @param {string} query
 * @returns returns a list of up to 20 recipes based on the query
 */
export const getEdamamRecipes = async (query) => {
    try {
        const {
            data: { hits },
        } = await edamamAPI.get('', {
            params: {
                q: query,
            },
        });
        // const recipes = response.data.map((user) => ({

        return hits.map(({ recipe }) => ({
            id: extractRecipeId(recipe.uri),
            title: recipe.label,
            images: recipe.images,
            servings: recipe.yield,
            prepTime: recipe.totalTime,
            calories: recipe.calories,
            cuisineType: recipe.cuisineType,
            mealType: parseMealType(recipe.mealType) || [],
            weight: recipe.totalWeight,
            ingredients: {
                lines: recipe.ingredientLines,
                items: recipe.ingredients,
            },
            tags: {
                diet: recipe.dietLabels,
                health: recipe.healthLabels,
                cautions: recipe.cautions,
            },
            nutrients: recipe.totalNutrients,
            source: {
                label: recipe.source,
                url: recipe.url,
                link: recipe.shareAs,
            },
        }));
    } catch (error) {
        console.log(error);
    }
    return [];
};

/**
 * @param {string} recipeId
 * @returns returns a recipe object based on the recipeId
 */
export const getEdamamRecipeByID = async (recipeId) => {
    try {
        const {
            data: { recipe },
        } = await edamamAPI.get(recipeId);
        console.log(recipe);
        // const recipes = response.data.map((user) => ({

        return {
            id: extractRecipeId(recipe.uri),
            title: recipe.label,
            images: recipe.images,
            servings: recipe.yield,
            prepTime: recipe.totalTime,
            calories: recipe.calories,
            cuisineType: recipe.cuisineType,
            mealType: parseMealType(recipe.mealType) || [],
            weight: recipe.totalWeight,
            ingredients: {
                lines: recipe.ingredientLines,
                items: recipe.ingredients,
            },
            tags: {
                diet: recipe.dietLabels,
                health: recipe.healthLabels,
                cautions: recipe.cautions,
            },
            nutrients: recipe.totalNutrients,
            source: {
                label: recipe.source,
                url: recipe.url,
                link: recipe.shareAs,
            },
        };
    } catch (error) {
        console.log(error);
    }
    return {};
};
