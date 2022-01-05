import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import './RecipeCard.css';

const RecipeCard = ({ recipe, deleteHandler }) => {
    const history = useHistory();

    const handleCardClick = (e) => {
        console.log('RecipeCard: handleCardClick: e: ', e);
        history.push(`/recipe/${recipe.recipeId}`);
    };

    const alternateTitle = () => {
        return recipe.title.split(' ').map((word, index) => {
            if (index % 2) {
                return (
                    <span key={`span-${word}-${index}`} className='orangered'>
                        {`${word} `}
                    </span>
                );
            }
            return word + ' ';
        });
    };

    const getDiets = () => {
        const arrLength = recipe.diets.length;
        let dietName = '';
        return recipe.diets.map((diet, index) => {
            if (index === arrLength - 1) {
                dietName = diet;
            } else {
                dietName = diet + ' ' + String.fromCharCode(8226) + ' ';
            }
            return (
                <span
                    key={`sub-span-${diet}-${index}`}
                    className='recipe-card__title--note'
                >
                    {dietName}
                </span>
            );
        });
    };

    return (
        <div className='recipe-card-container' onClick={handleCardClick}>
            <div className='recipe-card__image'>
                {deleteHandler && (
                    <button
                        className='recipe-card__button'
                        onClick={() => deleteHandler(recipe)}
                    >
                        <FontAwesomeIcon
                            className='fa-icon-color'
                            icon='trash-alt'
                        />
                    </button>
                )}
                <img src={recipe.image} alt={recipe.title} />
                <div className='recipe-card__overlay'>
                    <div>
                        Serves:
                        <span className='gold'>
                            {' '}
                            {recipe.servings} servings
                        </span>
                    </div>
                    <div>
                        Prep Time:
                        <span className='gold'>
                            {' '}
                            {recipe.readyInMinutes} minutes
                        </span>
                    </div>
                </div>
            </div>
            <div className='recipe-card__content'>
                <h2 className='recipe-card__title'>{alternateTitle()}</h2>
                <div className='recipe-card__title'>{getDiets()}</div>
            </div>
        </div>
    );
};

export default RecipeCard;
