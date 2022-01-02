import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { auth, logout } from '../../utils/firebase.js';
import { useAuthState } from 'react-firebase-hooks/auth';

const NavBar = (props) => {
    const [user, loading, error] = useAuthState(auth);

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
                    <Link to='/' className='navbar__item'>
                        Home
                    </Link>
                    <Link to='/search' className='navbar__item'>
                        Search
                    </Link>
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
            {/* <div className='navbar__item'>About Us</div>
            <div className='navbar__item'>Contact</div>
            <div className='navbar__item'>Help</div> */}
        </header>
    );
};

export default NavBar;
