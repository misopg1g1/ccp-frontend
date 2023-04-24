import { Link } from "react-router-dom";
import "./sidetabs.scss";
import { BsCalculator } from "react-icons/bs";
import { AiOutlineInbox } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { RiSuitcaseLine } from "react-icons/ri";
import { RxGear } from "react-icons/rx";

export const SideTabs = () => {
  return (
    <div className="side-tabs-container">
      <div className="title-container">
        <h1>CPP</h1>
      </div>
      <div className="profile-container">
        <div className="profile-circle"></div>
        <div className="user-name-container">
          <text>John Doe</text>
        </div>
      </div>
      <div className="list-container">
        <Link className="button-container" to="view1">
          <BsCalculator />
          <div className="link-container">
            <h2>CPP</h2>
          </div>
        </Link>
        <Link className="button-container" to="view2">
          <AiOutlineInbox />
          <div className="link-container">
            <h2>Productos</h2>
          </div>
        </Link>
        <Link className="button-container" to="view3">
          <CgProfile />
          <div className="link-container">
            <h2>Clientes</h2>
          </div>
        </Link>
        <Link className="button-container" to="view4">
          <RiSuitcaseLine />
          <div className="link-container">
            <h2>Visitas</h2>
          </div>
        </Link>
      </div>
      <div className="bottom-menu">
        <div className="button-container">
          <RxGear />
          <div className="link-container">
            <h2>Ajustes</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
