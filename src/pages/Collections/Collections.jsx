import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import CollectionCard from '../../components/CollectionCard/CollectionCard';
import CollectionForm from '../../components/CollectionForm/CollectionForm';
import Modal from '../../components/Modal/Modal';
import Spinner from '../../components/Spinner/Spinner';
import { v4 as uuidV4 } from 'uuid';
import {
    auth,
    deleteRecipeCollectionInDB,
    getRecipeCollectionsByIdsFromDB,
    getUserByIdFromDB,
    setRecipeCollectionInDB,
    setUserInDB,
} from '../../utils/firebase';
import './Collections.css';

const Collections = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [userData, setUserData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [collectionObject, setCollectionObject] = useState({});
    const [user] = useAuthState(auth);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const userDataResp = await getUserByIdFromDB(user.uid);
                setUserData(userDataResp);

                const recipeCollections = await getRecipeCollectionsByIdsFromDB(
                    userDataResp.collections
                );
                setData(recipeCollections);
            } catch (err) {
                setErrorMsg(err.message);
            }
            setIsLoading(false);
        };

        if (user) {
            fetchData();
        }

        return () => {
            setErrorMsg('');
        };
    }, [user]);

    const openCollectionForm = (collectionObj) => {
        setIsModalOpen(true);
        setCollectionObject(collectionObj);
    };

    const renderGrid = () => {
        // console.log('Collections.jsx: renderGrid: data: ', data);
        if (isLoading) return <Spinner />;
        if (errorMsg) return <div className='error-message'>{errorMsg}</div>;

        return data.map((collection) => {
            return (
                <CollectionCard
                    key={collection.id}
                    collection={collection}
                    openCollectionForm={openCollectionForm}
                    deleteHandler={handleDelete}
                />
            );
        });
    };

    const handleSaveForm = async (savedCollection, isNew) => {
        try {
            let updatedData = [...data];
            let updatedUserData = { ...userData };
            if (!savedCollection.createdBy) {
                //if the user tries to update a default collection,
                //we need to create another collection, set the createdBy
                //to the current user, and remove the default collection
                //from user's collections

                const updatedUserCollectionsIds = userData.collections.filter(
                    (collectionId) => collectionId !== savedCollection.id
                );

                updatedUserData = {
                    ...userData,
                    collections: updatedUserCollectionsIds,
                };
                // setUserData(updatedUserData);

                updatedData = updatedData.filter((collection) => {
                    return collection.id !== savedCollection.id;
                });

                const newCollection = {
                    ...savedCollection,
                    createdBy: user.uid,
                    id: uuidV4(),
                };
                savedCollection = newCollection;
            }

            const setCollResp = await setRecipeCollectionInDB(savedCollection);
            console.log('setCollResp: ', setCollResp);

            const newCollections = [...updatedData, savedCollection];
            setData(newCollections);

            // console.log('handleSaveForm data: ', data);
            // console.log('handleSaveForm user: ', userData);
            const newCollectionIds = [
                ...updatedUserData.collections,
                savedCollection.id,
            ];
            const newUserData = {
                ...updatedUserData,
                collections: newCollectionIds,
            };
            setUserData(newUserData);

            const updateUserResp = await setUserInDB(user.uid, newUserData);
            console.log('updateUserResp: ', updateUserResp);
        } catch (e) {
            setErrorMsg(e.message);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (collection) => {
        try {
            const newCollections = data.filter(
                (coll) => coll.id !== collection.id
            );
            setData(newCollections);

            const newCollectionIds = newCollections.map((coll) => coll.id);
            const newUserData = { ...userData, collections: newCollectionIds };
            setUserData(newUserData);
            setUserInDB(user.uid, newUserData);

            if (collection.createdBy === user.uid) {
                //only delete the collection if it is not default
                deleteRecipeCollectionInDB(collection.id);
            }
        } catch (e) {
            setErrorMsg(e.message);
        }
    };

    const renderModalContent = () => {
        return (
            <CollectionForm
                collection={collectionObject}
                saveHandler={handleSaveForm}
                cancelHandler={() => setIsModalOpen(false)}
                isNew={!collectionObject.id}
                userId={user && user.uid}
            />
        );
    };

    return (
        <>
            <div className='collections-list'>
                <h2>My Collections</h2>
                <button
                    className='collection-list__button'
                    onClick={() => openCollectionForm({})}
                >
                    <FontAwesomeIcon icon='plus' />
                </button>
                <div className='collections-list__container'>
                    {renderGrid()}
                </div>
                <Modal
                    isModalOpen={isModalOpen}
                    closeModal={() => setIsModalOpen(false)}
                >
                    {renderModalContent()}
                </Modal>
            </div>
        </>
    );
};

export default Collections;
