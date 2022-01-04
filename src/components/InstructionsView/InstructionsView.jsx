import React from 'react';
import CheckboxComponent from '../CheckboxComponent/CheckboxComponent';
import './InstructionsView.css';

const InstructionsView = ({ instructions, isForm }) => {
    const instructionsList = () => {
        // console.log('instructionsList', instructions);
        return (
            !isForm &&
            instructions.map((instruction, index) => {
                return (
                    <div
                        className='instructions-view__line'
                        key={`instruction-${instruction.number}`}
                    >
                        <CheckboxComponent />
                        <span>{instruction.step}</span>
                    </div>
                );
            })
        );
    };

    return (
        <div className='instructions-container'>
            <h3>Instructions</h3>
            {instructionsList()}
        </div>
    );
};

export default InstructionsView;
