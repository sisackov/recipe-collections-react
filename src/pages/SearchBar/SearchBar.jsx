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

// Dummy data
const REQUEST_URL = 'https://jonasjacek.github.io/colors/data.json';

class SearchBar extends React.Component {
    state = {
        searchData: [],
        searchTerm: '',
        searchQuery: '',
        resultData: [],
        color: '',
    };

    // fetch data
    async componentDidMount() {
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((data) => this.setState({ data }));

        const resp = await searchRecipesInDB('italian sub');
        console.log(resp);
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
        // this.setState({
        //     searchTerm: '',
        //     searchQuery: item,
        //     searchData: [],
        //     color: item,
        // });
        this.handleRecipeSearch(item);
    };

    onClickSearch = () => {
        // this.setState({
        //     searchTerm: '',
        //     searchQuery: this.state.searchTerm,
        //     searchData: [],
        // });
        // console.log('Search clicked', this.state.searchTerm);
        this.handleRecipeSearch(this.state.searchTerm);
    };

    handleRecipeSearch = async (searchRecipe) => {
        // console.log('Searching... ', searchRecipe);
        this.setState({
            searchTerm: '',
            searchQuery: searchRecipe,
            searchData: [],
        });
        console.log('Searching... ', capitalizeFirstLetters(searchRecipe));
        // const searchResponse = await getSpoonacularComplexSearch(
        //     searchRecipe,
        //     10,
        //     true,
        //     true,
        //     true
        // );

        // console.log('Search response: ', searchResponse);
        // this.setState({ resultData: searchResponse });
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
        return <div>{this.state.resultData}</div>;
        const { resultData } = this.state;
        // console.log('showSearchResults', resultData);

        // const { color } = this.state;
        // return (
        //     color && (
        //         <p className='result'>
        //             <b>Color:</b>
        //             {color.name}
        //             <span
        //                 className='box'
        //                 style={{ backgroundColor: color.hexString }}
        //             />
        //             {color.hexString}
        //         </p>
        //     )
        // );
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
                {this.showSearchResults()}
            </div>
        );
    }
}

export default SearchBar;
