import { useCallback, useEffect, useState } from 'react';
import './RelatedItems.css';

function RelatedItems({ recipe }) {
    const [data, setData] = useState([]);

    const fakeData = useCallback(() => {
        return Array(5).fill({
            title: recipe.title,
            imageUrl: recipe.image,
        });
    }, [recipe]);

    useEffect(() => {
        // console.log('useEffect');
        // console.log(data);
        //TODO: get data from API
        const newData = fakeData();
        console.log('newData: ', newData);
        setData(newData);
    }, [fakeData]);

    const renderItems = () => {
        return data.map((item, index) => {
            return (
                <div
                    className='related-items__list--item'
                    key={`related-items-${item.title}${index}`}
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
