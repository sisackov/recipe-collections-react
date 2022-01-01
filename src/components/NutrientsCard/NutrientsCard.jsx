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

    const parseQuantity = (quantity, unit) => {
        if (quantity < 1000) {
            return `${quantity} ${unit}`;
        }
        const normalizedQuantity = (quantity / 1000).toFixed(2);
        switch (unit) {
            case 'g':
                return `${normalizedQuantity} kg`;
            case 'mg':
                return `${normalizedQuantity} g`;
            case 'µg':
                return `${normalizedQuantity} mg`;

            default:
                return `${quantity} ${unit}`;
            // return `${normalizedQuantity} ${unit.slice(1)}`;
        }
    };

    const renderNutrients = () => {
        return data.map((nutrient) => {
            return (
                <div className='nutrients-card__nutrient' key={nutrient.key}>
                    <div className='nutrients-card__nutrient-label'>
                        {nutrient.label}
                    </div>
                    <div className='nutrients-card__nutrient-value'>
                        {parseQuantity(nutrient.quantity, nutrient.unit)}
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
