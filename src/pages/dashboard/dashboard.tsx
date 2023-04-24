import './dashboard.scss'
import { connect } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import { SideTabs } from '../../components/sideTabs/sidetabs.component';
import Products from '../products/products';

interface DashboardPageProps {}

interface DashboardPageState {}

const Tab1 = () => <h1>Contenido de la pestaña 1</h1>;
const Tab2 = () => <h1>Contenido de la pestaña 2</h1>;
const Tab3 = () => <h1>Contenido de la pestaña 3</h1>;



const DashboardPage = () => {
  return (
    <div className="main-container">
      <div className="tabs-container">
        <SideTabs />
      </div>
      <div className="content-container">
        <Routes>
          <Route path="view1" element={<Tab1 />} />
          <Route path="view2" element={<Products />} />
          <Route path="view3" element={<Tab3 />} />
        </Routes>
      </div>
    </div>
  );
};

const mapStateToProps = (state: DashboardPageState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
