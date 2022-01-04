import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import CollectionCard from '../../components/CollectionCard/CollectionCard';
import CollectionForm from '../../components/CollectionForm/CollectionForm';
import Modal from '../../components/Modal/Modal';
import Spinner from '../../components/Spinner/Spinner';
import {
    auth,
    getRecipeCollectionsByIdsFromDB,
    getUserByIdFromDB,
} from '../../utils/firebase';
import './Collections.css';

const Collections = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [collectionObject, setCollectionObject] = useState({});
    const [user] = useAuthState(auth);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const userData = await getUserByIdFromDB(user.uid);
                const recipeCollections = await getRecipeCollectionsByIdsFromDB(
                    userData.collections
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
        console.log('openCollectionForm', collectionObj);
        setIsModalOpen(true);
        setCollectionObject(collectionObj);
    };

    const renderGrid = () => {
        // console.log('renderGrid', data, isLoading, errorMsg);
        if (isLoading) return <Spinner />;
        if (errorMsg) return <div className='error-message'>{errorMsg}</div>;

        return data.map((collection) => {
            return (
                <div key={collection.id}>
                    <CollectionCard
                        collection={collection}
                        openCollectionForm={openCollectionForm}
                        deleteHandler={handleDelete}
                    />
                </div>
            );
        });
    };

    const handleSaveForm = (savedCollection, isNew) => {
        isNew
            ? createCollection(savedCollection)
            : updateCollection(savedCollection);
    };

    const createCollection = (collection) => {
        console.log('createCollection', collection);
    };

    const updateCollection = (collection) => {
        console.log('handleEdit', collection);
    };

    const handleDelete = (collection) => {
        console.log('handleDelete', collection);
    };

    const renderModalContent = () => {
        const isNewForm = !collectionObject.id;
        return (
            <CollectionForm
                collection={collectionObject}
                saveHandler={handleSaveForm}
                cancelHandler={() => setIsModalOpen(false)}
                isNew={isNewForm}
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
                <div className='collections-list__grid'>{renderGrid()}</div>
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
