import './CollectionCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CollectionCard = ({ collection, editHandler, deleteHandler }) => {
    // console.log('CollectionCard', collection);

    return (
        <div className='collection-card'>
            <div className='collection-card__content'>
                <div className='collection-card__buttons'>
                    <button
                        className='collection-card__button'
                        onClick={() => editHandler(collection)}
                    >
                        <FontAwesomeIcon icon='pencil-alt' />
                    </button>
                    <button
                        className='collection-card__button'
                        onClick={() => deleteHandler(collection)}
                    >
                        <FontAwesomeIcon icon='trash-alt' />
                    </button>
                </div>
                <h4>{collection.title}</h4>
                <div>{collection.description}</div>
            </div>
            <div className='collection-card__image'>
                <img src={collection.image} alt={collection.title} />
            </div>
        </div>
    );
};
export default CollectionCard;
