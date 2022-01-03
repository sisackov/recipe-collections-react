import { initializeApp } from 'firebase/app';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    setDoc,
} from 'firebase/firestore';
import {
    getAuth,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword as signInWithEmailAndPasswordAuth,
    signOut,
    GoogleAuthProvider,
    FacebookAuthProvider,
} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyAv3WiFf1zSUI-AXF5hn6WDDDAtqY9LYl4',
    authDomain: 'react-recipe-collections.firebaseapp.com',
    projectId: 'react-recipe-collections',
    storageBucket: 'react-recipe-collections.appspot.com',
    messagingSenderId: '533772932368',
    appId: '1:533772932368:web:832ee12246c3c918f88195',
    measurementId: 'G-HCMS4XRCNZ',
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

//****************************************************************************/
//**                  Login Functions                                       **/
//****************************************************************************/
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

//TODO: handle errors
const facebookProvider = new FacebookAuthProvider();
const signInWithFacebook = async () => {
    try {
        const result = await signInWithPopup(auth, facebookProvider);
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        localStorage.setItem('token', accessToken);
        localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const signInWithEmailAndPassword = async (email, password) => {
    try {
        // await auth.signInWithEmailAndPassword(email, password);

        const userCredential = await signInWithEmailAndPasswordAuth(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;

        localStorage.setItem('user', JSON.stringify(user));
        // await db.collection('users').add({
        //     uid: user.uid,
        //     name,
        //     authProvider: 'local',
        //     email,
        // });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const sendPasswordResetEmail = async (email) => {
    try {
        await auth.sendPasswordResetEmail(email);
        alert('Password reset link sent!');
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = async () => {
    await signOut(auth);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // return res;
};

//****************************************************************************/
//**                  Firestore database Functions                          **/
//****************************************************************************/
const getUsersFirestore = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const userData = [];
    querySnapshot.forEach((collDoc) => {
        userData.push(collDoc.data());
    });
    return userData;
};

const getUserByIdFirestore = async (userId) => {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
};

const setUserFirestore = async (userId, userData) => {
    return setDoc(doc(db, 'users', userId), userData);
};

const isUserExists = async (userId) => {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
};

const setRecipeInFirestore = async (recipe) => {
    console.log('setRecipeInFirestore', recipe);
    const setResp = await setDoc(
        doc(db, 'recipes', recipe.recipeId || recipe.id),
        recipe
    );
    console.log('setResp', setResp);
    return setResp;
};

const getRecipeById = async (recipeId) => {
    const docRef = doc(db, 'recipes', recipeId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
};

export {
    auth,
    db,
    signInWithGoogle,
    signInWithFacebook,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordResetEmail,
    logout,
    getUsersFirestore,
    getUserByIdFirestore,
    setUserFirestore,
    isUserExists,
    setRecipeInFirestore,
    getRecipeById,
};
