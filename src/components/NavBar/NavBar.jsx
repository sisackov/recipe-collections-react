import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { auth, logout } from '../../api/firebase.js';
import { useAuthState } from 'react-firebase-hooks/auth';

const NavBar = (props) => {
    const [user /* , loading, error */] = useAuthState(auth);

    const renderLeftNav = () => {
        if (user) {
            return (
                <div className='nav__left'>
                    <div className='navbar__item'>
                        <Link to='/collections'>Collections</Link>
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
        // <header className='navbar'>
        //     <div className='navbar__title'>
        //         <Link to='/' className='navbar__title'>
        //             RecipeCollections
        //         </Link>
        //     </div>
        //     {renderLeftNav()}
        // </header>

        <div className='nav-wrapper'>
            <nav className='navbar'>
                {/* <img
                    src='https://upload.wikimedia.org/wikipedia/en/thumb/c/c8/Bluestar_%28bus_company%29_logo.svg/1280px-Bluestar_%28bus_company%29_logo.svg.png'
                    alt='Company Logo'
                /> */}
                <div className='navbar__title'>
                    <Link to='/' className='navbar__title'>
                        RecipeCollections
                    </Link>
                </div>
                <div className='menu-toggle' id='mobile-menu'>
                    <span className='bar'></span>
                    <span className='bar'></span>
                    <span className='bar'></span>
                </div>
                <ul className='nav no-search'>
                    <li className='nav-item'>
                        <a href='#'>Home</a>
                    </li>
                    <li className='nav-item'>
                        <a href='#'>About</a>
                    </li>
                    <li className='nav-item'>
                        <a href='#'>Work</a>
                    </li>
                    <li className='nav-item'>
                        <a href='#'>Careers</a>
                    </li>
                    <li className='nav-item'>
                        <a href='#'>Contact Us</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default NavBar;
