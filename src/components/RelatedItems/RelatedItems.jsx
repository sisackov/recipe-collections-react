import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
// import { getSpoonacularSimilar } from '../../api/spoonacularAPI';
import Spinner from '../Spinner/Spinner';
import './RelatedItems.css';
import recipeIcon from '../../assets/images/recipe-cartoon.jpg';
import { getSpoonacularSimilar } from '../../api/spoonacularDummy';
import { RECIPE_PATH } from '../../utils/constants';

// const corsProxy = 'https://intense-mesa-62220.herokuapp.com/';
const RELATED_ITEMS_LIMIT = 5;

function RelatedItems({ recipe }) {
    // const recipeId = useRef(recipe.id);
    const [data, setData] = useState([]);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const offset = useRef(0);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // const res = await getSpoonacularSimilar(recipeId.current);
                const res = getSpoonacularSimilar;
                setData(res);
                setItems(res.slice(0, RELATED_ITEMS_LIMIT));
            } catch (err) {
                setErrorMsg(err.message);
            }
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const prevClick = (jump = 1) => {
        if (offset.current - jump > 0) {
            offset.current -= jump;
            setItems(
                data.slice(offset.current, offset.current + RELATED_ITEMS_LIMIT)
            );
        }
    };
    //TODO  prev/next buttons don't work - implement with useeffect on offset
    const nextClick = (jump = 1) => {
        if (offset.current + jump < data.length) {
            offset.current += jump;
            setItems(
                data.slice(offset.current, offset.current + RELATED_ITEMS_LIMIT)
            );
        }
    };

    const renderItems = () => {
        if (isLoading) return <Spinner />;
        if (errorMsg) return <div className='error-message'>{errorMsg}</div>;

        return items.map((item, index) => {
            return (
                <div
                    className='related-items__list--item'
                    key={`related-items-${item.title}${index}`}
                >
                    <div className='related-items__list--image'>
                        <img src={recipeIcon} alt={item.title} />
                    </div>
                    <div className='related-items__list--title'>
                        {`${item.title}
                        Serves ${item.servings}`}
                    </div>
                    <Link to={`${RECIPE_PATH}/${item.recipeId}`}>
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
            <div className='related-items__list'>
                <button className='related-items__button' onClick={prevClick}>
                    Prev
                </button>
                {renderItems()}
                <button className='related-items__button' onClick={nextClick}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default RelatedItems;
