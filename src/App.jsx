import { getEdmamRecipe, hits } from './api/dummy';
import './styles/App.css';
// import RecipeList from './pages/RecipeList/RecipeList';
import RecipeView from './pages/RecipeView/RecipeView';

function App() {
    return (
        <div className='App'>
            {/* <RecipeList /> */}
            <RecipeView recipe={getEdmamRecipe(hits[3].recipe)} />
        </div>
    );
}

export default App;
