import "./customers.scss";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../../utils/types";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { getAllCustomers } from "../../actions/customer";
import Header from "../../components/header/header.component";
import { Widget } from "../../components/widget/widget.component";
import { IconButton } from "@mui/material";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Customer, columns, noResultsOverlay } from "./customer";

export default function Customers() {
  const [sortModel, setSortModel] = React.useState<any>([]);

  const token = useSelector<GlobalState>(
    (state) => state.login.token
  ) as string;

  const customers = useSelector<GlobalState>(
    (state) => state.customer?.customers || []
  ) as { [index: number]: Customer};

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllCustomers(token));
  }, []);

  const handleActionClik = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log("clicked")
  }

  return (
    <div className="dashboard-main-container">
      <Header></Header>
      <div className="widget-container">
        <Widget
          icon={<AiOutlinePlusCircle />}
          description="Total de clientes"
          quantity={Object.values(customers).length.toString()}
          iconAction={handleActionClik}
          background
        />
      </div>
      <div className="table-header">
        <h2>Todos los clientes</h2>
        <div className="icon-container">
          <IconButton onClick={(event) => console.log("onClick from Edit")}>
              <BiEdit />
            </IconButton>
            <IconButton onClick={(event) => console.log("onClick from Delete")}>
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
          onRowClick={(event) => console.log("onRowClick")}
          onCellClick={(event) => console.log("onCellClick")}
          onRowSelectionModelChange={(event) => console.log("onRowSelectionModelChange")}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 25]}
        />
      </div>
    </div>
  )
}