import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { auth, logout } from '../../api/firebase.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
    COLLECTIONS_PATH,
    HOME_PATH,
    LOGIN_PATH,
    SEARCH_PATH,
} from '../../utils/constants';

const NavBar = () => {
    const [user /* , loading, error */] = useAuthState(auth);

    const renderRightNav = () => {
        if (user) {
            return (
                <ul className='nav-list'>
                    <li className='nav-item'>
                        <Link to={SEARCH_PATH}>Search</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to={COLLECTIONS_PATH}>Collections</Link>
                    </li>
                    <li className='nav-item'>
                        <div onClick={logout}>Logout</div>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul className='nav-list'>
                    <li className='nav-item'>
                        <Link to={LOGIN_PATH}>Login</Link>
                    </li>
                </ul>
            );
        }
    };

    return (
        <div class='page-wrapper'>
            <div className='nav-wrapper'>
                <nav className='navbar'>
                    <div className='navbar__title'>
                        <Link to={HOME_PATH} className='navbar__title'>
                            RecipeCollections
                        </Link>
                    </div>
                    {renderRightNav()}
                </nav>
            </div>
        </div>
    );
};

export default NavBar;
