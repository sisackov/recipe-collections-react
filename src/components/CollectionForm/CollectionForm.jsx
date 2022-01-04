import React, { useState } from 'react';
import {
    ButtonField,
    InputField,
    TextareaField,
} from '../FormFields/FormFields';
import './CollectionForm.css';
import { v4 as uuidV4 } from 'uuid';
import {
    DEFAULT_COLLECTION_IMAGE,
    DEFAULT_COLLECTION_SEARCH_PREFIX,
} from '../../utils/collectionsUtils';

// const DUMMY = {
//     id: '054028c8-cf2b-4d21-a522-36946b1a1e52',
//     title: 'Dessert',
//     description: 'A collection of Dessert recipes',
//     image: 'https://i.imgur.com/SVHCNqB.jpeg',
//     searchUrl:
//         'https://api.spoonacular.com/recipes/complexSearch?apiKey=46bdbd59e31d4fef9fc381b3a71e94ad&type=dessert',
//     recipes: [
//         {
//             id: 'sponacular-1096280',
//             image: 'https://spoonacular.com/recipeImages/1096280-556x370.jpg',
//             title: 'Strawberry Lime Basil Sherbet',
//         },
//         {
//             id: 'sponacular-1096301',
//             image: 'https://spoonacular.com/recipeImages/1096301-556x370.jpg',
//             title: 'Easy Strawberry Shortcake for One',
//         },
//         {
//             id: 'sponacular-1096302',
//             image: 'https://spoonacular.com/recipeImages/1096302-556x370.jpg',
//             title: 'Coffee Chia Pudding',
//         },
//         {
//             id: 'sponacular-633139',
//             image: 'https://spoonacular.com/recipeImages/633139-556x370.jpg',
//             title: 'Avocado Chocolate Bits Frozen Yogurt',
//         },
//         {
//             id: 'sponacular-636289',
//             image: 'https://spoonacular.com/recipeImages/636289-556x370.jpg',
//             title: 'Brown Rice For Dessert',
//         },
//         {
//             id: 'sponacular-642780',
//             image: 'https://spoonacular.com/recipeImages/642780-556x370.jpg',
//             title: 'Fig and Walnut Pudding',
//         },
//         {
//             id: 'sponacular-643450',
//             image: 'https://spoonacular.com/recipeImages/643450-556x370.jpg',
//             title: 'Fresh Cherry Scones',
//         },
//         {
//             id: 'sponacular-658007',
//             image: 'https://spoonacular.com/recipeImages/658007-556x370.jpg',
//             title: 'Raw Vegan Chocolate and Raspberry Cake',
//         },
//         {
//             id: 'sponacular-664429',
//             image: 'https://spoonacular.com/recipeImages/664429-556x370.jpg',
//             title: 'Vegan Dirty Chai Pudding',
//         },
//         {
//             id: 'sponacular-715569',
//             image: 'https://spoonacular.com/recipeImages/715569-556x370.jpg',
//             title: 'Strawberry Cheesecake Chocolate Crepes',
//         },
//     ],
// };

/**
 * @param {boolean} isNew
 * @param {*} collection if isNew is false, this is the collection to edit.
 * Otherwise, collection should be empty object.
 */
const CollectionForm = ({ collection, editHandler, cancelHandler, isNew }) => {
    const [title, setTitle] = useState(collection.title || '');
    const [description, setDescription] = useState(
        collection.description || ''
    );
    const [imageUrl, setImageUrl] = useState(collection.image || '');

    const handleSave = (e) => {
        e.preventDefault();
        const newCollection = isNew
            ? {
                  id: uuidV4(),
                  title,
                  description,
                  image: imageUrl || DEFAULT_COLLECTION_IMAGE,
                  searchUrl:
                      DEFAULT_COLLECTION_SEARCH_PREFIX + title.toLowerCase(),
                  recipes: [],
              }
            : {
                  ...collection,
                  title,
                  description,
                  image: imageUrl || DEFAULT_COLLECTION_IMAGE,
              };
        console.log('newCollection', newCollection);
        editHandler(newCollection, isNew);
    };

    const handleCancel = (e) => {
        cancelHandler();
    };

    return (
        <form className='collection-form-container'>
            <InputField
                hasLabel={true}
                htmlFor='collection-title'
                label='Title'
                required={true}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type='text'
            />

            <TextareaField
                hasLabel='true'
                htmlFor='collection-description'
                label='Description'
                required={true}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <InputField
                hasLabel={true}
                htmlFor='collection-image-url'
                label='Image URL'
                required={false}
                type='text'
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
            />

            <div className='form-buttons-container'>
                <ButtonField
                    type='submit'
                    text='Save'
                    clickHandler={handleSave}
                />
                <ButtonField
                    type='button'
                    text='Cancel'
                    clickHandler={handleCancel}
                />
            </div>
        </form>
    );
};

export default CollectionForm;
