import { GridColDef } from "@mui/x-data-grid";
import { Customer, defaultCustomer } from "../customers/customer";
import { IconButton, Stack } from "@mui/material";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Seller, defaultSeller } from "../../utils/types";

export type Order = {
  id: string;
  state: string;
  grand_total: number;
  discount: number;
  delivery_date: string;
  seller: Seller;
  customer: Customer;
  items: Item[];
};

export const defaultOrder: Order = {
  id: "",
  state: "",
  grand_total: 0,
  discount: 0,
  delivery_date: "",
  customer: defaultCustomer,
  seller: defaultSeller,
  items: [],
};

export type Item = {
  product_id: string;
  product_name: string;
  quantity: number;
}

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

export const columnsProduct: GridColDef[] = [
  {
    field: "product_name",
    headerName: "Producto",
    flex: 2,
    sortable: false,
  },
  {
    field: "product_id",
    headerName: "Producto ID",
    flex: 2,
    sortable: false,
  },
  {
    field: "quantity",
    headerName: "Cantidad",
    flex: 2,
    sortable: false,
  },
]; 

export const noResultsOverlay = () => {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      Aún no se han generado ordenes!
    </Stack>
  )
}