import "./createCustomerModal.css";

import React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import Icons from "../../libs/icons";
import Input from "../../libs/input";
import Select from "../../libs/select";
import { Seller, DocumentType, Zone } from "../../utils/types";
import { Customer, FieldsRequired, defaultFieldsRequired, defaultCustomer, Address, IdentificationType } from "../../pages/customers/customer";
import { createCustomer } from "../../actions/customer";
import { getCitiesByCountry, cleanCities } from "../../actions/country";
import { emailRegex } from "../../utils/regex";

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
};

interface CreateCustomerComponentState {
  customer: Customer;
  fieldIsValid: FieldsRequired;
};

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
    const invalidFields = Object.entries(fieldIsValid).filter(([, value]) => value === false);
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
    };
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
      { value: "default", label: "Seleccione un tipo de documento" },
      { value: DocumentType.DNI, label: "Documento nacional de identidad" },
      { value: DocumentType.NIT, label: "Número de identificación tributaria" },
      { value: DocumentType.RUT, label: "Registro único tributario" },
      { value: DocumentType.CEDULA_DE_EXTRANJERIA, label: "Cedula de extranjeria" },
      { value: DocumentType.PASAPORTE, label: "Pasaporte" },
    ];
    const optionsZone = [
      { value: "default", label: "Seleccione una zona" },
      { value: Zone.ZONA_NORTE, label: "Norte" },
      { value: Zone.ZONA_ESTE, label: "Este" },
      { value: Zone.ZONA_CENTRO, label: "Centro" },
      { value: Zone.ZONA_OESTE, label: "Oeste" },
      { value: Zone.ZONA_SUR, label: "Sur" },
    ];
    const optionsCountry = [
      { value: "default", label: "Seleccione un país" },
    ].concat(
      Object.values(this.props.countries || []).map((country) => ({
        label: country,
        value: country,
      }))
    );
    const optionsCity = [
      { value: "default", label: "Seleccione una ciudad" },
    ].concat(
      Object.values(this.props.cities || []).map((city) => ({
        label: city,
        value: city,
      }))
    );
    const optionsSellers = [
      { value: "default", label: "Seleccione un vendedor" },
      { value: "seller 1", label: "Vendedor 1" },
      { value: "seller 2", label: "Vendedor 2" },
      { value: "seller 3", label: "Vendedor 3" },
      { value: "seller 4", label: "Vendedor 4" },
      { value: "seller 5", label: "Vendedor 5" },
    ].concat(
      Object.values(this.props.sellers || []).map((seller) => ({
        label: seller.name,
        value: seller.name,
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
            <span className="ModalTitle">Nuevo Cliente</span>
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
              label="Razón social"
              placeholder="Razón social del cliente"
              value={customer.registered_name}
              handleValueChange={this.handleValueChange}
              handleValueValid={this.handleValueValid}
              classInput="Input mt-8"
              marginTop="24px"
              required={true}
              requiredMessage="El campo es requerido"
              forcedValid={fieldIsValid.registered_name}
            />
            <div className="ModalContainerTwoColumns">
              <Input
                type="text"
                name="first_name"
                label="Nombres"
                placeholder="Nombres del contacto"
                value={customer.first_name}
                handleValueChange={this.handleValueChange}
                handleValueValid={this.handleValueValid}
                classInput="Input mt-8"
                marginTop="24px"
                required={true}
                requiredMessage="El campo es requerido"
                forcedValid={fieldIsValid.first_name}
                width="48%"
              />
              <Input
                type="text"
                name="last_name"
                label="Apellidos"
                placeholder="Apellidos del contacto"
                value={customer.last_name}
                handleValueChange={this.handleValueChange}
                handleValueValid={this.handleValueValid}
                classInput="Input mt-8"
                marginTop="24px"
                required={true}
                requiredMessage="El campo es requerido"
                forcedValid={fieldIsValid.last_name}
                width="48%"
                marginLeft="4%"
              />
            </div>
            <div className="ModalContainerTwoColumns">
              <Select
                name="identification_type"
                label="Tipo de documento"
                handleValueValid={this.handleValueValid}
                handleValueChange={this.handleValueChange}
                value={customer.identification.type}
                options={optionsDocumentType}
                required={true}
                requiredMessage="Debe seleccionar una opción"
                forcedValid={fieldIsValid.identification_type}
                width="48%"
                marginTop="24px"
                classSelect="Input mt-8"
              />
              <Input
                type="text"
                name="identification_number"
                label="Número"
                placeholder="Número de documento"
                value={customer.identification.number}
                handleValueChange={this.handleValueChange}
                handleValueValid={this.handleValueValid}
                classInput="Input mt-8"
                marginTop="24px"
                required={true}
                requiredMessage="El campo es requerido"
                forcedValid={fieldIsValid.identification_number}
                width="48%"
                marginLeft="4%"
              />
            </div>
            <div className="ModalContainerTwoColumns">
              <Input
                type="text"
                name="phone"
                label="Teléfono"
                placeholder="Teléfono de contacto"
                value={customer.phone}
                handleValueChange={this.handleValueChange}
                handleValueValid={this.handleValueValid}
                classInput="Input mt-8"
                marginTop="24px"
                required={true}
                requiredMessage="El campo es requerido"
                forcedValid={fieldIsValid.phone}
                width="48%"
              />
              <Input
                type="text"
                name="email"
                label="Email"
                placeholder="Email del contacto"
                value={customer.email}
                handleValueChange={this.handleValueChange}
                handleValueValid={this.handleValueValid}
                classInput="Input mt-8"
                marginTop="24px"
                required={true}
                requiredMessage="El campo es requerido"
                forcedValid={fieldIsValid.email}
                width="48%"
                marginLeft="4%"
                validations={this.validationsEmailField}
              />
            </div>
            <div className="ModalContainerTwoColumns">
              <Select
                name="address_country"
                label="País"
                handleValueValid={this.handleValueValid}
                handleValueChange={this.handleValueChangeCountry}
                value={customer.address.country}
                options={optionsCountry}
                required={true}
                requiredMessage="Debe seleccionar una opción"
                forcedValid={fieldIsValid.address_country}
                width="48%"
                marginTop="24px"
                classSelect="Input mt-8"
              />
              <Select
                name="address_city"
                label="Ciudad"
                handleValueValid={this.handleValueValid}
                handleValueChange={this.handleValueChange}
                value={customer.address.city}
                options={optionsCity}
                required={true}
                requiredMessage="Debe seleccionar una opción"
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
                label="Zona"
                handleValueValid={this.handleValueValid}
                handleValueChange={this.handleValueChange}
                value={customer.address.zone}
                options={optionsZone}
                required={true}
                requiredMessage="Debe seleccionar una opción"
                forcedValid={fieldIsValid.address_zone}
                width="48%"
                marginTop="24px"
                classSelect="Input mt-8"
              />
              <Select
                name="seller_id"
                label="Vendedor"
                handleValueValid={this.handleValueValid}
                handleValueChange={this.handleValueChange}
                value={customer.seller_id}
                options={optionsSellers}
                required={true}
                requiredMessage="Debe seleccionar una opción"
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
                label="Dirección"
                placeholder="Dirección de entrega"
                value={customer.address.address}
                handleValueChange={this.handleValueChange}
                handleValueValid={this.handleValueValid}
                classInput="Input mt-8"
                marginTop="24px"
                required={true}
                requiredMessage="El campo es requerido"
                forcedValid={fieldIsValid.address_address}
                width="48%"
              />
              <Input
                type="text"
                name="address_postal_code"
                label="Código postal"
                placeholder="Código postal"
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
                Guardar
              </button>
            </div>
          </React.Fragment>
        </div>
      </Modal>
    );
  };
};

const mapStateToProps = (state: any) => ({
  token: state.login.token,
  sellers: state.seller?.sellers,
  countries: state.country.countries,
  cities: state.country?.cities,
});

const mapDispatchToProps = {
  createCustomerFunc: createCustomer,
  getCitiesByCountryFunc: getCitiesByCountry,
  cleanCitiesFunc: cleanCities,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCustomerModal);