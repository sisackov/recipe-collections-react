import React, { useEffect, useRef, useState } from 'react';
import {
    ButtonField,
    SelectField,
    TextareaField,
} from '../FormFields/FormFields';
import './CollectionRecipeForm.css';
import { v4 as uuidV4 } from 'uuid';
import {
    auth,
    getRecipeCollectionByIdFromDB,
    getRecipeCollectionsByIdsFromDB,
    getUserByIdFromDB,
    setRecipeCollectionInDB,
} from '../../api/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Spinner from '../Spinner/Spinner';

const CollectionRecipeForm = ({ recipe, cancelHandler }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [user] = useAuthState(auth);
    const [selectedCollection, setSelectedCollection] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const userDataResp = await getUserByIdFromDB(user.uid);
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

    const handleSave = async (e) => {
        if (!selectedCollection) return; //form validation
        e.preventDefault();

        try {
            const updatedRecipeCollection = data.find((recipeCollection) => {
                return recipeCollection.id === selectedCollection;
            });
            updatedRecipeCollection.recipes.push({
                id: recipe.recipeId,
                image: recipe.image,
                title: recipe.title,
            });

            await setRecipeCollectionInDB(updatedRecipeCollection);
            setData([...data]);
            setSelectedCollection('');
            cancelHandler();
        } catch (err) {
            setErrorMsg(err.message);
        }
    };

    const getSelectDataOptionsList = () => {
        if (!data.length) return null;
        const options = data.map((recColl, index) => {
            return (
                <option key={recColl.id} value={recColl.id}>
                    {recColl.title}
                </option>
            );
        });
        options.unshift(
            <option value='' disabled key='disabled-select-option'>
                {'Select one option'}
            </option>
        );
        return options;
    };

    if (isLoading) return <Spinner />;
    if (errorMsg) return <div className='error-message'>{errorMsg}</div>;
    return (
        <form className='collection-form-container'>
            <div className='collection-form-header'>
                <h2>Add recipe to collection</h2>
            </div>

            <fieldset className='form-fieldset'>
                <select
                    value={selectedCollection}
                    onChange={(e) => setSelectedCollection(e.target.value)}
                    className='form-select-field'
                    required={true}
                >
                    {getSelectDataOptionsList()}
                </select>
            </fieldset>

            <div className='form-buttons-container'>
                <ButtonField
                    type='submit'
                    text='Save'
                    clickHandler={handleSave}
                />
                <ButtonField
                    type='button'
                    text='Cancel'
                    clickHandler={cancelHandler}
                />
            </div>
        </form>
    );
};

export default CollectionRecipeForm;
