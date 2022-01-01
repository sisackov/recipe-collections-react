// import { useEffect, useState } from 'react';
// import { getRecipes } from '../api/dummy';
// import RecipeCard from '../components/RecipeCard/RecipeCard';
import RecipeSummary from '../../components/RecipeSummary/RecipeSummary';
import NutrientsCard from '../../components/NutrientsCard/NutrientsCard';
// import Spinner from '../components/Spinner/Spinner';
import './RecipeView.css';
import { getLoremIpsum } from '../../utils/utils';

function RecipeView({ recipe }) {
    // const [data, setData] = useState({});
    // const [recipeList, setRecipeList] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [errorMessage, setErrorMessage] = useState('');

    // useEffect(() => {
    //     const fetchData = async () => {
    //         console.log('initial fetching...');
    //         setIsLoading(true);
    //         try {
    //             const data = getRecipes(); //instead of API call, we are using dummy data
    //             setRecipeList(data);
    //         } catch (err) {
    //             console.log(err.message);
    //         }
    //         setIsLoading(false);
    //     };

    //     fetchData();
    // }, []);

    const getImage = (images) => {
        return (
            images.REGULAR ||
            images.SMALL ||
            images.THUMBNAIL || { url: 'https://via.placeholder.com/150' }
        );
    };

    const renderRecipe = () => {
        // console.log('recipe: ', recipe);
        return (
            <div className='recipe-page'>
                <h1 className='recipe-page__title'>{recipe.title}</h1>
                <RecipeSummary
                    prepTime={recipe.prepTime}
                    calories={recipe.calories}
                    servings={recipe.servings}
                />

                <div className='recipe-page__description'>
                    <p>{getLoremIpsum(7)}</p>
                    <div className='recipe-page__image'>
                        <img
                            src={getImage(recipe.images).url}
                            alt={recipe.title}
                        />
                    </div>
                </div>
                <div className='recipe-page__details'>
                    <div className='ingredients'>{getLoremIpsum(7)}</div>
                    <NutrientsCard nutrients={recipe.nutrients} />
                </div>
            </div>
        );
    };

    return <div className='grid-list'>{renderRecipe()}</div>;
}

export default RecipeView;
