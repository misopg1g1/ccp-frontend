import React from 'react'
import PropTypes from 'prop-types'
import boldTextWithString from '../utils/boldTextWithString'

class Input extends React.Component {
    constructor(props) {
        super(props)
        let {value} = props
        if (props.type === 'checkbox') {
            value = props.checked
        }

        this.state = {
            value: value,
            error: false,
            errorRegex: false,
            errorMessage: '',
            valid: false
        }
        this.onChange = this.onChange.bind(this)
        this.onBlur = this.onBlur.bind(this)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if ((prevState.value !== nextProps.value && !nextProps.mask) || nextProps.value === '') {
            const value = nextProps.value || ''
            return {value}
        }
    }

    onChange(event) {
        const {forcedValid, handleValueChange, maxLength, type} = this.props
        const {value: currentValue} = this.state
        const targetValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        const targetName = event.target.name
        if (type === 'tel' && !/^[0-9 ]+$/.test(targetValue) && targetValue !== '') {
            return null
        }
        if (maxLength && targetValue.length > maxLength && currentValue.length < targetValue.length) {
            return null
        }
        const value = targetValue
        this.setState(
            {value},
            () => {
                if (forcedValid != undefined) {
                    this.validate(targetName)
                }
            }
        )
        handleValueChange(targetName, value);
        return true
    }

    onBlur(event) {
        this.validate(event.target.name)
    }

    validate(name) {
        const nextState = {
            error: false,
            errorRegex: false,
            valid: true,
            errorMessage: ''
        }

        let {value} = this.state
        const {handleValueValid, required, validations, mask} = this.props

        // empty value
        if (value === '') {
            nextState.valid = false;
            this.setState(nextState);
            handleValueValid(name, required ? false : null)
            return
        }

        if(mask) {
            value = value;
        }

        // Con regex
        if (Array.isArray(validations)) {
            validations.forEach(validation => {
                if (validation.fn && validation.message) {
                    if (!validation.fn(value)) {
                        nextState.errorRegex = true
                        nextState.errorMessage = validation.message
                        this.setState(nextState)
                        handleValueValid(name, false)
                    }
                }
            })
        }

        if (nextState.errorRegex) {
            return;
        }

        this.setState(nextState)
        handleValueValid(name, true)
    }

    render() {
        let classValid = '';

        const {required, requiredMessage, invalidMessage, fixedLabel, forcedValid} = this.props
        const {width, marginTop, marginBotton, marginRight, marginLeft, paddingBottom, display} = this.props
        const {backgroundInput, reference, maxLength, minLength, max, min, hideError} = this.props
        const {name, type, placeholder, label, searchValue, labelWidth, autocomplete} = this.props
        const {minDate, maxDate, checked, disabled, align, float, additionalProp} = this.props

        let {classInput} = this.props;
        const {error, errorRegex, errorMessage, valid, value} = this.state

        if (required) {
            classInput += 'required'
        }
        if (fixedLabel) {
            classInput += ' fixedLabel'
        } else if (value !== '') {
            classInput += ' used'
        }
        if (forcedValid === false) {
            classValid = ' error'
        } else {
            classValid = (error || errorRegex ? ' error' : '') + (valid ? ' valid' : '')
        }

        let className = ''
        if (errorMessage !== '') {
            className += 'errorMessage'
        }

        if (type === 'checkbox') {
            className += 'typeCheckbox'
        } else if (type === 'radio') {
            className += 'typeRadio'
        } else {
            className += 'typeInput'
        }

        return (
            <div
                className='LoginFormInputs'
                style={{
                    width: width || '100%',
                    marginTop,
                    marginBotton,
                    marginRight,
                    marginLeft,
                    paddingBottom,
                    display,
                    ...(type === 'date' && {float: 'left'}),
                    float
                }}
            >
                <label
                    className='FormLabel'
                    htmlFor={type === 'radio' ? `filterCat${value}` : name}
                    {...((type === 'radio' || type === 'checkbox') && {
                        style: {width: labelWidth || width}
                    })}
                >
                    {searchValue ? boldTextWithString(label, searchValue) : label}
                </label>
                <input
                    className={classInput + classValid}
                    type={type}
                    name={name}
                    autoComplete={!autocomplete ? 'off' : ''}
                    placeholder={placeholder}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    onKeyPress={this.onKeyPress}
                    value={value}
                    id={type === 'radio' ? `filterCat${value}` : name}
                    ref={reference}
                    {...(additionalProp && {...additionalProp})}
                    {...(maxLength && {maxLength})}
                    {...(minLength && {minLength})}
                    {...(min && {min})}
                    {...(max && {max})}
                    {...(type === 'date' && {'date-format': 'dd/mm/yyyy'})}
                    {...(type === 'date' && minDate !== '' && {min: minDate})}
                    {...(type === 'date' && maxDate !== '' && {max: maxDate})}
                    {...(type === 'checkbox' && checked && {defaultChecked: true})}
                    {...(type === 'radio' && checked && {defaultChecked: true})}
                    {...(disabled === true && {disabled: 'disabled'})}
                    {...((align || backgroundInput) && {
                        style: {
                            ...(align && {float: align}),
                            ...(backgroundInput && {background: backgroundInput})
                        }
                    })}
                />
                {!hideError && classValid === ' error' && errorRegex === false && (
                    <p className="ErrorMessage">
                        {!value ? requiredMessage : invalidMessage}
                    </p>
                )}
                {!hideError && errorRegex && (
                    <p className='ErrorMessage'>
                        {errorMessage}
                    </p>
                )}
            </div>
        )
    }
}

Input.propTypes = {
    align: PropTypes.string,
    float: PropTypes.string,
    disabled: PropTypes.bool,
    maxDate: PropTypes.string,
    minDate: PropTypes.string,
    labelWidth: PropTypes.string,
    searchValue: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired,
    autocomplete: PropTypes.bool,
    name: PropTypes.string,
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
    reference: PropTypes.any,
    backgroundInput: PropTypes.string,
    display: PropTypes.string,
    paddingBottom: PropTypes.string,
    marginLeft: PropTypes.string,
    marginRight: PropTypes.string,
    marginTop: PropTypes.string,
    marginBotton: PropTypes.string,
    width: PropTypes.string,
    fixedLabel: PropTypes.string,
    validations: PropTypes.array,
    handleValueValid: PropTypes.func.isRequired,
    validateOnInput: PropTypes.bool,
    handleValueChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    forcedValid: PropTypes.bool,
    value: PropTypes.any,
    checked: PropTypes.any,
    requiredMessage: PropTypes.string,
    invalidMessage: PropTypes.string,
    classInput: PropTypes.string,
    mask: PropTypes.string,
    errorPosition: PropTypes.string,
    additionalProp: PropTypes.any,
    max: PropTypes.number,
    min: PropTypes.number,
    hasError: PropTypes.bool
}

Input.defaultProps = {
    align: '',
    float: '',
    disabled: false,
    maxDate: null,
    minDate: null,
    labelWidth: null,
    searchValue: null,
    label: null,
    placeholder: null,
    autocomplete: false,
    name: null,
    minLength: null,
    maxLength: null,
    reference: null,
    backgroundInput: null,
    display: null,
    paddingBottom: null,
    marginLeft: null,
    marginRight: null,
    marginTop: null,
    marginBotton: null,
    width: null,
    fixedLabel: null,
    validations: null,
    validateOnInput: false,
    required: false,
    requiredMessage: '',
    invalidMessage: '',
    forcedValid: false,
    value: null,
    checked: '',
    classInput: '',
    mask: '',
    errorPosition: '',
    additionalProp: null,
    max: null,
    min: null,
    hasError: false
}

export default Input