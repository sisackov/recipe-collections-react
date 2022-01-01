import React, { useEffect } from 'react';
import CheckboxComponent from '../CheckboxComponent/CheckboxComponent';
import './IngredientsView.css';

const IngredientsView = ({
    ingredients: { lines },
    ingredients: { items },
    selectedIngredients,
    setSelectedIngredients,
    isForm,
}) => {
    console.log(lines);
    console.log(items);

    useEffect(() => {
        console.log('useEffect');
        console.log(selectedIngredients);
    }, [selectedIngredients]);

    const handleCheckedUpdate = (index) => {
        setSelectedIngredients((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    const ingredientsList = () => {
        return (
            !isForm &&
            lines.map((ingredient, index) => {
                return (
                    <div
                        className='ingredients-view__ingredient--line'
                        key={`ingredient-${ingredient}`}
                    >
                        <CheckboxComponent
                            isChecked={selectedIngredients[index]}
                            updateChecked={() => handleCheckedUpdate(index)}
                            index={index}
                        />
                        <input
                            type='checkbox'
                            id={`ingredient-${index}`}
                            name={`ingredient-${index}`}
                            value={ingredient}
                            checked={selectedIngredients[index]}
                            onChange={() => handleCheckedUpdate(index)}
                        />
                        {/* <label htmlFor={`ingredient-${index}`}>
                            {ingredient}
                        </label> */}
                        <span>{ingredient}</span>
                    </div>
                );
            })
        );
    };

    return (
        <div className='ingredients-container'>
            <h3>Ingredient List</h3>
            {ingredientsList()}
        </div>
    );
};

export default IngredientsView;
