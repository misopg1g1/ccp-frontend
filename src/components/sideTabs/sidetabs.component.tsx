import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./sidetabs.scss";
import { BsCalculator } from "react-icons/bs";
import { AiOutlineInbox } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { RiSuitcaseLine } from "react-icons/ri";
import { BiExit } from "react-icons/bi";
import { RxGear } from "react-icons/rx";
import { Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector, connect } from "react-redux";
import { GlobalState, Roles, UserData } from "../../utils/types";
import { RoleWrapper } from "../role-wrapper/role-wrapper.component";
import { logout } from "../../actions/login";
import useLogin from '../../hooks/useLogin';
import CreateUserModal from "../user/createUserModal";
import { deleteUserData } from "../../actions/user";

interface SideTabsComponentProps {
  deleteUserDataFunc: any
}

const SideTabs = (props: SideTabsComponentProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openModalCreateUser, setOpenModalCreateUser] = React.useState<false | boolean>(false);
  const open = Boolean(anchorEl);
  const { deleteUserDataFunc } = props;
  const { token }  = useLogin();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!open) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    setAnchorEl(null);
  };

  const handleLogout = (event: React.MouseEvent<HTMLLIElement>) => {
    dispatch(logout());
    navigation("/");
    handleClose(event);
  };

  const openModalUser = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault()
    setAnchorEl(null)
    setOpenModalCreateUser(!openModalCreateUser)
  }

  const toogleCreateUserModal = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault()
    setOpenModalCreateUser(!openModalCreateUser)
    deleteUserDataFunc()
  }

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
              <MenuItem onClick={openModalUser}>
                <CgProfile />
                Crear Usuario
              </MenuItem>
            </RoleWrapper>
            <MenuItem onClick={handleLogout}>
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
      <CreateUserModal
        isOpen={openModalCreateUser}
        handleCloseModal={toogleCreateUserModal}
        token={token}
      />
    </div>
  );
};

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  deleteUserDataFunc: deleteUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(SideTabs)