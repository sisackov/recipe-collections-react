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
                    <span key={`span-${word}-${index}`} className='orange'>
                        {`${word} `}
                    </span>
                );
            }
            return word + ' ';
        });
    };

    return (
        <div className='recipe-card-container'>
            <div className='recipe-card__image'>
                <img src={recipe.image} alt={recipe.title} />
            </div>
            <div className='recipe-card__content'>
                <h2 className='recipe-card__title'>{alternateTitle()}</h2>
                <div className='card_text'>
                    <p>
                        Dig into the freshest veggies of the season! This
                        salad-in-a-jar features a mixture of leafy greens and
                        seasonal vegetables, fresh from the farmer's market.
                    </p>
                    <p>
                        Served with your choice of dressing on the side:
                        housemade ranch, cherry balsamic vinaigrette, creamy
                        chipotle, avocado green goddess, or honey mustard. Add
                        your choice of protein for $2 more.
                    </p>
                </div>
                <button class='card_btn orange'>See more +</button>
            </div>
        </div>
    );
};

export default RecipeCard1;

<li class='cards_item'>
    <div class='card'>
        <div class='card_image'>
            <img
                src='https://assets.codepen.io/652/photo-1468777675496-5782faaea55b.jpeg'
                alt='mixed vegetable salad in a mason jar. '
            />
        </div>
        <div class='card_content'>
            <h2 class='card_title'>
                Farmstand Salad <span class='orange'>&#x2022; $9</span>
            </h2>
            <div class='card_text'>
                <p>
                    Dig into the freshest veggies of the season! This
                    salad-in-a-jar features a mixture of leafy greens and
                    seasonal vegetables, fresh from the farmer's market.
                </p>
                <p>
                    Served with your choice of dressing on the side: housemade
                    ranch, cherry balsamic vinaigrette, creamy chipotle, avocado
                    green goddess, or honey mustard. Add your choice of protein
                    for $2 more.
                </p>
            </div>
            <button class='card_btn orange'>See more +</button>
        </div>
    </div>
</li>;
