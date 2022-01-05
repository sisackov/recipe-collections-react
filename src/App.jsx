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
                    <Route exact path='/' component={RecipeList} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/reset' component={Reset} />
                    <Route exact path='/search' component={SearchBar} />
                    <Route
                        exact
                        path='/recipe/:recipeId'
                        component={RecipeView}
                    />
                    <Route exact path='/collections' component={Collections} />
                    <Route
                        exact
                        path='/collection/:collectionId'
                        component={RecipeGrid}
                    />
                </Switch>
                {/* TODO: footer */}
            </Router>
        </div>
    );
}

export default App;
