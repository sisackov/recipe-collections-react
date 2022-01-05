import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {
    getSpoonacularAutocomplete,
    getSpoonacularComplexSearch,
} from '../../api/spoonacularAPI';
import Spinner from '../../components/Spinner/Spinner';
import { searchRecipesInDB } from '../../api/firebase';
import { capitalizeFirstLetters } from '../../utils/utils';
import './SearchBar.css';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import RecipeGrid from '../../components/RecipeGrid/RecipeGrid';

// Dummy data
const REQUEST_URL = 'https://jonasjacek.github.io/colors/data.json';

class SearchBar extends React.Component {
    state = {
        searchData: [],
        searchTerm: '',
        searchQuery: '',
        resultData: [],
        isLoading: false,
        color: '',
    };

    // fetch data
    async componentDidMount() {
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((data) => this.setState({ data }));
    }

    // Select the wrapper and toggle class 'focus'
    onFocus = (e) => e.target.parentNode.parentNode.classList.add('focus');
    onBlur = (e) => e.target.parentNode.parentNode.classList.remove('focus');

    fetchAutoComplete = async (searchTerm) => {
        const response = await getSpoonacularAutocomplete(searchTerm);
        const resData = response.map((item) => item.title);
        this.setState({ searchData: resData });
    };

    // Search input
    onInput = (e) => {
        const term = e.target.value;
        if (term.length > 2) {
            this.fetchAutoComplete(term);
        } else {
            this.setState({ searchData: [] });
        }
        this.setState({ searchTerm: e.target.value });
    };

    // Select item
    onClickItem = (item) => {
        this.handleRecipeSearch(item);
    };

    onClickSearch = () => {
        this.handleRecipeSearch(this.state.searchTerm);
    };

    handleRecipeSearch = async (searchRecipe) => {
        if (searchRecipe.length > 2) {
            this.setState({
                searchTerm: '',
                searchQuery: searchRecipe,
                searchData: [],
                isLoading: true,
            });
            console.log('Searching... ', capitalizeFirstLetters(searchRecipe));

            const resp = await searchRecipesInDB(
                capitalizeFirstLetters(searchRecipe)
            );
            console.log('resp: ', resp);

            this.setState({
                resultData: resp,
                isLoading: false,
            });
        }
    };

    dropdownItems = () => {
        const { searchData } = this.state;
        if (!searchData) {
            return <Spinner />;
        }

        return (
            <ul className='search-list'>
                {searchData.map((item, index) => (
                    <li
                        key={`search-${item}-${index}`}
                        onClick={() => this.onClickItem(item)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        );
    };

    showSearchResults = () => {
        const { resultData, isLoading } = this.state;
        if (isLoading) return <Spinner spinner='1' />;
        if (!resultData.length) return null;

        return resultData.map((recipe) => {
            return <RecipeCard key={recipe.id} recipe={recipe} />;
        });
    };

    render() {
        return (
            <div className='search-bar-container'>
                <div className='search-bar-wrapper'>
                    <div className='search-bar'>
                        <input
                            id='searchTerm'
                            type='search'
                            placeholder='Search a recipe...'
                            value={this.state.searchTerm}
                            onChange={this.onInput}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            autoComplete='off'
                        />
                        <button
                            className='search-button'
                            onClick={this.onClickSearch}
                        >
                            <FontAwesomeIcon
                                icon='search'
                                className='fa-icon-color'
                            />
                        </button>
                    </div>
                    {this.dropdownItems()}
                </div>
                <div className='search-bar-results'>
                    {this.showSearchResults()}
                </div>
            </div>
        );
    }
}

export default SearchBar;
