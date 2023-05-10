import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Order, defaultOrder, columns, noResultsOverlay } from "./order"
import { GlobalState } from "../../utils/types";
import { getAllOrders } from "../../actions/order";
import { DataGrid, GridEventListener } from "@mui/x-data-grid";
import Header from "../../components/header/header.component";
import { Widget } from "../../components/widget/widget.component";
import { IconButton } from "@mui/material";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import DetailOrderModal from "../../components/order/detailOrderModal";

export default function Orders() {
  const [sortModel, setSortModel] = React.useState<any>([]);
  const [openModalDetailOrder, setOpenModalDetailOrder] = React.useState<boolean>(false);
  const [orderSelected, setOrderSelected] = React.useState<Order>(defaultOrder);
  const token = useSelector<GlobalState>(
    (state) => state.login.token
  ) as string; 
  const orders = useSelector<GlobalState>(
    (state) => state.order.orders || []
  ) as { [index: number]: Order }

  const dispatch = useDispatch();
  React.useEffect(() => {
    //dispatch(getAllOrders(token));
  }, []);

  const handleRowClick: GridEventListener<'rowClick'> =
    (params) => {
      setOrderSelected(params.row);
      setOpenModalDetailOrder(!openModalDetailOrder);
  };

  const handleCloseModalDetailOrder = (
    event: React.MouseEvent<HTMLLIElement>
  ) => {
    event.preventDefault();
    setOpenModalDetailOrder(!openModalDetailOrder);
  }

  return (
    <div className="dashboard-main-container">
      <Header></Header>
      <div className="widget-container">
        <Widget
          description="Total de ordenes"
          quantity={Object.values(orders).length.toString()}
          background
        />
        <Widget 
          description="Ordenes entregadas"
          quantity="0"
        />
        <Widget 
          description="Ordenes pendientes por entregar"
          quantity="0"
        />
      </div>
      <div className="table-header">
        <h2>Todas las ordenes</h2>
        <div className="icon-container">
          <IconButton>
            <BiEdit />
          </IconButton>
          <IconButton>
            <RiDeleteBin6Line />
          </IconButton>
        </div>
      </div>
      <div className="table-container">
        <DataGrid
          rows={Object.values(orders) as Order[]}
          columns={columns}
          slots={{noRowsOverlay: noResultsOverlay}}
          sortModel={sortModel}
          onSortModelChange={(model => setSortModel(model))}
          checkboxSelection
          disableRowSelectionOnClick
          onRowClick={handleRowClick}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 }},
          }}
          pageSizeOptions={[5, 10, 25]}
        />
      </div>
      <DetailOrderModal 
        isOpen={true}
        handleCloseModal={handleCloseModalDetailOrder}
        order={orderSelected}
      />
    </div>
  );
};
