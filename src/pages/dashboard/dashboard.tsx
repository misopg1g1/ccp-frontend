import './dashboard.scss'
import React from "react";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import SideTabs from '../../components/sideTabs/sidetabs.component';
import Products from '../products/products';
import Message from '../../components/layout/messages/message';
import { cleanMessage } from '../../actions/message';
import Customers from '../customers/customers';
import Visits from '../visits/visits';
import Orders from '../orders/orders';

interface DashboardPageProps {
  cleanMessage: any
  message: any
}

interface DashboardPageState {
  message: any
}

const Tab1 = () => <h1>Contenido de la pestaña 1</h1>;

const DashboardPage = (props: DashboardPageProps) => {
  const { cleanMessage, message } = props

  return (
    <div className="main-container">
      <div className="tabs-container">
        <SideTabs />
      </div>
      <div className="content-container">
        {message && 
          <Message
            message={message} 
            handleClose={cleanMessage}
          />
        }
        <Routes>
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="customers" element={<Customers />} />
          <Route path="visits" element={<Visits />} />
        </Routes>
      </div>
    </div>
  );
};

const mapStateToProps = (state: DashboardPageState) => ({
  message: state.message.message,   
});

const mapDispatchToProps = {
  cleanMessage: cleanMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
