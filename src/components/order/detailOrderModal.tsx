import "./detailOrderModal.css";

import React from "react";
import { Order } from "../../pages/orders/order";

interface DetailOrderComponentProps {
  isOpen: boolean;
  handleCloseModal: (event: any) => void;
  order: Order;
};

interface DetailOrderComponentState {};

class DetailOrderModal extends React.Component<
  DetailOrderComponentProps,
  DetailOrderComponentState
> {
  constructor(props: DetailOrderComponentProps) {
    super(props);
  };

  render () {
    return (
      <div></div>
    );
  }
};

export default DetailOrderModal;