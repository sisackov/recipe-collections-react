import React, { useState } from 'react';
// import React, { useEffect } from 'react';
import CheckboxComponent from '../CheckboxComponent/CheckboxComponent';
import './IngredientsView.css';

const IngredientsView = ({
    ingredients,
    selectedIngredients,
    setSelectedIngredients,
    isForm,
}) => {
    const [cartItems, setCartItems] = useState([]);
    const [isAllInCart, setIsAllInCart] = useState(false);
    // console.log(lines);
    // console.log(items);

    // useEffect(() => {
    //     console.log('useEffect');
    //     console.log(cartItems);
    // }, [cartItems]);

    const handleCheckedUpdate = (index) => {
        setSelectedIngredients((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    const handleCartUpdate = (index) => {
        if (index < 0) {
            const newCartItems = [...ingredients];
            console.log('newCartItems: ', newCartItems);
            setCartItems(newCartItems);
            setIsAllInCart(true);
        } else {
            const newItem = ingredients[index];
            const updatedCartItems = [...cartItems];
            const itemIndex = cartItems.findIndex(
                (item) => item.index === index
            );
            if (itemIndex < 0) {
                updatedCartItems.push(newItem);
            }
            setCartItems(updatedCartItems);
        }
    };

    const ingredientsList = () => {
        return (
            !isForm &&
            ingredients.map((ingredient, index) => {
                // console.log('ingredient: ', ingredient);
                return (
                    <div
                        className='ingredients-view__ingredient--line'
                        key={`ingredient-${ingredient.originalString}`}
                    >
                        <CheckboxComponent
                            isChecked={selectedIngredients[index]}
                            updateChecked={() => handleCheckedUpdate(index)}
                            index={index}
                        />
                        <span>{ingredient.original}</span>
                        <button
                            className='ingredients-view__ingredient--button'
                            disabled={isAllInCart}
                            onClick={() => {
                                handleCartUpdate(index);
                            }}
                        >
                            {/* <i className='fas fa-plus'></i> */}
                            Add To Cart
                        </button>
                    </div>
                );
            })
        );
    };

    return (
        <div className='ingredients-container'>
            <h3>Ingredient List</h3>
            {ingredientsList()}
            <button
                className='ingredients-view__cart-button'
                onClick={() => {
                    handleCartUpdate(-1);
                }}
            >
                {/* <i className='fas fa-plus'></i> */}
                Add All To Cart
            </button>
        </div>
    );
};

export default IngredientsView;
