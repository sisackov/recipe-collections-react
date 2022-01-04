import './styles/App.css';
// import RecipeList from './pages/RecipeList/RecipeList';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Reset from './pages/Reset/Reset';
import RecipeView from './pages/RecipeView/RecipeView';
import NavBar from './components/NavBar/NavBar';
import CollectionForm from './components/CollectionForm/CollectionForm';
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
} from '@fortawesome/free-solid-svg-icons';

library.add(
    faCheckSquare,
    faCoffee,
    faPencilAlt,
    fas,
    faTrashAlt,
    faPlus,
    faWindowClose
);

function App() {
    return (
        <div className='App'>
            <Router>
                <NavBar />
                <Switch>
                    {/* <Route exact path='/' component={RecipeList} /> */}
                    {/* <Route exact path='/' component={Collections} /> */}
                    <Route exact path='/' component={CollectionForm} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/reset' component={Reset} />
                    <Route
                        exact
                        path='/recipe/:recipeId'
                        component={RecipeView}
                    />
                </Switch>
                {/* TODO: footer */}
            </Router>
        </div>
    );
}

export default App;
