import { useEffect, useState } from 'react';
// import { getRecipes } from '../api/dummy';
// import RecipeCard from '../components/RecipeCard/RecipeCard';
import RecipeSummary from '../components/RecipeSummary/RecipeSummary';
// import Spinner from '../components/Spinner/Spinner';
import '../styles/RecipeView.css';

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

    const renderRecipe = () => {
        console.log('recipe: ', recipe);
        return (
            <div className='recipe-page'>
                <div className='recipe-page__title'>{recipe.title}</div>
                <RecipeSummary
                    prepTime={recipe.prepTime}
                    calories={recipe.calories}
                    servings={recipe.servings}
                />
                <div className='recipe-page__image'>
                    <img src={recipe.images.LARGE.url} alt={recipe.title} />
                </div>
            </div>
        );
    };

    return <div className='grid-list'>{renderRecipe()}</div>;
}

export default RecipeView;
