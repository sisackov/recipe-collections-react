import { useEffect, useState } from 'react';
import { hits as recipes } from '../api/dummy';
import Spinner from '../components/Spinner/Spinner';

function RecipeList() {
    // const [data, setData] = useState({});
    const [recipeList, setRecipeList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            console.log('initial fetching...');
            setIsLoading(true);
            try {
                const data = recipes; //instead of API call, we are using dummy data
                setRecipeList(data);
            } catch (err) {
                console.log(err.message);
                setErrorMessage(err.message);
            }
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const renderData = () => {
        return <div>dummy</div>;
    };

    return <div>{isLoading ? <Spinner /> : renderData()}</div>;
}

export default RecipeList;
