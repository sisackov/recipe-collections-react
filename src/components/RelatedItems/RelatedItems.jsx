import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRef } from 'react/cjs/react.development';
import { getSpoonacularSimilar } from '../../api/spoonacularAPI';
import Spinner from '../Spinner/Spinner';
import './RelatedItems.css';

// const corsProxy = 'https://cors-anywhere.herokuapp.com/';
const corsProxy = 'https://intense-mesa-62220.herokuapp.com/';

function RelatedItems({ recipe }) {
    const recipeId = useRef(recipe.id);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await getSpoonacularSimilar(recipeId.current);
                console.log('getSpoonacularSimilar: ', recipeId.current);
                console.log('RelatedItems data: ', res);
                setData(res);
            } catch (err) {
                // console.log(err.message);
                setErrorMsg(err.message);
            }
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const renderItems = () => {
        if (isLoading) return <Spinner />;
        if (errorMsg) return <div className='error-message'>{errorMsg}</div>;

        return data.map((item, index) => {
            return (
                <div
                    className='related-items__list--item'
                    key={`related-items-${item.title}${index}`}
                >
                    <div className='related-items__list--item__image'>
                        <img
                            src={`${corsProxy}${item.sourceUrl}`}
                            alt={item.sourceUrl}
                        />
                    </div>
                    <div className='related-items__list--item__title'>
                        {item.title}
                    </div>
                    <Link to={`/recipe/${item.recipeId}`}>
                        <div className='related-items__list--item__link'>
                            View Recipe
                        </div>
                    </Link>
                </div>
            );
        });
    };

    return (
        <div className='related-items'>
            <h2 className='related-items__title'>Related Items</h2>
            <div className='related-items__list'>{renderItems()}</div>
        </div>
    );
}

export default RelatedItems;
