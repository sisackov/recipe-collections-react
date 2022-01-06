import './NutrientsCard.css';

const NutrientsCard = ({ nutrients }) => {
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
        }
    };

    const renderNutrients = () => {
        return nutrients.map((nutrient) => {
            return (
                <div className='nutrients-card__nutrient' key={nutrient.name}>
                    <div className='nutrients-card__nutrient-label'>
                        {nutrient.title}
                    </div>
                    <div className='nutrients-card__nutrient-value'>
                        {parseQuantity(nutrient.amount, nutrient.unit)}
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
