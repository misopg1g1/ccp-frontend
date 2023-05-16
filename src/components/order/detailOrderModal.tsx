import "./detailOrderModal.css";

import React from "react";
import { Order, columnsProduct, Item } from "../../pages/orders/order";
import Modal from "react-modal";
import Icons from "../../libs/icons";
import Input from "../../libs/input";
import { DataGrid } from "@mui/x-data-grid";

interface DetailOrderComponentProps {
  isOpen: boolean;
  handleCloseModal: (event: any) => void;
  order: Order;
}

interface DetailOrderComponentState {}

class DetailOrderModal extends React.Component<
  DetailOrderComponentProps,
  DetailOrderComponentState
> {
  constructor(props: DetailOrderComponentProps) {
    super(props);
  };

  render () {
    const { isOpen , handleCloseModal, order } = this.props;
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
            <span className="ModalTitle">Detalle de la orden</span>
            <div
              className="CloseModalButton"
              onClick={handleCloseModal}
              role="button"
              tabIndex={0}
            >
              <Icons icon="close" className="left-icon" color="#000000"/>
            </div>
          </div>
          <React.Fragment>
            <div className="ModalContainerTwoColumns mt-16">
              <Input
                type="text"
                name="customer"
                label="Cliente"
                value={order.customer.registered_name}
                classInput="ModalInput mt-8"
                marginTop="24px"
                disabled={true}
                width="48%"
              />
              <Input
                type="text"
                name="seller"
                label="Vendedor"
                value={`${order.seller.first_name} ${order.seller.last_name}`}
                classInput="ModalInput mt-8"
                marginTop="24px"
                disabled={true}
                width="48%"
                marginLeft="4%"
              />
            </div>
            <div className="ModalContainerTwoColumns mt-16">
              <Input
                type="text"
                name="grand_total"
                label="Valor de venta"
                value={order.grand_total}
                classInput="ModalInput mt-8"
                marginTop="24px"
                disabled={true}
                width="48%"
              />
              <Input
                type="text"
                name="discount"
                label="Descuento"
                value={order.discount.toString()}
                classInput="ModalInput mt-8"
                marginTop="24px"
                disabled={true}
                width="48%"
                marginLeft="4%"
              />
            </div>
            <div className="ModalContainerTwoColumns mt-16">
              <Input
                type="text"
                name="state"
                label="Estado"
                value={order.status}
                classInput="ModalInput mt-8"
                marginTop="24px"
                disabled={true}
                width="48%"
              />
              <Input
                type="text"
                name="date_delivered"
                label="Fecha de entrega"
                value={order.delivery_date}
                classInput="ModalInput mt-8"
                marginTop="24px"
                disabled={true}
                width="48%"
                marginLeft="4%"
              />
            </div>
            <div className="table-header-products-order">
              <label className='table-title-products'>
                  Productos
              </label>
            </div>
            <div className="table-container-modal">
              <DataGrid
                rows={Object.values(order.items) as Item[]}
                columns={columnsProduct}
                disableRowSelectionOnClick
                disableColumnMenu
                hideFooter
                columnHeaderHeight={30}
              />
            </div>
          </React.Fragment>
        </div>
      </Modal>
    );
  }
}

export default DetailOrderModal;