import parse from 'html-react-parser';
import RecipeSummary from '../../components/RecipeSummary/RecipeSummary';
import NutrientsCard from '../../components/NutrientsCard/NutrientsCard';
import './RecipeView.css';
import { getCaloriesInSpoonacular } from '../../utils/utils';
import IngredientsView from '../../components/IngredientsView/IngredientsView';
import { useEffect, useState } from 'react';
import RelatedItems from '../../components/RelatedItems/RelatedItems';
import InstructionsView from '../../components/InstructionsView/InstructionsView';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
// import { getSpoonacularRecipeInfo } from '../../api/spoonacularAPI';
import Spinner from '../../components/Spinner/Spinner';
import { getSpoonacularRecipeInfo } from '../../api/spoonacularDummy';

function RecipeView(/* { recipe } */) {
    const { recipeId } = useParams();
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const [selectedIngredients, setSelectedIngredients] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // const res = await getSpoonacularRecipeInfo(
                //     extractRecipeId(recipeId),
                //     true
                // );
                const res = getSpoonacularRecipeInfo;
                console.log('getSpoonacularRecipeInfo: ', res);
                setData(res);
            } catch (err) {
                setErrorMsg(err.message);
            }
            setIsLoading(false);
        };

        fetchData();
    }, [recipeId]);

    const handleAddToCollections = () => {
        console.log('add to collections');
        //todo: add to collections
    };

    const renderRecipe = () => {
        const recipe = data;
        console.log('recipe: ', recipe);
        if (isLoading) return <Spinner />;
        if (errorMsg) return <div className='error-message'>{errorMsg}</div>;

        return (
            recipe.title && (
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
                            />
                            <ButtonComponent
                                label='Delete'
                                clickHandler={handleAddToCollections}
                                styleName='btn-primary btn--orangered'
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
                                instructions={
                                    recipe.analyzedInstructions[0].steps
                                }
                                isForm={false}
                            />
                        </div>
                        <div className='rpd--right'>
                            <NutrientsCard
                                nutrients={recipe.nutrition.nutrients}
                            />
                        </div>
                    </div>
                    <RelatedItems recipe={recipe} />
                </div>
            )
        );
    };

    return <div className='recipe-page'>{renderRecipe()}</div>;
}

export default RecipeView;
