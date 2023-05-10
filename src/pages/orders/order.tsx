import { GridColDef } from "@mui/x-data-grid";
import { Customer, defaultCustomer } from "../customers/customer";
import { IconButton, Stack } from "@mui/material";
import { BsThreeDotsVertical } from "react-icons/bs";

export type Order = {
  id: string;
  customer: Customer;
  items: [];
  state: string;
};

export const defaultOrder: Order = {
  id: "",
  customer: defaultCustomer,
  items: [],
  state: ""
};

export const columns: GridColDef[] = [
  {
    field: "customer.registered_name",
    headerName: "Cliente",
    flex: 2,
    valueGetter: (params) => {
      return params.row.customer.registered_name;
    },
  },
  {
    field: "id",
    headerName: "Order ID",
    flex: 2,
  },
  {
    field: "grand_total",
    headerName: "Total venta",
    flex: 2,
  },
  {
    field: "items",
    headerName: "Items",
    flex: 2,
    valueGetter: (params) => {
      return params.row.items.lenght();
    }
  },
  {
    field: "state",
    headerName: "Estado",
    flex: 2,
  },
  {
    field: "actions",
    headerName: "",
    width: 5,
    sortable: false,
    disableColumnMenu: true,
    renderCell: () => (
      <IconButton>
        <BsThreeDotsVertical />
      </IconButton>
    ),
  },
];

export const noResultsOverlay = () => {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      Aún no se han generado ordenes!
    </Stack>
  )
}