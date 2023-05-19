import "./customers.scss";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState, Roles } from "../../utils/types";
import { DataGrid, GridEventListener } from "@mui/x-data-grid";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { getAllCustomers } from "../../actions/customer";
import Header from "../../components/header/header.component";
import { Widget } from "../../components/widget/widget.component";
import { IconButton } from "@mui/material";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Customer, columns, defaultCustomer, noResultsOverlay } from "./customer";
import CreateCustomerModal from "../../components/customer/createCustomerModal";
import { getAllCountries } from "../../actions/country";
import { getAllSellers } from "../../actions/seller";
import DetailCustomerModal from "../../components/customer/detailCustomerModal";
import { RoleWrapper } from "../../components/role-wrapper/role-wrapper.component";

export default function Customers() {
  const [sortModel, setSortModel] = React.useState<any>([]);
  const [openModalCreateCustomer, setOpenModalCreateCustomer] = React.useState<boolean>(false);
  const [openModalDetailCustomer, setOpenModalDetailCustomer] = React.useState<boolean>(false);
  const [customerSelected, setCustomerSelected] = React.useState<Customer>(defaultCustomer);

  const token = useSelector<GlobalState>(
    (state) => state.login.token
  ) as string;

  const customers = useSelector<GlobalState>(
    (state) => state.customer.customers || {}
  ) as { [index: number]: Customer};

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllCustomers(token));
    dispatch(getAllSellers(token));
    dispatch(getAllCountries());
  }, []);

  const handleClicNewCustomer = (event: any) => {
    event.preventDefault();
    setOpenModalCreateCustomer(!openModalCreateCustomer);
  };

  const handleCloseModalCreateCustomer = (event: any) => {
    event.preventDefault();
    setOpenModalCreateCustomer(!openModalCreateCustomer);
  };

  const handleCloseModalDetailCustomer = (
    event: React.MouseEvent<HTMLLIElement>
  ) => {
    event.preventDefault();
    setOpenModalDetailCustomer(!openModalDetailCustomer);
  }

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    setCustomerSelected(params.row);
    setOpenModalDetailCustomer(!openModalDetailCustomer);
  };

  return (
    <div className="dashboard-main-container">
      <Header></Header>
      <div className="widget-container">
        <Widget
          icon={<AiOutlinePlusCircle />}
          description="Total de clientes"
          quantity={Object.values(customers).length.toString()}
          iconAction={handleClicNewCustomer}
          background
        />
      </div>
      <div className="table-header">
        <h2>Todos los clientes</h2>
        <div className="icon-container">
          <IconButton onClick={() => console.log("onClick from Edit")}>
              <BiEdit />
            </IconButton>
            <IconButton onClick={() => console.log("onClick from Delete")}>
              <RiDeleteBin6Line />
          </IconButton>
        </div>
      </div>
      <div className="table-container">
        <DataGrid 
          rows={ Object.values(customers) }
          columns={columns}
          slots={{noRowsOverlay: noResultsOverlay}}
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
          checkboxSelection
          disableRowSelectionOnClick
          onRowClick={handleRowClick}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 25]}
        />
      </div>
      <CreateCustomerModal 
        isOpen={openModalCreateCustomer}
        handleCloseModal={handleCloseModalCreateCustomer}
      />
      <RoleWrapper allowedRoles={[Roles.ADMIN, Roles.SELLER, Roles.MARKETING]}>
        <DetailCustomerModal
          isOpen={openModalDetailCustomer}
          handleCloseModal={handleCloseModalDetailCustomer}
          customer={customerSelected}
        />    
      </RoleWrapper>
    </div>
  )
}