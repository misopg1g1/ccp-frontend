import React, { SelectHTMLAttributes } from "react";

interface SelectComponentProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id?: string;
  value: string;
  reference?: any;
  required?: boolean;
  requiredMessage?: string;
  fixedLabel?: boolean;
  forcedValid?: boolean;
  options?: any;
  width?: string;
  marginTop?: string,
  marginRight?: string;
  marginLeft?: string;
  paddingBottom?: string;
  name: string;
  disabled?: boolean;
  label?: string;
  handleValueChange: any;
  handleValueValid: any;
  defaultOption?: string;
  defaultDisable?: boolean;
  classSelect?: string;
  stylesSelect?: any;
  showOptions?: boolean;
  hideError?: boolean;
  additionalProp?: any;
}

interface SelectComponentState {
  value: string;
  valid: boolean;
}

class Select extends React.Component<
  SelectComponentProps,
  SelectComponentState
> {
  static defaultProps = {
    id: "",
    value: "",
    reference: null,
    required: false,
    requiredMessage: "",
    fixedLabel: false,
    forcedValid: true,
    options: [],
    defaultOption: null,
    width: "",
    marginRight: "",
    marginLeft: "",
    marginTop: "",
    paddingBottom: "",
    disabled: false,
    label: "",
    classSelect: "",
    stylesSelect: "",
    showOptions: true,
    defaultDisable: false,
    hideError: false,
    additionalProp: null,
  };

  constructor(props: SelectComponentProps) {
    super(props);
    this.state = {
      value: props.value,
      valid: false,
    };
  }

  onChange = (event: any) => {
    const cloneEvent = { ...event };
    this.setState(
      {
        value: event.target.value,
      },
      () => {
        this.validate(cloneEvent);
      }
    );
    const { handleValueChange } = this.props;
    handleValueChange(event.target.name, event.target.value);
  };

  onBlur = (event: any) => {
    const { required } = this.props;
    if (required) {
      this.validate(event);
    }
  }

  validate = (event: any) => {
    const { value } = this.state;
    const { handleValueValid, required } = this.props;

    if (value === "" || value === "default") {
      this.setState({
        valid: false,
      });
      handleValueValid(event.target.name, required ? false : null);
    } else {
      this.setState({
        valid: true,
      });
      handleValueValid(event.target.name, true);
    }
  }

  render() {
    const {
      id,
      required,
      fixedLabel,
      value,
      forcedValid,
      options,
      name,
      disabled,
      label,
      defaultOption,
      defaultDisable,
      classSelect,
      stylesSelect,
      requiredMessage,
      hideError,
      reference,
      additionalProp,
      width,
      marginTop,
      marginRight,
      marginLeft,
      paddingBottom,
      showOptions,
    } = this.props;
    const { valid } = this.state;
    let classElement = "";
    let classValid = "";
    let optionsToRender = "";

    if (classSelect) {
      classElement += classSelect;
    }

    if (required) {
      classElement += " required";
    }

    if (fixedLabel) {
      classElement += " fixedLabel";
    } else if (value !== "") {
      classElement += " used";
    }

    if (forcedValid === false) {
      classValid = " error";
    } else {
      classValid = valid ? " valid" : "";
    }

    if (options.length || (showOptions && options.length)) {
      optionsToRender = options.map((option: any) => {
        return (
          <option
            value={option.value}
            key={option.value}
            className={option.class}
          >
            {" "}
            {option.name}
          </option>
        );
      });
    }

    return (
      <div
        className="LoginFormInputs"
        style={{
          width: width || "100%",
          marginRight,
          marginLeft,
          paddingBottom,
          marginTop,
        }}
      >
        <label htmlFor="type" className="FormLabel">
          {label}
        </label>
        <select
          id={id}
          name={name}
          className={classSelect + classValid}
          onBlur={this.onBlur}
          onChange={this.onChange}
          value={value}
          {...(disabled && { disabled: "disabled" })}
          {...(additionalProp && { ...additionalProp })}
        >
          {options.map((option: any) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div>
          {!hideError && classValid === " error" && (
            <p className="ErrorMessage">{requiredMessage}</p>
          )}
        </div>
      </div>
    );
  }
}

export default Select;
