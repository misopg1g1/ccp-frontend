import React, { InputHTMLAttributes} from 'react'
import boldTextWithString from '../utils/boldTextWithString'

interface InputComponentProps extends InputHTMLAttributes<HTMLInputElement> {
    align?: string,
    disabled?: boolean,
    maxDate?: string,
    minDate?: string,
    labelWidth?: string,
    searchValue?: string,
    label: string,
    placeholder?: string,
    type: string,
    autocomplete?: boolean,
    name?: string,
    minLength?: number,
    maxLength?: number,
    reference?: any,
    backgroundInput?: string,
    display?: string,
    paddingBottom?: string,
    marginLeft?: string,
    marginRight?: string,
    marginTop?: string,
    marginBottom?: string,
    width?: string,
    fixedLabel?: string,
    validations?: any,
    handleValueValid: any,
    validateOnInput?: boolean,
    handleValueChange: any,
    required?: boolean,
    forcedValid?: boolean,
    value?: any,
    checked?: any,
    requiredMessage?: string,
    invalidMessage?: string,
    classInput?: string,
    mask?: string,
    errorPosition?: string,
    additionalProp?: any,
    max?: number,
    min?: number,
    hasError?: boolean,
    icon?: any,
    onFocus?: () => void,
}

interface InputComponentState {
    value: string
    error: boolean
    errorRegex: boolean
    errorMessage: string
    valid: boolean
}

class Input extends React.Component<InputComponentProps, InputComponentState> {
    static defaultProps = {
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
        marginBottom: null,
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
        hasError: false,
        icon: null
    }

    constructor(props: InputComponentProps) {
        super(props)
        let {value} = props
        if (props.type === 'checkbox') {
            value = props.checked
        }

        this.state = {
            value: this.maskValue(value),
            error: false,
            errorRegex: false,
            errorMessage: '',
            valid: false
        }
        this.onChange = this.onChange.bind(this)
        this.onBlur = this.onBlur.bind(this)
    }

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        if ((prevState.value !== nextProps.value && !nextProps.mask) || nextProps.value === '') {
            const value = nextProps.value || ''
            return {value}
        }
        return null
    }

    onChange(event: any) {
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
        const value = this.maskValue(targetValue)
        this.setState(
            {value},
            () => {
                if (forcedValid != undefined) {
                    this.validate(targetName)
                }
            }
        )
        handleValueChange(targetName, this.unmaskValue(value))
        return true
    }

    onBlur(event: React.FocusEvent<HTMLInputElement>) {
        this.validate(event.target.name)
    }

    maskValue = (value: any) => {
        const {mask} = this.props
        if (!value) {
            return ''
        }
        if (!mask) {
            return value
        }
    }

    unmaskValue = (value: any) => {
        const {mask} = this.props
        if (!value) {
            return ''
        }
        if (!mask) {
            return value
        }
    }

    validate(name: string) {
        const nextState = {
            error: false,
            errorRegex: false,
            valid: true,
            errorMessage: ''
        }

        let {value} = this.state
        const {handleValueValid, required, validations} = this.props

        // empty value
        if (value === '') {
            nextState.valid = false
            this.setState(nextState)
            handleValueValid(name, required ? false : null)
            return
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
            return
        }

        this.setState(nextState)
        handleValueValid(name, true)
    }

    render() {
        let classValid = ''

        const {required, requiredMessage, invalidMessage, fixedLabel, forcedValid} = this.props
        const {width, marginTop, marginBottom, marginRight, marginLeft, paddingBottom, display} = this.props
        const {backgroundInput, reference, maxLength, minLength, max, min, hasError} = this.props
        const {name, type, placeholder, label, searchValue, labelWidth, autocomplete} = this.props
        const {minDate, maxDate, checked, disabled, align, additionalProp, icon, onFocus} = this.props
        let {classInput} = this.props
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

        return (
            <div
                className='LoginFormInputs'
                style={{
                    width: width || '100%',
                    marginTop,
                    marginBottom,
                    marginRight,
                    marginLeft,
                    paddingBottom,
                    display,
                    ...(type === 'date' && {float: 'left'}),
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
                    onFocus={onFocus}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
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
                {icon}
                <div>
                    {!hasError && classValid === ' error' && errorRegex === false && (
                        <p className="ErrorMessage">
                            {!value ? requiredMessage : invalidMessage}
                        </p>
                    )}
                    {!hasError && errorRegex && (
                        <p className='ErrorMessage'>
                            {errorMessage}
                        </p>
                )}
                </div>
            </div>
        )
    }
}

export default Input