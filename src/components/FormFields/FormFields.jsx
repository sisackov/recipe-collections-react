import React, { Component } from 'react';
import './FormFields.css';

// Create component for label
class LabelField extends Component {
    render() {
        if (this.props.hasLabel) {
            return (
                <label className='form-label' htmlFor={this.props.htmlFor}>
                    {this.props.label}
                </label>
            );
        }
        return null;
    }
}

// Create component for button
class ButtonField extends Component {
    render() {
        return (
            // <fieldset className='form-fieldset'>
            <button
                className='form-button'
                type={this.props.type || 'button'}
                value={this.props.value || null}
                onClick={this.props.clickHandler || null}
            >
                {this.props.text}
            </button>
            // </fieldset>
        );
    }
}

// Create component for datalist input
class DatalistField extends Component {
    render() {
        // Get all options from option prop
        const dataOptions = this.props.options.split(', ');

        // Generate list of options
        const dataOptionsList = dataOptions.map((dataOption, index) => {
            return <option key={index} value={dataOption} />;
        });

        return (
            <fieldset className='form-fieldset'>
                <LabelField
                    hasLabel={this.props.hasLabel}
                    htmlFor={this.props.htmlFor}
                    label={this.props.label}
                />

                <input className='form-input-field' list={this.props.htmlFor} />

                <datalist
                    defaultValue=''
                    id={this.props.htmlFor}
                    name={this.props.name || null}
                    required={this.props.required || null}
                >
                    <option value='' disabled>
                        Select one option
                    </option>

                    {dataOptionsList}
                </datalist>
            </fieldset>
        );
    }
}

// Create component for checkbox input
class CheckboxField extends Component {
    render() {
        return (
            <fieldset className='form-fieldset'>
                <label
                    className='form-label'
                    htmlFor={this.props.htmlFor}
                    label={this.props.label}
                >
                    <input
                        className='form-input-field'
                        id={this.props.htmlFor}
                        name={this.props.name || null}
                        required={this.props.required || null}
                        type='checkbox'
                    />
                    {this.props.label}
                </label>
            </fieldset>
        );
    }
}

// Create component for input
class InputField extends Component {
    render() {
        return (
            <fieldset className='form-fieldset'>
                <LabelField
                    hasLabel={this.props.hasLabel}
                    htmlFor={this.props.htmlFor}
                    label={this.props.label}
                />

                <input
                    className='form-input-field'
                    id={this.props.htmlFor}
                    max={this.props.max || null}
                    min={this.props.min || null}
                    name={this.props.name || null}
                    placeholder={this.props.placeholder || null}
                    required={this.props.required || null}
                    step={this.props.step || null}
                    type={this.props.type || 'text'}
                    value={this.props.value || ''}
                    onChange={this.props.onChange || null}
                />
            </fieldset>
        );
    }
}

// Create component for radio input
class RadioField extends Component {
    render() {
        return (
            <fieldset className='form-fieldset'>
                <label
                    className='form-label'
                    htmlFor={this.props.htmlFor}
                    label={this.props.label}
                >
                    <input
                        className='form-input-field'
                        id={this.props.htmlFor}
                        name={this.props.name || null}
                        required={this.props.required || null}
                        type='radio'
                    />
                    {this.props.label}
                </label>
            </fieldset>
        );
    }
}

// Create component for select input
class SelectField extends Component {
    state = {
        selectData: this.props.selectData,
        selectValue: this.props.selectValue,
    };

    componentDidUpdate(prevProps) {
        if (prevProps.selectData !== this.props.selectData) {
            this.setState({ selectData: this.props.selectData });
        }
        if (prevProps.selectValue !== this.props.selectValue) {
            this.setState({ selectValue: this.props.selectValue });
        }
    }

    render() {
        console.log('selectData: ', this.state.selectData);
        const { selectData } = this.state;
        const selectDataOptionsList =
            selectData &&
            selectData.map((selectDataItem, index) => {
                return (
                    <option key={index} value={selectDataItem.value}>
                        {selectDataItem.option}
                    </option>
                );
            });

        return (
            <fieldset className='form-fieldset'>
                <LabelField
                    hasLabel={this.props.hasLabel}
                    htmlFor={this.props.htmlFor}
                    label={this.props.label}
                />

                <select
                    value={this.state.selectValue}
                    onChange={this.props.changeHandler}
                    className='form-select-field'
                    defaultValue=''
                    id={this.props.htmlFor}
                    name={this.props.name || null}
                    required={this.props.required || null}
                >
                    <option value='' disabled>
                        {this.props.placeholder || 'Select one option'}
                    </option>
                    {selectDataOptionsList}
                </select>
            </fieldset>
        );
    }
}

// Create component for textarea
class TextareaField extends Component {
    render() {
        return (
            <fieldset className='form-fieldset'>
                <LabelField
                    hasLabel={this.props.hasLabel}
                    htmlFor={this.props.htmlFor}
                    label={this.props.label}
                />

                <textarea
                    className='form-textarea-field'
                    cols={this.props.cols || null}
                    id={this.props.htmlFor}
                    name={this.props.name || null}
                    required={this.props.required || null}
                    rows={this.props.rows || null}
                    value={this.props.value || ''}
                    onChange={this.props.onChange || null}
                ></textarea>
            </fieldset>
        );
    }
}

export {
    LabelField,
    ButtonField,
    CheckboxField,
    DatalistField,
    InputField,
    RadioField,
    SelectField,
    TextareaField,
};
