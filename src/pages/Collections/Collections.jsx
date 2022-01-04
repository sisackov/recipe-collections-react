import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import CollectionCard from '../../components/CollectionCard/CollectionCard';
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

    const renderGrid = () => {
        // console.log('renderGrid', data, isLoading, errorMsg);
        if (isLoading) return <Spinner />;
        if (errorMsg) return <div className='error-message'>{errorMsg}</div>;

        return data.map((collection) => {
            return (
                <div key={collection.id}>
                    <CollectionCard
                        collection={collection}
                        editHandler={handleEdit}
                        deleteHandler={handleDelete}
                    />
                </div>
            );
        });
    };

    const onAddCollection = () => {
        // setShowModal(true);
    };

    const handleCreate = () => {
        console.log('handleCreateCollection');
    };

    const handleEdit = (collection) => {
        console.log('handleEdit', collection);
    };

    const handleDelete = (collection) => {
        console.log('handleDelete', collection);
    };

    return (
        <>
            <div className='collections-list'>
                <h2>My Collections</h2>
                <button
                    className='collection-list__button'
                    onClick={() => setIsModalOpen(true)}
                >
                    <FontAwesomeIcon icon='plus' />
                </button>
                <div className='collections-list__grid'>{renderGrid()}</div>
                <Modal
                    isModalOpen={isModalOpen}
                    closeModal={() => setIsModalOpen(true)}
                >
                    <h2>Create Collection</h2>
                </Modal>
            </div>
        </>
    );
};

export default Collections;
