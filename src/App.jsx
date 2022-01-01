import { getEdmamRecipe, hits } from './api/dummy';
import './App.css';
// import RecipeList from './pages/RecipeList';
import RecipeView from './pages/RecipeView';

function App() {
    return (
        <div className='App'>
            {/* <RecipeList /> */}
            <RecipeView recipe={getEdmamRecipe(hits[3].recipe)} />
        </div>
    );
}

export default App;
