import React from 'react';
import {
    ButtonField,
    CheckboxField,
    DatalistField,
    InputField,
    RadioField,
    SelectField,
    TextareaField,
} from './FormFields';

// Create component for form
class FormExample extends React.Component {
    render() {
        return (
            <form className='form-container' method='' action=''>
                <InputField
                    hasLabel={true}
                    htmlFor='textInput'
                    label='Text input'
                    required={true}
                    type='text'
                />

                <InputField
                    hasLabel={true}
                    htmlFor='emailInput'
                    label='Email input'
                    required={true}
                    type='email'
                />

                <InputField
                    hasLabel={true}
                    htmlFor='numberInput'
                    label='Number input'
                    required={true}
                    type='number'
                    min='0.5'
                    max='100'
                    step='0.5'
                />

                <InputField
                    hasLabel={true}
                    htmlFor='passwordInput'
                    label='Password input'
                    required={true}
                    type='password'
                />

                <SelectField
                    hasLabel={true}
                    htmlFor='select'
                    label='Select'
                    options='one, two, three, option four, five'
                    required={true}
                />

                <DatalistField
                    hasLabel={true}
                    htmlFor='datalist'
                    label='Datalist'
                    options='Chrome, Edge, Firefox, Internet Explorer, Opera, Safari, Vivaldi'
                    required={true}
                />

                <TextareaField
                    hasLabel={true}
                    htmlFor='textarea'
                    label='Textarea'
                    required={true}
                />

                <CheckboxField
                    hasLabel={true}
                    htmlFor='checkbox'
                    label='Checkbox'
                    required={true}
                />

                <RadioField
                    hasLabel={true}
                    htmlFor='radioOne'
                    label='Radio one'
                    name='radios'
                    required={true}
                />

                <RadioField
                    hasLabel={true}
                    htmlFor='radioTwo'
                    label='Radio two'
                    name='radios'
                    required={true}
                />

                <div className='form-buttons-container'>
                    <ButtonField value='save' text='Save' />
                    <ButtonField value='cancel' text='Cancel' />
                </div>
            </form>
        );
    }
}

export default FormExample;
