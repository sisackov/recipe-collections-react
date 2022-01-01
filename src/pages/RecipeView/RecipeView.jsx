// import { useEffect, useState } from 'react';
// import { getRecipes } from '../api/dummy';
// import RecipeCard from '../components/RecipeCard/RecipeCard';
import RecipeSummary from '../../components/RecipeSummary/RecipeSummary';
import NutrientsCard from '../../components/NutrientsCard/NutrientsCard';
// import Spinner from '../components/Spinner/Spinner';
import './RecipeView.css';
import { getLoremIpsum } from '../../utils/utils';
import IngredientsView from '../../components/IngredientsView/IngredientsView';
import { useState } from 'react';
import RelatedItems from '../../components/RelatedItems/RelatedItems';

function RecipeView({ recipe }) {
    const [selectedIngredients, setSelectedIngredients] = useState(
        Array(recipe.ingredients.lines.length).fill(false)
    );

    const getImage = (images) => {
        return (
            images.REGULAR ||
            images.SMALL ||
            images.THUMBNAIL || { url: 'https://via.placeholder.com/150' }
        );
    };

    const handleAddToCollections = () => {
        console.log('add to collections');
        //todo: add to collections
    };

    const renderRecipe = () => {
        // console.log('recipe: ', recipe);
        return (
            <div className='recipe-page'>
                <h1 className='recipe-page__title'>{recipe.title}</h1>
                <div className='recipe-page__subtitle'>
                    <RecipeSummary
                        prepTime={recipe.prepTime}
                        calories={recipe.calories}
                        servings={recipe.servings}
                    />
                    <div className='rps__buttons'>
                        {/* TODO */}
                        <button
                            className='recipe-page--button'
                            onClick={handleAddToCollections}
                        >
                            Add to Collections
                        </button>
                        <button className='recipe-page--button'>Edit</button>
                        <button className='recipe-page--button'>Delete</button>
                    </div>
                </div>

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
                    {/* <div> */}
                    <IngredientsView
                        ingredients={recipe.ingredients}
                        selectedIngredients={selectedIngredients}
                        setSelectedIngredients={setSelectedIngredients}
                        isForm={false}
                    />
                    {/* </div> */}
                    <NutrientsCard nutrients={recipe.nutrients} />
                </div>
                <RelatedItems recipe={recipe} />
            </div>
        );
    };

    return <div className='grid-list'>{renderRecipe()}</div>;
}

export default RecipeView;
