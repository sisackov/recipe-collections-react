import { getCaloriesInSpoonacular } from '../../utils/utils';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
    // console.log('recipe: ', recipe);
    const getCalories = () => {
        const calories = recipe.nutrition.nutrients.find(
            (nutrient) => nutrient.title === 'Calories'
        );
        return calories ? `${calories.amount} ${calories.unit}` : 0;
    };

    return (
        <div
            className='recipe-card'
            style={{ backgroundImage: `url(${recipe.image})` }}
        >
            <div className='recipe-card__title'>{recipe.title}</div>
            <div className='recipe-card__description'>
                <p>Preparation Time: {recipe.readyInMinutes} minutes</p>
                <p>Calories: {getCaloriesInSpoonacular(recipe)}</p>
                <p>Serve: {recipe.servings} servings</p>
            </div>
        </div>
    );
};
export default RecipeCard;
