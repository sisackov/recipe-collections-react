import './CollectionCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { COLLECTIONS_PATH } from '../../utils/constants';

const CollectionCard = ({ collection, openCollectionForm, deleteHandler }) => {
    return (
        <div className='collection-card__item'>
            <div className='collection-card'>
                <div className='collection-card__content'>
                    <div className='collection-card__buttons'>
                        <button
                            className='collection-card__button'
                            onClick={() => openCollectionForm(collection)}
                        >
                            <FontAwesomeIcon
                                className='fa-icon-color'
                                icon='pencil-alt'
                            />
                        </button>
                        <button
                            className='collection-card__button'
                            onClick={() => deleteHandler(collection)}
                        >
                            <FontAwesomeIcon
                                className='fa-icon-color'
                                icon='trash-alt'
                            />
                        </button>
                    </div>
                    <div className='collection-card__text'>
                        <h4>{collection.title}</h4>
                        <div>{collection.description}</div>
                    </div>
                    <div className='collection-card__link'>
                        <Link to={`${COLLECTIONS_PATH}/${collection.id}`}>
                            View Collection Recipes
                        </Link>
                    </div>
                </div>
                <div className='collection-card__image'>
                    <img src={collection.image} alt={collection.title} />
                </div>
            </div>
        </div>
    );
};
export default CollectionCard;
