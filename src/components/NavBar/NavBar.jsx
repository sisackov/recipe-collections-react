import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { auth, logout } from '../../utils/firebase.js';
import { useAuthState } from 'react-firebase-hooks/auth';

const NavBar = (props) => {
    const [user /* , loading, error */] = useAuthState(auth);

    useEffect(() => {
        if (user) {
            console.log('user', user);
        } else {
            console.log('no user');
        }
    }, [user]);

    const renderLeftNav = () => {
        if (user) {
            return (
                <div className='nav__left'>
                    <div className='navbar__item'>
                        <Link to='/'>Home</Link>
                    </div>
                    <div className='navbar__item'>
                        <Link to='/search'>Search</Link>
                    </div>
                    <div className='navbar__item' onClick={logout}>
                        Logout
                    </div>
                </div>
            );
        } else {
            return (
                <Link to='/login' className='navbar__item'>
                    Login
                </Link>
            );
        }
    };

    return (
        <header className='navbar'>
            {/* TODO: hamburger menu goes here */}
            <div className='navbar__title navbar__item'>RecipeCollections</div>
            {renderLeftNav()}
        </header>
    );
};

export default NavBar;
