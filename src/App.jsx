// import { getDummySpoonacularRecipes } from './api/dummy';
// import { getDummySpoonacularRecipes, getEdmamRecipe, hits } from './api/dummy';
import './styles/App.css';
import RecipeList from './pages/RecipeList/RecipeList';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Reset from './pages/Reset/Reset';
import RecipeView from './pages/RecipeView/RecipeView';
import NavBar from './components/NavBar/NavBar';

function App() {
    return (
        <div className='App'>
            {/* <RecipeList /> */}
            {/* <RecipeView recipe={getEdmamRecipe(hits[3].recipe)} /> */}
            {/* <RecipeView recipe={getDummySpoonacularRecipes()[4]} /> */}

            <Router>
                <NavBar />
                <Switch>
                    <Route exact path='/' component={RecipeList} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/reset' component={Reset} />
                    <Route
                        exact
                        path='/recipe/:recipeId'
                        component={RecipeView}
                    />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
