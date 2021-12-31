import { getRecipe, hits } from './api/dummy';
import './App.css';
// import RecipeList from './pages/RecipeList';
import RecipeView from './pages/RecipeView';

function App() {
    return (
        <div className='App'>
            <RecipeView recipe={getRecipe(hits[2].recipe)} />
        </div>
    );
}

export default App;
