import "./createCustomerModal.css";

import React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import Icons from "../../libs/icons";
import Input from "../../libs/input";
import Select from "../../libs/select";
import { Seller, DocumentType, Zone } from "../../utils/types";
import { Customer, FieldsRequired, defaultFieldsRequired, defaultCustomer } from "../../pages/customers/customer";
import { createCustomer } from "../../actions/customer";
import { getCitiesByCountry, cleanCities } from "../../actions/country";
import { emailRegex } from "../../utils/regex";
import { withTranslation } from "react-i18next";

interface CreateCustomerComponentProps {
  isOpen: boolean;
  handleCloseModal: (event: any) => void;
  createCustomerFunc: (customer: Customer, tokne: string) => void;
  getCitiesByCountryFunc: (country: string) => any;
  cleanCitiesFunc: () => void;
  token: string;
  sellers: Seller[];
  countries: string[];
  cities: string[];
  t: any;
}

interface CreateCustomerComponentState {
  customer: Customer;
  fieldIsValid: FieldsRequired;
}

class CreateCustomerModal extends React.Component<
  CreateCustomerComponentProps,
  CreateCustomerComponentState
> {
  constructor(props: CreateCustomerComponentProps) {
    super(props);
    this.state = {
      customer: defaultCustomer,
      fieldIsValid: defaultFieldsRequired,
    };
  }

  formIsValid = (): boolean => {
    const { customer } = this.state;
    const fieldIsValid = defaultFieldsRequired;
    fieldIsValid.registered_name = customer.registered_name != "";
    fieldIsValid.first_name = customer.first_name != "";
    fieldIsValid.last_name = customer.last_name != "";
    fieldIsValid.identification_type = customer.identification.type != "default";
    fieldIsValid.identification_number = customer.identification.number != "";
    fieldIsValid.phone = customer.phone != "";
    fieldIsValid.email = customer.email != "";
    fieldIsValid.seller_id = customer.seller_id != "default";
    fieldIsValid.address_country = customer.address.country != "default";
    fieldIsValid.address_city = customer.address.city != "default";
    fieldIsValid.address_zone = customer.address.zone != "default";
    fieldIsValid.address_address = customer.address.address != "";
    this.setState({ fieldIsValid: fieldIsValid });
    const invalidFields = Object.entries(fieldIsValid).filter(([, value]) => !value);
    return !(invalidFields.length > 0);
  };

  handleCloseModal = (event: any) => {
    this.props.handleCloseModal(event);
    this.setState({customer: defaultCustomer});
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    if (!this.formIsValid()) {
      return;
    }
    const { customer } = this.state;
    const { createCustomerFunc, token } = this.props;
    createCustomerFunc(customer, token);
    this.handleCloseModal(event);
  };

  handleValueChangeCountry = (name: string, value: string) => {
    const { getCitiesByCountryFunc, cleanCitiesFunc } = this.props;
    cleanCitiesFunc();
    if (value !== 'default') {
      getCitiesByCountryFunc(value);
    }
    this.handleValueChange(name, value);
  }

  handleValueChange = (name: string, value: string) => {
    const objectFields = [
      'identification_type',
      'identification_number',
      'address_address', 
      'address_postal_code',
      'address_city',
      'address_country',
      'address_zone',
    ];
    if(objectFields.includes(name)) {
      this.setStateObject(name, value);
    } else {
      this.setState({
        customer: {
          ...this.state.customer,
          [name]: value,
        },
      });
    }
  };

  setStateObject = (name: string, value: string) => {
    const transform: string[] = name.split("_");
    const nameProperty = transform.length > 2 ? 'postal_code' : transform[1]
    if (transform[0] === 'identification') {
      this.setStateIdentification(nameProperty, value);
    } else if (transform[0] === 'address') {
      this.setStateAddress(nameProperty, value)
    }
  };

  setStateIdentification = (name: string, value: string) => {
    this.setState({
      customer: {
        ...this.state.customer,
        identification: {
          ...this.state.customer.identification,
          [name]: value
        },
      },
    });
  }

  setStateAddress = (name: string, value: string) => {
    this.setState({
      customer: {
        ...this.state.customer,
        address: {
          ...this.state.customer.address,
          [name]: value
        },
      },
    });
  }

  handleValueValid = (name: string, valid: boolean) => {
    this.setState({
      fieldIsValid: {
        ...this.state.fieldIsValid,
        [name]: valid,
      }
    });
  };

  validationsEmailField: any = [
    {
        fn: (value: string) => emailRegex.test(value),
        message: 'Ingrese un email valido'
    }
  ];

  render() {
    const { isOpen } = this.props;
    const { customer, fieldIsValid } = this.state;
    const customStyle = {
      overlay: {
        background: "rgba(0, 0, 0, 0.7)",
        maxHeight: "100vh",
        overflowY: "auto",
        zIndex: 5
      },
      content: {
        top: "3%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        width: '650px',
        transform: "translate(-50%, 0%)",
        background: "rgba(244, 245, 247, 1)",
      },
    };
    const optionsDocumentType = [
      { value: "default", label: this.props.t("customer.options.document-type") },
      { value: DocumentType.DNI, label: this.props.t("customer.options.document-type-dni") },
      { value: DocumentType.NIT, label: this.props.t("customer.options.document-type-nit") },
      { value: DocumentType.RUT, label: this.props.t("customer.options.document-type-rut") },
      { value: DocumentType.CEDULA_DE_EXTRANJERIA, label: this.props.t("customer.options.document-type-ce") },
      { value: DocumentType.PASAPORTE, label: this.props.t("customer.options.document-type-ps") },
    ];
    const optionsZone = [
      { value: "default", label: this.props.t("customer.options.zone") },
      { value: Zone.ZONA_NORTE, label: this.props.t("customer.options.zone-north") },
      { value: Zone.ZONA_ESTE, label: this.props.t("customer.options.zone-east") },
      { value: Zone.ZONA_CENTRO, label: this.props.t("customer.options.zone-central") },
      { value: Zone.ZONA_OESTE, label: this.props.t("customer.options.zone-west") },
      { value: Zone.ZONA_SUR, label: this.props.t("customer.options.zone-south") },
    ];
    const optionsCountry = [
      { value: "default", label: this.props.t("customer.options.country") },
    ].concat(
      Object.values(this.props.countries || []).map((country) => ({
        label: country,
        value: country,
      }))
    );
    const optionsCity = [
      { value: "default", label: this.props.t("customer.options.city") },
    ].concat(
      Object.values(this.props.cities || []).map((city) => ({
        label: city,
        value: city,
      }))
    );
    const optionsSellers = [
      { value: "default", label: this.props.t("customer.options.seller") },
    ].concat(
      Object.values(this.props.sellers || []).map((seller) => ({
        label: `${seller.first_name} ${seller.last_name}`,
        value: seller.id,
      }))
    );

    return (
      <Modal 
        isOpen={isOpen}
        onRequestClose={this.handleCloseModal}
        style={customStyle}
        ariaHideApp={false}
      >
        <div className="ContentModal">
          <div>
            <span className="ModalTitle">
              {this.props.t("customer.modal.title")}
            </span>
            <div
              className="CloseModalButton"
              onClick={this.handleCloseModal}
              role="button"
              tabIndex={0}
            >
              <Icons icon="close" className="left-icon" color="#000000" />
            </div>
          </div>
          <React.Fragment>
            <Input
              type="text"
              name="registered_name"
              label={this.props.t("customer.modal.input.registered_name-label")}
              placeholder={this.props.t("customer.modal.input.registered_name-placeholder")}
              value={customer.registered_name}
              handleValueChange={this.handleValueChange}
              handleValueValid={this.handleValueValid}
              classInput="Input mt-8"
              marginTop="24px"
              required={true}
              requiredMessage={this.props.t("customer.modal.input.required_message")}
              forcedValid={fieldIsValid.registered_name}
            />
            <div className="ModalContainerTwoColumns">
              <Input
                type="text"
                name="first_name"
                label={this.props.t("customer.modal.input.first_name-label")}
                placeholder={this.props.t("customer.modal.input.first_name-placeholder")}
                value={customer.first_name}
                handleValueChange={this.handleValueChange}
                handleValueValid={this.handleValueValid}
                classInput="Input mt-8"
                marginTop="24px"
                required={true}
                requiredMessage={this.props.t("customer.modal.input.required_message")}
                forcedValid={fieldIsValid.first_name}
                width="48%"
              />
              <Input
                type="text"
                name="last_name"
                label={this.props.t("customer.modal.input.last_name-label")}
                placeholder={this.props.t("customer.modal.input.last_name-placeholder")}
                value={customer.last_name}
                handleValueChange={this.handleValueChange}
                handleValueValid={this.handleValueValid}
                classInput="Input mt-8"
                marginTop="24px"
                required={true}
                requiredMessage={this.props.t("customer.modal.input.required_message")}
                forcedValid={fieldIsValid.last_name}
                width="48%"
                marginLeft="4%"
              />
            </div>
            <div className="ModalContainerTwoColumns">
              <Select
                name="identification_type"
                label={this.props.t("customer.modal.select.identification_type-label")}
                handleValueValid={this.handleValueValid}
                handleValueChange={this.handleValueChange}
                value={customer.identification.type}
                options={optionsDocumentType}
                required={true}
                requiredMessage={this.props.t("customer.modal.select.required_message")}
                forcedValid={fieldIsValid.identification_type}
                width="48%"
                marginTop="24px"
                classSelect="Input mt-8"
              />
              <Input
                type="text"
                name="identification_number"
                label={this.props.t("customer.modal.input.identification_number-label")}
                placeholder={this.props.t("customer.modal.input.identification_number-placeholder")}
                value={customer.identification.number}
                handleValueChange={this.handleValueChange}
                handleValueValid={this.handleValueValid}
                classInput="Input mt-8"
                marginTop="24px"
                required={true}
                requiredMessage={this.props.t("customer.modal.input.required_message")}
                forcedValid={fieldIsValid.identification_number}
                width="48%"
                marginLeft="4%"
              />
            </div>
            <div className="ModalContainerTwoColumns">
              <Input
                type="text"
                name="phone"
                label={this.props.t("customer.modal.input.phone-label")}
                placeholder={this.props.t("customer.modal.input.phone-placeholder")}
                value={customer.phone}
                handleValueChange={this.handleValueChange}
                handleValueValid={this.handleValueValid}
                classInput="Input mt-8"
                marginTop="24px"
                required={true}
                requiredMessage={this.props.t("customer.modal.input.required_message")}
                forcedValid={fieldIsValid.phone}
                width="48%"
              />
              <Input
                type="text"
                name="email"
                label={this.props.t("customer.modal.input.email-label")}
                placeholder={this.props.t("customer.modal.input.email-placeholder")}
                value={customer.email}
                handleValueChange={this.handleValueChange}
                handleValueValid={this.handleValueValid}
                classInput="Input mt-8"
                marginTop="24px"
                required={true}
                requiredMessage={this.props.t("customer.modal.input.required_message")}
                forcedValid={fieldIsValid.email}
                width="48%"
                marginLeft="4%"
                validations={this.validationsEmailField}
              />
            </div>
            <div className="ModalContainerTwoColumns">
              <Select
                name="address_country"
                label={this.props.t("customer.modal.select.country-label")}
                handleValueValid={this.handleValueValid}
                handleValueChange={this.handleValueChangeCountry}
                value={customer.address.country}
                options={optionsCountry}
                required={true}
                requiredMessage={this.props.t("customer.modal.select.required_message")}
                forcedValid={fieldIsValid.address_country}
                width="48%"
                marginTop="24px"
                classSelect="Input mt-8"
              />
              <Select
                name="address_city"
                label={this.props.t("customer.modal.select.city-label")}
                handleValueValid={this.handleValueValid}
                handleValueChange={this.handleValueChange}
                value={customer.address.city}
                options={optionsCity}
                required={true}
                requiredMessage={this.props.t("customer.modal.select.required_message")}
                forcedValid={fieldIsValid.address_city}
                width="48%"
                marginTop="24px"
                classSelect="Input mt-8"
                marginLeft="4%"
              />
            </div>
            <div className="ModalContainerTwoColumns">
              <Select
                name="address_zone"
                label={this.props.t("customer.modal.select.zone-label")}
                handleValueValid={this.handleValueValid}
                handleValueChange={this.handleValueChange}
                value={customer.address.zone}
                options={optionsZone}
                required={true}
                requiredMessage={this.props.t("customer.modal.select.required_message")}
                forcedValid={fieldIsValid.address_zone}
                width="48%"
                marginTop="24px"
                classSelect="Input mt-8"
              />
              <Select
                name="seller_id"
                label={this.props.t("customer.modal.select.seller-label")}
                handleValueValid={this.handleValueValid}
                handleValueChange={this.handleValueChange}
                value={customer.seller_id}
                options={optionsSellers}
                required={true}
                requiredMessage={this.props.t("customer.modal.select.required_message")}
                forcedValid={fieldIsValid.seller_id}
                width="48%"
                marginTop="24px"
                classSelect="Input mt-8"
                marginLeft="4%"
              />
            </div>
            <div className="ModalContainerTwoColumns">
              <Input
                type="text"
                name="address_address"
                label={this.props.t("customer.modal.input.address-label")}
                placeholder={this.props.t("customer.modal.input.address-placeholder")}
                value={customer.address.address}
                handleValueChange={this.handleValueChange}
                handleValueValid={this.handleValueValid}
                classInput="Input mt-8"
                marginTop="24px"
                required={true}
                requiredMessage={this.props.t("customer.modal.input.required_message")}
                forcedValid={fieldIsValid.address_address}
                width="48%"
              />
              <Input
                type="text"
                name="address_postal_code"
                label={this.props.t("customer.modal.input.postal_code-label")}
                placeholder={this.props.t("customer.modal.input.postal_code-placeholder")}
                value={customer.address.postal_code}
                handleValueChange={this.handleValueChange}
                handleValueValid={this.handleValueValid}
                classInput="Input mt-8"
                marginTop="24px"
                width="48%"
                marginLeft="4%"
              />
            </div>
            <div>
              <button
                type="submit"
                className="ModalButton mt-32"
                onClick={this.handleSubmit}
              >
                {this.props.t("customer.modal.button")}
              </button>
            </div>
          </React.Fragment>
        </div>
      </Modal>
    );
  };
}

const mapStateToProps = (state: any) => ({
  token: state.login.token,
  sellers: state.seller.sellers,
  countries: state.country.countries,
  cities: state.country?.cities,
});

const mapDispatchToProps = {
  createCustomerFunc: createCustomer,
  getCitiesByCountryFunc: getCitiesByCountry,
  cleanCitiesFunc: cleanCities,
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation("global")(CreateCustomerModal));