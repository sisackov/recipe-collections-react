import { initializeApp } from 'firebase/app';
import {
    collection,
    collectionGroup,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    setDoc,
    where,
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
        console.log('credential', credential);
        // const token = credential.accessToken;
        // The signed-in user info.
        // const user = result.user;
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
        // const accessToken = credential.accessToken;
        // The signed-in user info.
        // const user = result.user;

        // localStorage.setItem('token', accessToken);
        // localStorage.setItem('user', JSON.stringify(user));
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
        console.log('signInWithEmailAndPassword', user);
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
        console.log('registerWithEmailAndPassword', user);
    } catch (err) {
        console.error(err);
        // alert(err.message);
    }
};

const sendPasswordResetEmail = async (email) => {
    try {
        await auth.sendPasswordResetEmail(email);
        // alert('Password reset link sent!');
    } catch (err) {
        console.error(err);
        // alert(err.message);
    }
};

const logout = async () => {
    await signOut(auth);
};

//****************************************************************************/
//**                  Firestore database Functions                          **/
//****************************************************************************/
const getUsersFromDB = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const userData = [];
    querySnapshot.forEach((collDoc) => {
        userData.push(collDoc.data());
    });
    return userData;
};

const getUserByIdFromDB = async (userId) => {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
};

const setUserInDB = async (userId, userData) => {
    return setDoc(doc(db, 'users', userId), userData);
};

const userExistsInDB = async (userId) => {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
};

const setRecipeInDB = async (recipe) => {
    console.log('setRecipeInFirestore', recipe);
    const setResp = await setDoc(
        doc(db, 'recipes', recipe.recipeId || recipe.id),
        recipe
    );
    console.log('setResp', setResp);
    return setResp;
};

const getRecipeByIdFromDB = async (recipeId) => {
    const docRef = doc(db, 'recipes', recipeId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
};

/**
 *
 * @param {string[]} recipeIds array of recipe ids
 * @returns
 */
const getRecipeByIdsFromDB = async (recipeIds) => {
    const recipesQuery = query(
        collectionGroup(db, 'recipes'),
        where('recipeId', 'in', recipeIds)
    );

    const querySnapshot = await getDocs(recipesQuery);
    // console.log('querySnapshot', querySnapshot);
    const recipes = [];
    querySnapshot.forEach((collDoc) => {
        recipes.push(collDoc.data());
    });
    return recipes;
};

const setRecipeCollectionInDB = async (recCollection) => {
    console.log('setRecipeCollection', recCollection);
    const setResp = await setDoc(
        doc(db, 'recipeCollections', recCollection.id),
        recCollection
    );
    console.log('setResp', setResp);
    return setResp;
};

const getAllRecipeCollectionFromDB = async () => {
    const querySnapshot = await getDocs(collection(db, 'recipeCollections'));
    const recipeCollections = [];
    querySnapshot.forEach((collDoc) => {
        recipeCollections.push(collDoc.data());
    });
    return recipeCollections;
};

const getRecipeCollectionByIdFromDB = async (collId) => {
    const docRef = doc(db, 'recipeCollections', collId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
};

/**
 * @param {string[]} collIds array of recipe collection ids
 * @returns
 */
const getRecipeCollectionsByIdsFromDB = async (collIds) => {
    // const docRef = doc(db, 'recipeCollections', collId);
    // const docSnap = await getDoc(docRef);
    // return docSnap.data();

    const recCollQuery = query(
        collectionGroup(db, 'recipeCollections'),
        where('id', 'in', collIds)
    );

    const querySnapshot = await getDocs(recCollQuery);
    // console.log('querySnapshot', querySnapshot);
    const recipeCollections = [];
    querySnapshot.forEach((collDoc) => {
        recipeCollections.push(collDoc.data());
    });
    return recipeCollections;
};

const deleteRecipeCollectionInDB = async (collectionId) => {
    console.log('deleteRecipeCollectionInDB', collectionId);
    const deleteResp = await deleteDoc(
        doc(db, 'recipeCollections', collectionId)
    );
    console.log('setResp', deleteResp);
    return deleteResp;
};

const searchRecipesInDB = async (searchTerm) => {
    console.log('searchRecipesInDB', searchTerm);
    const recipesQuery = query(
        collectionGroup(db, 'recipes'),
        where('summary', '>=', searchTerm),
        where('summary', '<', searchTerm.charAt(0) + '\uf8ff')
    );

    const querySnapshot = await getDocs(recipesQuery);
    // console.log('querySnapshot', querySnapshot);
    const recipes = [];
    querySnapshot.forEach((collDoc) => {
        recipes.push(collDoc.data());
    });
    return recipes;
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
    getUsersFromDB,
    getUserByIdFromDB,
    setUserInDB,
    userExistsInDB,
    setRecipeInDB,
    getRecipeByIdFromDB,
    getRecipeByIdsFromDB,
    setRecipeCollectionInDB,
    getAllRecipeCollectionFromDB,
    getRecipeCollectionsByIdsFromDB,
    getRecipeCollectionByIdFromDB,
    deleteRecipeCollectionInDB,
    searchRecipesInDB,
};