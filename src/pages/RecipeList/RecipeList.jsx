import { useEffect, useState } from 'react';
import { getSpoonacularRandomRecipes } from '../../api/spoonacularAPI';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import Spinner from '../../components/Spinner/Spinner';
import './RecipeList.css';

function RecipeList() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await getSpoonacularRandomRecipes(20);
                // console.log('getSpoonacularRandomRecipes: ', res);
                setData(res);
            } catch (err) {
                setErrorMsg(err.message);
            }
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const renderGrid = () => {
        return data.map((recipe, index) => {
            return <RecipeCard recipe={recipe} key={index} />;
        });
    };

    if (isLoading) return <Spinner />;
    if (errorMsg) return <div className='error-message'>{errorMsg}</div>;

    return (
        <>
            <h1>Our Popular recipes...</h1>
            <div className='flex-list'>{renderGrid()}</div>;
        </>
    );
}

export default RecipeList;
