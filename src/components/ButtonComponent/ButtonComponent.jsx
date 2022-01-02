import React from 'react';
import './ButtonComponent.css';

const ButtonComponent = ({ label, clickHandler, styleName, imageSrc }) => {
    return (
        <button
            className={`button-container ${styleName}`}
            onClick={(e) => {
                clickHandler(e);
            }}
        >
            {imageSrc && (
                <img
                    // className={`button-image--${this.state.size}`} TODO
                    src={imageSrc}
                    alt={label}
                />
            )}
            <span className='button-label'>{label}</span>
        </button>
    );
};

export default ButtonComponent;
