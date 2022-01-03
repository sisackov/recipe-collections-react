import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import CollectionCard from '../../components/CollectionCard/CollectionCard';
import Spinner from '../../components/Spinner/Spinner';
import {
    auth,
    getRecipeCollectionsByIdsFromDB,
    getUserByIdFromDB,
} from '../../utils/firebase';

const Collections = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
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

        return data.map((collection, index) => {
            return (
                <div key={collection.id}>
                    <CollectionCard collection={collection} />
                </div>
            );
        });
    };

    return (
        <div className='collections-list'>
            <h2>My Collections</h2>
            {renderGrid()}
        </div>
    );
};

export default Collections;
