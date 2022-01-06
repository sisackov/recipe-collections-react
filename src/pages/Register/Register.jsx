import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useHistory } from 'react-router-dom';
import {
    auth,
    registerWithEmailAndPassword,
    signInWithGoogle,
    signInWithFacebook,
} from '../../api/firebase.js';
import { HOME_PATH, LOGIN_PATH } from '../../utils/constants.js';
import './Register.css';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [user, loading] = useAuthState(auth);
    const history = useHistory();

    const register = () => {
        if (!name) alert('Please enter name');
        registerWithEmailAndPassword(name, email, password);
    };

    useEffect(() => {
        if (loading) return;
        if (user) history.push(HOME_PATH);
    }, [user, loading, history]);

    return (
        <div className='register'>
            <div className='register__container'>
                <input
                    type='text'
                    className='register__textBox'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Full Name'
                />
                <input
                    type='text'
                    className='register__textBox'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='E-mail Address'
                />
                <input
                    type='password'
                    className='register__textBox'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                />
                <button className='register__btn' onClick={register}>
                    Register
                </button>
                <button
                    className='register__btn register__google'
                    onClick={signInWithGoogle}
                >
                    Register with Google
                </button>

                <div>
                    Already have an account? <Link to={LOGIN_PATH}>Login</Link>{' '}
                    now.
                </div>
            </div>
        </div>
    );
}

export default Register;
