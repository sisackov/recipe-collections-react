import { useEffect, useState } from 'react';
// import { getDummySpoonacularRecipes } from '../../api/dummy';
import { getSpoonacularRandomRecipes } from '../../api/spoonacularAPI';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import Spinner from '../../components/Spinner/Spinner';
// import useDataFetcher from '../../hooks/useDataFetcher'; //TODO
import './RecipeList.css';

function RecipeList() {
    // const [recipeList, setRecipeList] = useState([]);
    // const [data, isLoading, errorMsg] = useDataFetcher(getEdamamRecipes, [
    //     'fish',
    // ]);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            // console.log('initial fetching...');
            localStorage.clear();
            setIsLoading(true);
            try {
                // const data = getDummyEdmamRecipes(); //instead of API call, we are using dummy data
                // const data = await getEdamamRecipes('fish');
                // const data = await getSpoonacularComplexSearch('', 20);
                // const data = getDummySpoonacularRecipes();
                const data = await getSpoonacularRandomRecipes(20);
                console.log('getSpoonacularRandomRecipes: ', data);
                setData(data);
            } catch (err) {
                // console.log(err.message);
                setErrorMsg(err.message);
            }
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const renderGrid = () => {
        if (isLoading) return <Spinner />;
        if (errorMsg) return <div className='error-message'>{errorMsg}</div>;

        return data.map((recipe, index) => {
            return <RecipeCard recipe={recipe} key={index} />;
        });
    };

    return <div className='grid-list'>{renderGrid()}</div>;
}

export default RecipeList;
