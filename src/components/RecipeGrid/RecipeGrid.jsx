import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    getRecipeByIdsFromDB,
    getRecipeCollectionByIdFromDB,
    setRecipeCollectionInDB,
} from '../../api/firebase';
import RecipeCard from '../RecipeCard/RecipeCard';
import Spinner from '../Spinner/Spinner';
import './RecipeGrid.css';

const RecipeGrid = () => {
    const { collectionId } = useParams();
    const [data, setData] = useState([]); //data is an array of recipe objects
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [collectionData, setCollectionData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const collection = await getRecipeCollectionByIdFromDB(
                    collectionId
                );
                setCollectionData(collection);
                console.log('collection: ', collection);

                const recipes = await getRecipeByIdsFromDB(
                    collection.recipes.map((recipe) => recipe.id)
                );
                setData(recipes);
            } catch (err) {
                setErrorMsg(err.message);
            }
            setIsLoading(false);
        };

        fetchData();

        return () => {
            setErrorMsg('');
        };
    }, [collectionId]);

    const handleDelete = async (recipe) => {
        console.log('RecipeGrid: handleDelete: recipe: ', recipe);
        const newCollectionData = {
            ...collectionData,
            recipes: collectionData.recipes.filter(
                (collectionRecipe) => collectionRecipe.id !== recipe.recipeId
            ),
        };
        console.log(
            'RecipeGrid: handleDelete: newCollectionData: ',
            newCollectionData
        );
        try {
            if (collectionData.createdBy) {
                await setRecipeCollectionInDB(newCollectionData);
            }
            //TODO: else - if default collection need to update user object
            setCollectionData(newCollectionData);

            const newData = data.filter((rec) => rec.id !== recipe.id);
            setData(newData);
        } catch (err) {
            setErrorMsg(err.message);
        }
    };

    const renderGrid = () => {
        if (isLoading) return <Spinner />;
        if (collectionData.id && collectionData.recipes.length === 0)
            return <div>No recipes in this collection</div>;
        if (errorMsg) return <div className='error-message'>{errorMsg}</div>;

        return (
            collectionData.id &&
            data.map((recipe) => {
                return (
                    <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        deleteHandler={handleDelete}
                    />
                );
            })
        );
    };

    return (
        <div className='recipe-grid-container'>
            <h2>{collectionData.title} Collection</h2>
            {<div className='grid-list'>{renderGrid()}</div>}
        </div>
    );
};

export default RecipeGrid;
