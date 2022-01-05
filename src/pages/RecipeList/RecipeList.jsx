import { useEffect, useState } from 'react';
import { getSpoonacularRandomRecipes } from '../../api/spoonacularAPI';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import Spinner from '../../components/Spinner/Spinner';
import './RecipeList.css';

function RecipeList() {
    // const [data, isLoading, errorMsg] = useDataFetcher(getEdamamRecipes, [
    //     'fish',
    // ]);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await getSpoonacularRandomRecipes(100);
                // const res = getSpoonacularRandomRecipes;
                console.log('getSpoonacularRandomRecipes: ', res);
                setData(res);
            } catch (err) {
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
