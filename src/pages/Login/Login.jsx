import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import fb_login from '../../assets/images/fb_login.png';
import {
    auth,
    signInWithEmailAndPassword,
    signInWithGoogle,
    userExistsInDB,
    setUserInDB,
} from '../../api/firebase.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import './Login.css';
import { DEFAULT_COLLECTION_LIST } from '../../utils/collectionsUtils';
import Spinner from '../../components/Spinner/Spinner';
import {
    COLLECTIONS_PATH,
    REGISTER_PATH,
    RESET_PASSWORD_PATH,
} from '../../utils/constants';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading] = useAuthState(auth);
    const history = useHistory();

    useEffect(() => {
        const saveUserInFirestore = async () => {
            try {
                const userExists = await userExistsInDB(user.uid);
                // console.log('userExists: ', userExists);

                if (!userExists) {
                    const setUserRes = await setUserInDB(user.uid, {
                        displayName: user.displayName,
                        email: user.email,
                        collections: DEFAULT_COLLECTION_LIST,
                    });
                    console.log('setUserFirestore: ', setUserRes);
                }
            } catch (err) {
                console.log('setUserFirestore error: ', err);
            }
        };

        if (user) {
            saveUserInFirestore();
            history.push(COLLECTIONS_PATH); //redirect to collections on login
        }
    }, [user, loading, history]);

    if (loading) {
        return (
            <div className='login'>
                <Spinner />
            </div>
        );
    }

    return (
        <div className='login'>
            <div className='login__container'>
                <input
                    type='text'
                    className='login__textBox'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='E-mail Address'
                />
                <input
                    type='password'
                    className='login__textBox'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                />
                <button
                    className='login__btn'
                    onClick={() => signInWithEmailAndPassword(email, password)}
                >
                    Login
                </button>
                <button
                    className='login__btn login__google'
                    onClick={signInWithGoogle}
                >
                    Login with Google
                </button>

                {/* <div
                    className='login__btn login__facebook'
                    onClick={signInWithFacebook}
                >
                    <img src={fb_login} alt='fb_login' />
                    Login with Facebook
                </div> */}
                <div>
                    <Link to={RESET_PASSWORD_PATH}>Forgot Password</Link>
                </div>
                <div>
                    Don't have an account?{' '}
                    <Link to={REGISTER_PATH}>Register</Link> now.
                </div>
            </div>
        </div>
    );
}

export default Login;
