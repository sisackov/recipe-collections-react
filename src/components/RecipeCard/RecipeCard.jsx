import { Link } from 'react-router-dom';
// import { getCaloriesInSpoonacular } from '../../utils/utils';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
    console.log('recipe: ', recipe);
    return (
        <div
            className='recipe-card'
            style={{ backgroundImage: `url(${recipe.image})` }}
        >
            <div className='recipe-card__title'>{recipe.title}</div>
            <div className='recipe-card__description'>
                <p>Preparation Time: {recipe.readyInMinutes} minutes</p>
                {/* <p>Calories: {getCaloriesInSpoonacular(recipe)}</p> */}
                <p>Serve: {recipe.servings} servings</p>
            </div>
            <Link
                to={`/recipe/${recipe.recipeId}`}
                className='recipe-card__link'
            >
                <div className='recipe-card__btn'>View Recipe</div>
            </Link>
        </div>
    );
};
export default RecipeCard;
