import './dashboard.scss'
import React from "react";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import SideTabs from '../../components/sideTabs/sidetabs.component';
import Products from '../products/products';
import Message from '../../components/layout/messages/message';
import { cleanMessage } from '../../actions/message';
import getMessage from '../../utils/getMessage';

interface DashboardPageProps {
  cleanMessage: any
  message: any
}

interface DashboardPageState {
  message: any
}

const Tab1 = () => <h1>Contenido de la pestaña 1</h1>;
const Tab2 = () => <h1>Contenido de la pestaña 2</h1>;
const Tab3 = () => <h1>Contenido de la pestaña 3</h1>;

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
            message={getMessage(message)} 
            handleClose={cleanMessage}
          />
        }
        <Routes>
          <Route path="view1" element={<Tab1 />} />
          <Route path="products" element={<Products />} />
          <Route path="view3" element={<Tab2 />} />
          <Route path="view4" element={<Tab3 />} />
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
