const loremIpsumArray = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    'Sed euismod, urna eget aliquam interdum, nisi erat iaculis leo, ac ',
    'suscipit erat nunc ac purus. Nullam eget dolor sed leo imperdiet ',
    'ultricies. Vestibulum ante ipsum primis in faucibus orci luctus et ',
    'ultrices posuere cubilia Curae; Sed euismod, urna eget aliquam ',
    'interdum, nisi erat iaculis leo, ac suscipit erat nunc ac purus. ',
    'Nullam eget dolor sed leo imperdiet ultricies. Vestibulum ante ipsum ',
    'primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed ',
    'eget dolor sed leo imperdiet ultricies. Vestibulum ante ipsum primis ',
    'in faucibus orci luctus et ultrices posuere cubilia Curae; Sed eget ',
    'dolor sed leo imperdiet ultricies. Vestibulum ante ipsum primis in ',
    'faucibus orci luctus et ultrices posuere cubilia Curae; Sed eget ',
    'dolor sed leo imperdiet ultricies. Vestibulum ante ipsum primis in ',
    'faucibus orci luctus et ultrices posuere cubilia Curae; Sed eget ',
    'dolor sed leo imperdiet ultricies. Vestibulum ante ipsum primis in ',
    'faucibus orci luctus et ultrices posuere cubilia Curae; Sed eget ',
    'dolor sed leo imperdiet ultricies. Vestibulum ante ipsum primis in ',
    'faucibus orci luctus et ultrices posuere cubilia Curae; Sed eget ',
    'dolor sed leo imperdiet ultricies. Vestibulum ante ipsum primis in ',
    'faucibus orci luctus et ultrices posuere cubilia Curae; Sed eget ',
    'dolor sed leo imperdiet ultricies. Vestibulum ante ipsum primis in ',
    'faucibus orci luctus et ultrices posuere cubilia Curae; Sed eget ',
    'dolor sed leo imperdiet ultricies. Vestibulum ante ipsum primis in ',
];

export function getLoremIpsum(count) {
    return loremIpsumArray.slice(0, count).join('');
}

export const getCaloriesInSpoonacular = (recipe) => {
    console.log('getCaloriesInSpoonacular', recipe);
    if (!recipe.nutrition) return 0;
    const calories = recipe.nutrition.nutrients.find(
        (nutrient) => nutrient.title === 'Calories'
    );
    return calories ? `${calories.amount} ${calories.unit}` : 0;
};

export function saveToLocalStorage(key, value, isMap = false) {
    if (isMap) {
        localStorage.setItem(key, JSON.stringify(Array.from(value.entries())));
    } else {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

export function getFromLocalStorage(key, isMap = false) {
    if (isMap) {
        return new Map(JSON.parse(localStorage.getItem(key)));
    }
    return JSON.parse(localStorage.getItem(key));
}

export function extractRecipeId(recipeId) {
    const id = recipeId.split('-');
    return id.length > 1 ? id[1] : id[0];
}

export function getRecipeIdsArray(recipes) {
    return recipes.map((recipe) => extractRecipeId(recipe.id));
}

export function capitalizeFirstLetters(words) {
    return words
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
