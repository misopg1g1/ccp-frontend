import "./detailVisitModal.css";

import React from "react";
import { Visit } from "../../pages/visits/visit";
import Modal from "react-modal";
import Input from "../../libs/input";
import Icons from "../../libs/icons";
import { withTranslation } from "react-i18next";

interface DetailVisitComponentProps {
  isOpen: boolean;
  handleCloseModal: (event: any) => void;
  visit: Visit;
  t: any;
}

interface DetailVisitComponentState {}

class DetailVisitModal extends React.Component<
  DetailVisitComponentProps,
  DetailVisitComponentState
> {
  constructor(props: DetailVisitComponentProps) {
    super(props)
  };

  render () {
    const { isOpen, handleCloseModal, visit } = this.props;
    const customStyle = {
      overlay: {
        background: "rgba(0, 0, 0, 0.7)",
        maxHeight: "100vh",
        overflowY: "auto",
        zIndex: 5
      },
      content: {
        top: "10%",
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
            <span className="ModalTitle">
              {this.props.t("visit.modal.title")}
            </span>
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
            <img
              className="VisitImage mt-32"
              src={visit.image_url}
              alt={this.props.t("visit.modal.alt-img")}
            />
            <div className="ModalContainerTwoColumns mt-16">
              <Input
                type="text"
                name="date"
                label={this.props.t("visit.modal.input.date-label")}
                value={visit.visit_date}
                classInput="ModalInput mt-8"
                marginTop="24px"
                disabled={true}
                width="48%"
              />
              <Input
                type="text"
                name="seller"
                label={this.props.t("visit.modal.input.seller-label")}
                value={`${visit.seller.first_name} ${visit.seller.last_name}`}
                classInput="ModalInput mt-8"
                marginTop="24px"
                disabled={true}
                width="48%"
                marginLeft="4%"
              />
            </div>
            <Input
              type="text"
              name="customer"
              label={this.props.t("visit.modal.input.customer-label")}
              value={visit.customer.registered_name}
              classInput="ModalInput mt-8"
              disabled={true}
              marginTop="24px"
            />
            <div className="ModalContainerTwoColumns">
              <Input
                type="text"
                name="order_id"
                label={this.props.t("visit.modal.input.order_id-label")}
                value={visit.order_id}
                classInput="ModalInput mt-8"
                marginTop="24px"
                disabled={true}
                width="48%"
              />
              <Input
                type="text"
                name="zone"
                label={this.props.t("visit.modal.input.zone-label")}
                value={visit.customer.address.zone}
                classInput="ModalInput mt-8"
                marginTop="24px"
                disabled={true}
                width="48%"
                marginLeft="4%"
              />
            </div>
            <Input
              type="text"
              name="comments"
              label={this.props.t("visit.modal.input.comments-label")}
              value={visit.description}
              classInput="ModalInput mt-8"
              disabled={true}
              marginTop="24px"
            />
          </React.Fragment>
        </div>
      </Modal>
    );
  }
}


export default withTranslation("global")(DetailVisitModal);