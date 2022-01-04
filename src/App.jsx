import './styles/App.css';
// import RecipeList from './pages/RecipeList/RecipeList';
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
} from '@fortawesome/free-solid-svg-icons';
import { ModalProvider } from 'react-simple-hook-modal';

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
                    <ModalProvider>
                        <Route exact path='/' component={Collections} />
                    </ModalProvider>
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
