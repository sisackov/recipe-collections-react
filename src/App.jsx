import './styles/App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Reset from './pages/Reset/Reset';
import RecipeView from './pages/RecipeView/RecipeView';
import NavBar from './components/NavBar/NavBar';
import Collections from './pages/Collections/Collections';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faCheckSquare,
    faCoffee,
    faPencilAlt,
    faTrashAlt,
    faPlus,
    fas,
    faWindowClose,
    faSearch,
} from '@fortawesome/free-solid-svg-icons';
import RecipeGrid from './components/RecipeGrid/RecipeGrid';
import SearchBar from './pages/SearchBar/SearchBar';
import RecipeList from './pages/RecipeList/RecipeList';
import {
    COLLECTIONS_PATH,
    HOME_PATH,
    LOGIN_PATH,
    RECIPE_PATH,
    REGISTER_PATH,
    RESET_PASSWORD_PATH,
    SEARCH_PATH,
} from './utils/constants';

library.add(
    faCheckSquare,
    faCoffee,
    faPencilAlt,
    fas,
    faTrashAlt,
    faPlus,
    faWindowClose,
    faSearch
);

function App() {
    return (
        <div className='App'>
            <Router>
                <NavBar />
                <Switch>
                    <Route exact path={HOME_PATH} component={SearchBar} />
                    <Route exact path={LOGIN_PATH} component={Login} />
                    <Route exact path={REGISTER_PATH} component={Register} />
                    <Route exact path={RESET_PASSWORD_PATH} component={Reset} />
                    <Route exact path={SEARCH_PATH} component={SearchBar} />
                    <Route
                        exact
                        path={`${RECIPE_PATH}/:recipeId`}
                        component={RecipeView}
                    />
                    <Route
                        exact
                        path={COLLECTIONS_PATH}
                        component={Collections}
                    />
                    <Route
                        exact
                        path={`${COLLECTIONS_PATH}/:collectionId`}
                        component={RecipeGrid}
                    />
                </Switch>
                {/* TODO: footer */}
            </Router>
        </div>
    );
}

export default App;
