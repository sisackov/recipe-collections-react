const defaultCollections = [
    {
        id: 'collection-1',
        name: 'breakfast',
        image: 'https://i.imgur.com/HGMz4OG.jpeg',
        description: 'A collection of Breakfast recipes',
        searchUrl:
            'https://api.spoonacular.com/recipes/complexSearch?apiKey=46bdbd59e31d4fef9fc381b3a71e94ad&type=breakfast',
        recipes: [
            715497, 663845, 655219, 655186, 638604, 656481, 660227, 640965,
            650377, 647043,
        ],
    },
    {
        id: 'collection-2',
        name: 'main course',
        image: 'https://i.imgur.com/tFkHn4B.jpeg',
        description: 'A collection of Main Course recipes',
        searchUrl:
            'https://api.spoonacular.com/recipes/complexSearch?apiKey=46bdbd59e31d4fef9fc381b3a71e94ad&type=main%20course',
        recipes: [
            715594, 716268, 716381, 782601, 794349, 715446, 766453, 716627,
            716408, 795751,
        ],
    },
    {
        id: 'collection-3',
        name: 'side dish',
        image: 'https://i.imgur.com/HUUxgzu.jpeg',
        description: 'A collection of Side Dish recipes',
        searchUrl:
            'https://api.spoonacular.com/recipes/complexSearch?apiKey=46bdbd59e31d4fef9fc381b3a71e94ad&type=side%20dish',
        recipes: [
            642676, 640085, 652717, 636901, 1095855, 1095967, 643422, 643775,
            1095695, 640607,
        ],
    },
    {
        id: 'collection-4',
        name: 'dessert',
        image: 'https://i.imgur.com/SVHCNqB.jpeg',
        description: 'A collection of Dessert recipes',
        searchUrl:
            'https://api.spoonacular.com/recipes/complexSearch?apiKey=46bdbd59e31d4fef9fc381b3a71e94ad&type=dessert',
        recipes: [
            664429, 658007, 715569, 643450, 642780, 636289, 1096302, 1096280,
            1096301, 633139,
        ],
    },
];

// const recipeColl = defaultCollections[2];
// // const recIds = recipeColl.recipes.join(',');
// // console.log('recIds: ', recIds);
// // const spon = await getSpoonacularRecipeInfoBulk(recIds, true);
// // console.log('spon: ', spon);

// const recipeIds = recipeColl.recipes.map((recId) => `sponacular-${recId}`);
// console.log('recipeIds: ', recipeIds);

// const recipes = await getRecipeByIdsFromDB(recipeIds);
// console.log('getRecipeByWithIdsArray: ', recipes);

// const recipeCollection = {
//     ...recipeColl,
//     title: recipeColl.name.charAt(0).toUpperCase() + recipeColl.name.slice(1),
//     id: uuidv4(),
//     recipes: recipes.map((recipe) => {
//         return {
//             id: recipe.recipeId,
//             title: recipe.title,
//             image: recipe.image,
//         };
//     }),
// };
// delete recipeCollection.name;
// console.log('recipeCollection: ', recipeCollection);

// const reCollResponse = await setRecipeCollectionInDB(recipeCollection);
// console.log('reCollResponse: ', reCollResponse);

const DEFAULT_COLLECTION_LIST = [
    '054028c8-cf2b-4d21-a522-36946b1a1e52',
    '4cf66185-7f4e-40fe-801c-47c6bf3d8400',
    '57f44ee3-0618-4122-8603-ee9a956f4f0d',
    '6cd78792-f1a9-4be5-8be9-4d8f8b1de0b2',
];

const DEFAULT_COLLECTION_IMAGE =
    'https://png.pngtree.com/png-clipart/20190611/original/pngtree-cooking-recipes-png-image_2573371.jpg';

const DEFAULT_COLLECTION_SEARCH_PREFIX =
    'https://api.spoonacular.com/recipes/complexSearch?apiKey=46bdbd59e31d4fef9fc381b3a71e94ad&query=';

export {
    defaultCollections,
    DEFAULT_COLLECTION_LIST,
    DEFAULT_COLLECTION_IMAGE,
    DEFAULT_COLLECTION_SEARCH_PREFIX,
};
