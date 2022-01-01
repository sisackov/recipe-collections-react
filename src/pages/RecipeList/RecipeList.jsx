import { useEffect, useState } from 'react';
import { getEdmamRecipes } from '../../api/dummy';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import Spinner from '../../components/Spinner/Spinner';
import './RecipeList.css';

function RecipeList() {
    // const [data, setData] = useState({});
    const [recipeList, setRecipeList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            console.log('initial fetching...');
            setIsLoading(true);
            try {
                const data = getEdmamRecipes(); //instead of API call, we are using dummy data
                setRecipeList(data);
            } catch (err) {
                console.log(err.message);
                // setErrorMessage(err.message);//TODO
            }
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const renderData = () => {
        return recipeList.map((recipe, index) => {
            return <RecipeCard recipe={recipe} key={index} />;
        });
    };

    return (
        <div className='grid-list'>
            {isLoading ? <Spinner /> : renderData()}
        </div>
    );
}

export default RecipeList;
