import { useCallback, useEffect, useState } from 'react';
import './RelatedItems.css';

function RelatedItems({ recipe }) {
    const [data, setData] = useState([]);

    const fakeData = useCallback(() => {
        return recipe.ingredients.lines.map((line) => {
            return {
                title: line,
                imageUrl: recipe.images.THUMBNAIL.url,
            };
        });
    }, [recipe]);

    useEffect(() => {
        // console.log('useEffect');
        // console.log(data);
        //TODO: get data from API
        const newData = fakeData();
        setData(newData);
    }, [fakeData]);

    const renderItems = () => {
        return data.map((item) => {
            return (
                <div
                    className='related-items__list--item'
                    key={`related-items-${item.title}`}
                >
                    <div className='related-items__list--item__image'>
                        <img src={item.imageUrl} alt={item.title} />
                    </div>
                    <div className='related-items__list--item__title'>
                        {item.title}
                    </div>
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
