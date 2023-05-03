import "./createCustomerModal.css";

import React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import Icons from "../../libs/icons";
import Input from "../../libs/input";
import Select from "../../libs/select";
import { Seller } from "../../utils/types";
import { Customer, FieldsRequired } from "../../pages/customers/customer";
import { createCustomer } from "../../actions/customer";

interface CreateCustomerComponentProps {
  isOpen: boolean;
  handleCloseModal: (event: any) => void;
  createCustomerFunc: (customer: Customer | null, tokne: string) => void;
  token: string;
  sellers: Seller[];
};

interface CreateCustomerComponentState {
  customer: Customer | null;
  fieldIsValid: FieldsRequired | null;
};

class CreateCustomerModal extends React.Component<
  CreateCustomerComponentProps,
  CreateCustomerComponentState
> {
  constructor(props: CreateCustomerComponentProps) {
    super(props);
    this.state = {
      customer: null,
      fieldIsValid: null,
    };
  }

  formIsValid = (): boolean => {
    const { customer, ...fieldIsValid } = this.state;
    const isValid = [];
    Object.entries(fieldIsValid).forEach(([key, value]) => {
      console.log(key, ':', value);
    });
    return true;
  };

  handleCloseModal = (event: any) => {
    this.props.handleCloseModal(event);
    this.setState({customer: null});
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    if (!this.formIsValid) {
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
    const optionsCity = [
      { label: "Seleccione una ciudad", value: "default" },
      { label: "bogota", value: "Bogotá D.C." },
      { label: "medellin", value: "Medellin" },
    ]
    const optionsSellers = [
      { label: "Seleccione una vendedor", value: "default" },
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
              label="Nombre del producto"
              placeholder="Escribe el nombre del producto"
              value={customer?.registered_name}
              handleValueChange={this.handleValueChange}
              handleValueValid={this.handleValueValid}
              classInput="Input mt-8"
              marginTop="36px"
              required={true}
              requiredMessage="El campo es requerido"
              forcedValid={fieldIsValid?.registered_name}
            />
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