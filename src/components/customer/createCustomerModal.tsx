import "./createCustomerModal.css";

import React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import Icons from "../../libs/icons";
import Input from "../../libs/input";
import Select from "../../libs/select";
import { Seller } from "../../utils/types";
import { Customer, FieldsRequired, defaultFieldsRequired, defaultCustomer } from "../../pages/customers/customer";
import { createCustomer } from "../../actions/customer";

interface CreateCustomerComponentProps {
  isOpen: boolean;
  handleCloseModal: (event: any) => void;
  createCustomerFunc: (customer: Customer, tokne: string) => void;
  token: string;
  sellers: Seller[];
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
    const { customer, fieldIsValid } = this.state;
    const isValid = [];
    Object.entries(fieldIsValid).forEach(([key, value]) => {
      console.log(key, ':', value);
    });
    return true;
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

  handleValueChange = (name: string, value: string) => {
    this.setState({
      customer: {
        ...this.state.customer,
        [name]: value,
      },
      fieldIsValid: {
        ...this.state.fieldIsValid,
        [name]: false,
      }
    });
  };

  handleValueValid = (name: string, valid: boolean) => {
    this.setState({
      fieldIsValid: {
        ...this.state.fieldIsValid,
        [name]: valid,
      }
    })
  };

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
    const optionsIdType = [
      { value: "default", label: "Seleccione un tipo de documento" },
      { value: "CC", label: "Cedula de ciudadania" },
      { value: "RUT", label: "RUT" },
    ];
    const optionsCountry = [
      { value: "default", label: "Seleccione una ciudad" },
      { value: "BOG", label: "Bogotá D.C." },
      { value: "MED", label: "Medellin" },
    ];
    const optionsCity = [
      { value: "default", label: "Seleccione una país" },
      { value: "CO", label: "Colombia" },
      { value: "CL", label: "Chile" },
      { value: "AR", label: "Argentina" },
    ];
    const optionsSellers = [
      { value: "default", label: "Seleccione una vendedor" },
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
                name="last_names"
                label="Apellidos"
                placeholder="Apellidos del contacto"
                value={customer.last_name}
                handleValueChange={this.handleValueChange}
                handleValueValid={this.handleValueValid}
                classInput="Input mt-8"
                marginTop="24px"
                required={true}
                requiredMessage="El campo es requerido"
                forcedValid={fieldIsValid.identification_type}
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
                options={optionsIdType}
                required={true}
                requiredMessage="Debe seleccionar una opción"
                forcedValid={fieldIsValid.identification_type}
                width="48%"
                marginTop="24px"
                classSelect="Input mt-8"
              />
              <Input
                type="text"
                name="identification"
                label="Número"
                placeholder="Número de documento"
                value={customer.identification.number}
                handleValueChange={this.handleValueChange}
                handleValueValid={this.handleValueValid}
                classInput="Input mt-8"
                marginTop="24px"
                required={true}
                requiredMessage="El campo es requerido"
                forcedValid={fieldIsValid.identification}
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
              />
            </div>
            <div className="ModalContainerTwoColumns">
              <Select
                name="country"
                label="País"
                handleValueValid={this.handleValueValid}
                handleValueChange={this.handleValueChange}
                value={customer.country}
                options={optionsCountry}
                required={true}
                requiredMessage="Debe seleccionar una opción"
                forcedValid={fieldIsValid.country}
                width="48%"
                marginTop="24px"
                classSelect="Input mt-8"
              />
              <Select
                name="city"
                label="Ciudad"
                handleValueValid={this.handleValueValid}
                handleValueChange={this.handleValueChange}
                value={customer.city}
                options={optionsCity}
                required={true}
                requiredMessage="Debe seleccionar una opción"
                forcedValid={fieldIsValid.city}
                width="48%"
                marginTop="24px"
                classSelect="Input mt-8"
                marginLeft="4%"
              />
            </div>
            <div className="ModalContainerTwoColumns">
              <Select
                name="zone"
                label="Zona"
                handleValueValid={this.handleValueValid}
                handleValueChange={this.handleValueChange}
                value={customer.zone}
                options={optionsSellers}
                required={true}
                requiredMessage="Debe seleccionar una opción"
                forcedValid={fieldIsValid.zone}
                width="48%"
                marginTop="24px"
                classSelect="Input mt-8"
              />
              <Select
                name="city"
                label="Ciudad"
                handleValueValid={this.handleValueValid}
                handleValueChange={this.handleValueChange}
                value={customer.country}
                options={optionsCountry}
                required={true}
                requiredMessage="Debe seleccionar una opción"
                forcedValid={fieldIsValid.country}
                width="48%"
                marginTop="24px"
                classSelect="Input mt-8"
                marginLeft="4%"
              />
            </div>
            <div className="ModalContainerTwoColumns">
              <Input
                type="text"
                name="address"
                label="Dirección"
                placeholder="Dirección de entrega"
                value={customer.address}
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
                name="postal_code"
                label="Código postal"
                placeholder="Código postal"
                value={customer.postal_code}
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
  sellers: state.seller?.sellers
});

const mapDispatchToProps = {
  createCustomerFunc: createCustomer,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCustomerModal);