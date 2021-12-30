import { useEffect, useState } from 'react';
import { getEdamamRecipes } from './api/edamamAPI';
// import { getUserList } from './api/mockAPI';
import './App.css';

function App() {
    // const [userList, setUserList] = useState([]);
    // const [recipeList, setRecipeList] = useState([]);
    const [recipe, setRecipe] = useState({});

    useEffect(() => {
        const fetchedData = async () => {
            console.log('initial fetching...');
            try {
                // const recipes = await getEdamamRecipes('chicken');
                // console.log('recipes: ', recipes);
                const recipe = await getEdamamRecipeByID('');
                console.log('recipes: ', recipe);
                setRecipe(recipe);
                // setRecipeList(recipes);
                // const users = await getUserList();
                // setUserList(users);
            } catch (err) {
                console.log(err.message);
            }
        };

        fetchedData();
    }, []);

    // const renderUserData = () => {
    //     return userList.map((user) => {
    //         return (
    //             <div key={user.id}>
    //                 <h2>{user.name}</h2>
    //                 <p>{user.email}</p>
    //             </div>
    //         );
    //     });
    // };

    const renderRecipeData = () => {
        return recipeList.map((recipe) => {
            return (
                <div key={recipe.id}>
                    <h2>{recipe.title}</h2>
                    <img
                        src={recipe.images.THUMBNAIL.url}
                        alt={recipe.source.label}
                    />
                    <div>
                        <span style={{ margin: '14px', fontWeight: '600' }}>
                            Preparation Time: {recipe.prepTime} mins
                        </span>
                        <span>|</span>
                        <span style={{ margin: '14px', fontWeight: '600' }}>
                            Total Calories: {recipe.calories}
                        </span>
                        <span>|</span>
                        <span style={{ margin: '14px', fontWeight: '600' }}>
                            Serve: {recipe.servings} servings
                        </span>
                    </div>
                    <p>{recipe.ingredients.lines}</p>
                </div>
            );
        });
    };

    return <div className='App'>{renderRecipeData()}</div>;
}

export default App;
