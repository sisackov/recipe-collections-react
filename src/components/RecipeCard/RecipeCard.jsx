import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
    console.log('recipe: ', recipe);
    return (
        <div
            className='recipe-card'
            style={{ backgroundImage: `url(${recipe.images.SMALL.url})` }}
        >
            <div className='recipe-card__title'>{recipe.title}</div>
            <div className='recipe-card__description'>
                <p>Preparation Time: {recipe.prepTime} minutes</p>
                <p>Calories: {parseInt(recipe.calories)}</p>
                <p>Serve: {recipe.servings} servings</p>
            </div>
        </div>
    );
};
export default RecipeCard;
