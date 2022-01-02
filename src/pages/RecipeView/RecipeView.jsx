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
import InstructionsView from '../../components/InstructionsView/InstructionsView';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';

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
                        prepTime={recipe.readyInMinutes}
                        calories={getCaloriesInSpoonacular(recipe)}
                        servings={recipe.servings}
                    />
                    <div className='rps__buttons'>
                        {/* TODO */}
                        <ButtonComponent
                            label='Add to collections'
                            clickHandler={handleAddToCollections}
                            styleName='btn-primary btn--green'
                        />
                        <ButtonComponent
                            label='Edit'
                            clickHandler={handleAddToCollections}
                            styleName='btn-primary btn--orangered'
                            // styleName='recipe-page--button'
                        />
                        <ButtonComponent
                            label='Delete'
                            clickHandler={handleAddToCollections}
                            styleName='btn-primary btn--orangered'
                            // styleName='recipe-page--button'
                        />
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
                    <div className='rpd--left'>
                        <IngredientsView
                            ingredients={recipe.extendedIngredients}
                            selectedIngredients={selectedIngredients}
                            setSelectedIngredients={setSelectedIngredients}
                            isForm={false}
                        />
                        <InstructionsView
                            instructions={recipe.analyzedInstructions[0].steps}
                            isForm={false}
                        />
                    </div>
                    <div className='rpd--right'>
                        {/* <NutrientsCard nutrients={recipe.nutrients} /> */}
                        <NutrientsCard nutrients={recipe.nutrition.nutrients} />
                    </div>
                </div>
                <RelatedItems recipe={recipe} />
            </div>
        );
    };

    return <div className='grid-list'>{renderRecipe()}</div>;
}

export default RecipeView;
