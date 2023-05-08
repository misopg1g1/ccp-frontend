import "./detailVisitModal.css";

import React from "react";
import { Visit } from "../../pages/visits/visit";
import { connect } from "react-redux";
import Modal from "react-modal";
import Input from "../../libs/input";

interface DetailVisitComponentProps {
  isOpen: boolean;
  handleCloseModal: (event: any) => void;
  visit: Visit;
}

interface DetailVisitComponentState {};

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
            <span className="ModalTitle">Detalle de la visita</span>
            <div
              className="CloseModalButton"
              onClick={handleCloseModal}
              role="button"
              tabIndex={0}
            >
            </div>
          </div>
          <React.Fragment>
            <img
              className="VisitImage"
              src={visit.img_url}
              alt={'Imagen de la visita'}
            />
            <div className="ModalContainerTwoColumns">
              <Input
                type="text"
                name="date"
                label="Fecha"
                value={visit.date}
                classInput="ModalInput mt-8"
                marginTop="24px"
                disabled={true}
                width="48%"
              />
              <Input
                type="text"
                name="seller"
                label="Vendedor"
                value={visit.seller}
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
              label="Cliente"
              value={visit.customer}
              classInput="ModalInput mt-8"
              disabled={true}
              marginTop="24px"
            />
            <div className="ModalContainerTwoColumns">
              <Input
                type="text"
                name="order_id"
                label="Orden ID"
                value={visit.order_id}
                classInput="ModalInput mt-8"
                marginTop="24px"
                disabled={true}
                width="48%"
              />
              <Input
                type="text"
                name="zone"
                label="Zona"
                value={visit.zone}
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
              label="Comentarios"
              value={visit.comments}
              classInput="ModalInput mt-8"
              disabled={true}
              marginTop="24px"
            />
          </React.Fragment>
        </div>
      </Modal>
    );
  }
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DetailVisitModal);