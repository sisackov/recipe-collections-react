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
        recipes: [],
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

export { defaultCollections };
