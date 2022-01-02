// import { useEffect, useState } from 'react';
// import { getRecipes } from '../api/dummy';
// import RecipeCard from '../components/RecipeCard/RecipeCard';
import parse from 'html-react-parser';
import RecipeSummary from '../../components/RecipeSummary/RecipeSummary';
import NutrientsCard from '../../components/NutrientsCard/NutrientsCard';
// import Spinner from '../components/Spinner/Spinner';
import './RecipeView.css';
import { getCaloriesInSpoonacular } from '../../utils/utils';
import IngredientsView from '../../components/IngredientsView/IngredientsView';
import { useState } from 'react';
import RelatedItems from '../../components/RelatedItems/RelatedItems';

function RecipeView({ recipe }) {
    // console.log('recipe: ', recipe);
    const [selectedIngredients, setSelectedIngredients] = useState(
        Array(recipe.extendedIngredients.length).fill(false)
    );

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
                    {/* TODO: add TAG components */}
                    <RecipeSummary
                        prepTime={recipe.prepTime}
                        calories={getCaloriesInSpoonacular(recipe)}
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
                    <div className='recipe-page__description--p'>
                        {parse(recipe.summary)}
                    </div>
                    <div className='recipe-page__description--image'>
                        <img src={recipe.image} alt={recipe.title} />
                    </div>
                </div>
                <div className='recipe-page__details'>
                    {/* <div> */}
                    <IngredientsView
                        ingredients={recipe.extendedIngredients}
                        selectedIngredients={selectedIngredients}
                        setSelectedIngredients={setSelectedIngredients}
                        isForm={false}
                    />
                    {/* </div> */}
                    {/* <NutrientsCard nutrients={recipe.nutrients} /> */}
                    <NutrientsCard nutrients={recipe.nutrition.nutrients} />
                </div>
                <RelatedItems recipe={recipe} />
            </div>
        );
    };

    return <div className='grid-list'>{renderRecipe()}</div>;
}

export default RecipeView;
