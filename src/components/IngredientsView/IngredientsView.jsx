import React from 'react';
import './IngredientsView.css';

const IngredientsView = ({ ingredients, isForm }) => {
    // const [cartItems, setCartItems] = useState([]);
    // const [isAllInCart, setIsAllInCart] = useState(false);

    // const handleCartUpdate = (index) => {
    //     if (index < 0) {
    //         const newCartItems = [...ingredients];
    //         console.log('newCartItems: ', newCartItems);
    //         setCartItems(newCartItems);
    //         setIsAllInCart(true);
    //     } else {
    //         const newItem = ingredients[index];
    //         const updatedCartItems = [...cartItems];
    //         const itemIndex = cartItems.findIndex(
    //             (item) => item.index === index
    //         );
    //         if (itemIndex < 0) {
    //             updatedCartItems.push(newItem);
    //         }
    //         setCartItems(updatedCartItems);
    //     }
    // };

    const ingredientsList = () => {
        return (
            !isForm &&
            ingredients.map((ingredient, index) => {
                // console.log('ingredient: ', ingredient);
                return (
                    <li key={`ingredient-${ingredient.originalString}`}>
                        <div className='ingredients-view__ingredient--line'>
                            <span>{ingredient.original}</span>
                            {/* <button
                                className='ingredients-view__ingredient--button'
                                disabled={isAllInCart}
                                onClick={() => {
                                    handleCartUpdate(index);
                                }}
                            >
                                Add To Cart
                            </button> */}
                        </div>
                    </li>
                );
            })
        );
    };

    return (
        <div className='ingredients-container'>
            <h3>Ingredient List</h3>
            <ol className='ingredients-view__ingredient-list'>
                {ingredientsList()}
            </ol>
            {/* <button
                className='ingredients-view__cart-button'
                onClick={() => {
                    handleCartUpdate(-1);
                }}
            >
                 <i className='fas fa-plus'></i> 
                Add All To Cart
            </button> */}
        </div>
    );
};

export default IngredientsView;
