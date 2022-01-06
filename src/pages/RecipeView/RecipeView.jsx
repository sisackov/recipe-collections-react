import parse from 'html-react-parser';
import RecipeSummary from '../../components/RecipeSummary/RecipeSummary';
import NutrientsCard from '../../components/NutrientsCard/NutrientsCard';
import './RecipeView.css';
import { getCaloriesInSpoonacular } from '../../utils/utils';
import IngredientsView from '../../components/IngredientsView/IngredientsView';
import { useEffect, useState } from 'react';
import InstructionsView from '../../components/InstructionsView/InstructionsView';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Spinner from '../../components/Spinner/Spinner';
import { getRecipeByIdFromDB, setRecipeInDB } from '../../api/firebase';
import Modal from '../../components/Modal/Modal';
import CollectionRecipeForm from '../../components/CollectionRecipeForm/CollectionRecipeForm';
import { getSpoonacularRecipeInfo } from '../../api/spoonacularAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function RecipeView() {
    const { recipeId } = useParams();
    const [data, setData] = useState({}); //recipe object
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await getRecipeByIdFromDB(recipeId);
                if (!res.nutrition) {
                    const nutrition = await getSpoonacularRecipeInfo(
                        res.id,
                        true
                    );
                    res.nutrition = nutrition.nutrition;
                    setRecipeInDB(res);
                }
                setData(res);
            } catch (err) {
                setErrorMsg(err.message);
            }
            setIsLoading(false);
        };

        fetchData();
    }, [recipeId]);

    const renderModalContent = () => {
        return (
            <CollectionRecipeForm
                recipe={data}
                cancelHandler={() => setIsModalOpen(false)}
            />
        );
    };

    const renderRecipe = () => {
        const recipe = data;
        // console.log('recipe: ', recipe);
        if (isLoading) return <Spinner />;
        if (errorMsg) return <div className='error-message'>{errorMsg}</div>;

        return (
            recipe.title && (
                <div className='recipe-page'>
                    <h1 className='recipe-page__title'>{recipe.title}</h1>
                    <div className='recipe-page__subtitle'>
                        <RecipeSummary
                            prepTime={recipe.readyInMinutes}
                            calories={getCaloriesInSpoonacular(recipe)}
                            servings={recipe.servings}
                        />
                        <div className='rps__buttons'>
                            <button
                                className='collection-list__button'
                                onClick={() => setIsModalOpen(true)}
                            >
                                <FontAwesomeIcon
                                    icon='plus'
                                    className='fa-icon-color'
                                />
                                <span> Add to your collections</span>
                            </button>
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
                    <Modal
                        isModalOpen={isModalOpen}
                        closeModal={() => setIsModalOpen(false)}
                    >
                        {renderModalContent()}
                    </Modal>
                    {/* <RelatedItems recipe={recipe} /> TODO */}
                </div>
            )
        );
    };

    return <div className='recipe-page'>{renderRecipe()}</div>;
}

export default RecipeView;
