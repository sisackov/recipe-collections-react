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
 * @param {*} query
 * @returns
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
        // console.log('recipes', recipes);
        // return recipes;
    } catch (error) {
        console.log(error);
    }
    return [];
};
