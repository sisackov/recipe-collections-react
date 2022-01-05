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
} from '../../api/firebase';
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

        return data.map((collection, index) => {
            return (
                <CollectionCard
                    key={`${collection.id}-${index}`}
                    collection={collection}
                    openCollectionForm={openCollectionForm}
                    deleteHandler={handleDelete}
                />
            );
        });
    };

    const handleSaveForm = async (savedCollection) => {
        try {
            let updatedData = [...data];
            let updatedUserData = { ...userData };
            if (!savedCollection.createdBy) {
                //if the user tries to update a default collection,
                //we need to create another collection, set the createdBy
                //to the current user, and remove the default collection
                //from user's collections

                const filteredUserCollectionsIds = userData.collections.filter(
                    (collectionId) => collectionId !== savedCollection.id
                );

                updatedUserData = {
                    ...userData,
                    collections: filteredUserCollectionsIds,
                };

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

            await setRecipeCollectionInDB(savedCollection);
            setData([...updatedData, savedCollection]);

            const newUserData = {
                ...updatedUserData,
                collections: [
                    ...updatedUserData.collections,
                    savedCollection.id,
                ],
            };
            await setUserInDB(user.uid, newUserData);
            setUserData(newUserData);
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
                    <FontAwesomeIcon icon='plus' className='fa-icon-color' />
                    <span> Add Collection</span>
                </button>
                <div className='grid-list'>{renderGrid()}</div>
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
