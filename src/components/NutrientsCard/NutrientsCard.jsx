import { useEffect, useState } from 'react';
import './NutrientsCard.css';

const NutrientsCard = ({ nutrients }) => {
    const [data, setData] = useState([]);
    console.log('nutrients: ', nutrients);

    useEffect(() => {
        const flattenNutrients = () => {
            const nutrientData = [];
            Object.keys(nutrients).forEach((key) => {
                const nutrient = nutrients[key];
                nutrientData.push({
                    key,
                    label: nutrient.label,
                    quantity: nutrient.quantity.toFixed(2),
                    unit: nutrient.unit,
                });
            });
            console.log('nutrientData: ', nutrientData);
            setData(nutrientData);
        };

        flattenNutrients();
    }, [nutrients]);

    const renderNutrients = () => {
        return data.map((nutrient, index) => {
            return (
                <div className='nutrients-card__nutrient' key={nutrient.key}>
                    <div className='nutrients-card__nutrient-label'>
                        {nutrient.label}
                    </div>
                    <div className='nutrients-card__nutrient-value'>
                        {`${nutrient.quantity} ${nutrient.unit}`}
                    </div>
                </div>
            );
        });
    };

    return (
        <div className='nutrients-card'>
            <h3>Nutritional Values</h3>
            {renderNutrients()}
        </div>
    );
};
export default NutrientsCard;
