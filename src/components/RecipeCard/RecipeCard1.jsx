import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { getCaloriesInSpoonacular, stripHtmlTags } from '../../utils/utils';
// import { getCaloriesInSpoonacular } from '../../utils/utils';
import './RecipeCard1.css';

const RecipeCard1 = ({ recipe, deleteHandler }) => {
    const handleCardClick = (e) => {
        console.log('RecipeCard: handleCardClick: e: ', e);
        // setIsHovered(!isHovered);
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
        <div className='recipe-card-container'>
            <div className='recipe-card__image'>
                <img src={recipe.image} alt={recipe.title} />
                {/* <div className='recipe-card__image--overlay'>
                    <p>{recipe.servings} servings</p>
                    <p>{recipe.readyInMinutes} minutes</p>
                </div> */}
            </div>
            <div className='recipe-card__content'>
                <h2 className='recipe-card__title'>{alternateTitle()}</h2>
                <div className='recipe-card__title'>{getDiets()}</div>
            </div>
        </div>
    );
};

export default RecipeCard1;
