import "./detailCustomerModal.css";

import React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import Icons from "../../libs/icons";
import Input from "../../libs/input";
import { Customer } from "../../pages/customers/customer";
import { withTranslation } from "react-i18next";

interface DetailCustomerComponentProps {
  isOpen: boolean;
  handleCloseModal: (event: any) => void;
  customer: Customer;
  t: any;
}

interface DetailCustomerComponentState {}

class DetailCustomerModal extends React.Component<
  DetailCustomerComponentProps,
  DetailCustomerComponentState
> {
  constructor(props: DetailCustomerComponentProps) {
    super(props);
  };

  render() {
    const { isOpen, handleCloseModal, customer } = this.props;
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

    return (
      <Modal 
        isOpen={isOpen}
        onRequestClose={handleCloseModal}
        style={customStyle}
        ariaHideApp={false}
      >
        <div className="ContentModal">
          <div>
            <span className="ModalTitle">{customer.registered_name}</span>
            <div
              className="CloseModalButton"
              onClick={handleCloseModal}
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
              value={customer.registered_name}
              classInput="ModalInput mt-8"
              disabled={true}
              marginTop="24px"
            />
            <div className="ModalContainerTwoColumns">
              <Input
                type="text"
                name="first_name"
                label={this.props.t("customer.modal.input.first_name-label")}
                value={customer.first_name}
                classInput="ModalInput mt-8"
                marginTop="24px"
                disabled={true}
                width="48%"
              />
              <Input
                type="text"
                name="last_name"
                label={this.props.t("customer.modal.input.last_name-label")}
                value={customer.last_name}
                classInput="ModalInput mt-8"
                marginTop="24px"
                disabled={true}
                width="48%"
                marginLeft="4%"
              />
            </div>
            <div className="ModalContainerTwoColumns">
              <Input
                type="text"
                name="identification_type"
                label={this.props.t("customer.modal.select.identification_type-label")}
                value={customer.identification.type}
                classInput="ModalInput mt-8"
                disabled={true}
                width="48%"
                marginTop="24px"
              />
              <Input
                type="text"
                name="identification_number"
                label={this.props.t("customer.modal.input.identification_number-label")}
                value={customer.identification.number}
                classInput="ModalInput mt-8"
                marginTop="24px"
                width="48%"
                marginLeft="4%"
                disabled={true}
              />
            </div>
            <div className="ModalContainerTwoColumns">
              <Input
                type="text"
                name="phone"
                label={this.props.t("customer.modal.input.phone-label")}
                value={customer.phone}
                classInput="ModalInput mt-8"
                marginTop="24px"
                width="48%"
                disabled={true}
              />
              <Input
                type="text"
                name="email"
                label={this.props.t("customer.modal.input.email-label")}
                value={customer.email}
                classInput="ModalInput mt-8"
                marginTop="24px"
                width="48%"
                marginLeft="4%"
                disabled={true}
              />
            </div>
            <div className="ModalContainerTwoColumns">
              <Input
                type="text"
                name="address_country"
                label={this.props.t("customer.modal.select.country-label")}
                value={customer.address.country}
                width="48%"
                marginTop="24px"
                classInput="ModalInput mt-8"
                disabled={true}
              />
              <Input
                type="text"
                name="address_city"
                label={this.props.t("customer.modal.select.city-label")}
                value={customer.address.city}
                width="48%"
                marginTop="24px"
                classInput="ModalInput mt-8"
                marginLeft="4%"
                disabled={true}
              />
            </div>
            <div className="ModalContainerTwoColumns">
              <Input
                type="text"
                name="address_zone"
                label={this.props.t("customer.modal.select.zone-label")}
                value={customer.address.zone}
                width="48%"
                marginTop="24px"
                classInput="ModalInput mt-8"
                disabled={true}
              />
              <Input
                type="text"
                name="seller_id"
                label={this.props.t("customer.modal.select.seller-label")}
                value={customer.seller_name}
                width="48%"
                marginTop="24px"
                classInput="ModalInput mt-8"
                marginLeft="4%"
                disabled={true}
              />
            </div>
            <div className="ModalContainerTwoColumns">
              <Input
                type="text"
                name="address_address"
                label={this.props.t("customer.modal.input.address-label")}
                value={customer.address.address}
                classInput="ModalInput mt-8"
                marginTop="24px"
                width="48%"
                disabled={true}
              />
              <Input
                type="text"
                name="address_postal_code"
                label={this.props.t("customer.modal.input.postal_code-label")}
                value={customer.address.postal_code}
                classInput="ModalInput mt-8"
                marginTop="24px"
                width="48%"
                marginLeft="4%"
                disabled={true}
              />
            </div>
          </React.Fragment>
        </div>
      </Modal>
    );
  };
}

const mapStateToProps = (state: any) => ({
  token: state.login.token,
  sellers: state.seller?.sellers,
  countries: state.country.countries,
  cities: state.country?.cities,
});

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation("global")(DetailCustomerModal));