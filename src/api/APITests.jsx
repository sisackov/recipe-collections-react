// import { useEffect, useState } from 'react';
// import { getEdamamRecipes, getEdamamRecipeByID } from './edamamAPI';
// import { fdcFoodSearch } from './fdcAPI';
// import { getUserList } from './mockAPI';
// import './App.css';

//!TODO: remove this file before submitting

// function APITests() {
//     const [userList, setUserList] = useState([]);
//     const [recipeList, setRecipeList] = useState([]);
//     const [recipe, setRecipe] = useState([]);
//     const [data, setData] = useState({});

//     useEffect(() => {
//         const fetchedData = async () => {
//             console.log('initial fetching...');
//             try {
//                 const recipes = await getEdamamRecipes('chicken');
//                 console.log('recipes: ', recipes);
//                 setRecipeList(recipes);

//                 const recipe = await getEdamamRecipeByID(
//                     '8275bb28647abcedef0baaf2dcf34f8b'
//                 );
//                 console.log('recipes: ', recipe);
//                 setRecipe(recipe);

//                 const users = await getUserList();
//                 setUserList(users);

//                 const data = await fdcFoodSearch('chicken');
//                 setData(data);
//             } catch (err) {
//                 console.log(err.message);
//             }
//         };

//         fetchedData();
//     }, []);

//     const renderUserData = () => {
//         return userList.map((user) => {
//             return (
//                 <div key={user.id}>
//                     <h2>{user.name}</h2>
//                     <p>{user.email}</p>
//                 </div>
//             );
//         });
//     };

//     const renderRecipesData = () => {
//         return recipeList.map((recipe) => {
//             return (
//                 <div key={recipe.id}>
//                     <h2>{recipe.title}</h2>
//                     <img
//                         src={recipe.images.THUMBNAIL.url}
//                         alt={recipe.source.label}
//                     />
//                     <div>
//                         <span style={{ margin: '14px', fontWeight: '600' }}>
//                             Preparation Time: {recipe.prepTime} mins
//                         </span>
//                         <span>|</span>
//                         <span style={{ margin: '14px', fontWeight: '600' }}>
//                             Total Calories: {recipe.calories}
//                         </span>
//                         <span>|</span>
//                         <span style={{ margin: '14px', fontWeight: '600' }}>
//                             Serve: {recipe.servings} servings
//                         </span>
//                     </div>
//                     <p>{recipe.ingredients.lines}</p>
//                 </div>
//             );
//         });
//     };

//     const renderRecipeData = () => {
//         if (!recipe.id) return null;
//         return (
//             <div>
//                 <h2>{recipe.title}</h2>
//                 <img
//                     src={recipe.images.THUMBNAIL.url}
//                     alt={recipe.source.label}
//                 />
//                 <div>
//                     <span style={{ margin: '14px', fontWeight: '600' }}>
//                         Preparation Time: {recipe.prepTime} mins
//                     </span>
//                     <span>|</span>
//                     <span style={{ margin: '14px', fontWeight: '600' }}>
//                         Total Calories: {recipe.calories}
//                     </span>
//                     <span>|</span>
//                     <span style={{ margin: '14px', fontWeight: '600' }}>
//                         Serve: {recipe.servings} servings
//                     </span>
//                 </div>
//                 <p>{recipe.ingredients.lines}</p>
//             </div>
//         );
//     };

//     const renderData = () => {
//         return <div>dummy</div>;
//     };

//     return <div className='App'>{renderData()}</div>;
// }

// export default APITests;
