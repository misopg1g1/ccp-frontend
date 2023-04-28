import React from "react";
import { Link } from "react-router-dom";
import "./sidetabs.scss";
import { BsCalculator } from "react-icons/bs";
import { AiOutlineInbox } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { RiSuitcaseLine } from "react-icons/ri";
import { BiExit } from "react-icons/bi";
import { RxGear } from "react-icons/rx";
import { Menu, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";
import { GlobalState, Roles, UserData } from "../../utils/types";
import { RoleWrapper } from "../role-wrapper/role-wrapper.component";

export const SideTabs = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!open) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    setAnchorEl(null);
  };
  const globalState = useSelector<GlobalState>(
    (state) => state.login.userData
  ) as UserData;
  return (
    <div className="side-tabs-container">
      <div className="title-container">
        <h1>CPP</h1>
      </div>
      <div className="profile-container">
        <div className="profile-circle">
          <CgProfile className="profile-default" />
        </div>
        <div className="user-name-container">
          <p>{globalState.user}</p>
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
        <div
          className="button-container"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            className="menu-container"
          >
            <RoleWrapper allowedRoles={[Roles.ADMIN]}>
              <MenuItem onClick={handleClose}>
                <CgProfile />
                Crear Usuario
              </MenuItem>
            </RoleWrapper>
            <MenuItem onClick={handleClose}>
              <BiExit />
              Salir
            </MenuItem>
          </Menu>
          <RxGear />
          <div className="link-container">
            <h2>Ajustes</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
