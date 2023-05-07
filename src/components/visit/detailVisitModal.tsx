import "./detailVisitModal.css";

import React from "react";
import { Visit } from "../../pages/visits/visit";
import { connect } from "react-redux";

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
  }
  render () {
    return (
      <div></div>
    );
  }
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DetailVisitModal);