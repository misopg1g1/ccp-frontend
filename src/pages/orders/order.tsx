import { GridColDef } from "@mui/x-data-grid";
import { Customer, defaultCustomer } from "../customers/customer";
import { IconButton, Stack } from "@mui/material";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Seller, defaultSeller } from "../../utils/types";
import { useTranslation } from "react-i18next";

export type Order = {
  id: string;
  status: string;
  grand_total: number;
  discount: number;
  delivery_date: string;
  seller: Seller;
  customer: Customer;
  items: Item[];
};

export const defaultOrder: Order = {
  id: "",
  status: "",
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

const getTraduction = (key: string) => {
  const [t] = useTranslation("global");
  return t(key)
}

export const columns: GridColDef[] = [
  {
    field: "customer.registered_name",
    renderHeader: (): any => {
      return (
        <strong>
          {getTraduction("order.dashboard.table.columns.customer_name")}
        </strong>
      )
    },
    flex: 2,
    valueGetter: (params) => {
      return params.row.customer.registered_name;
    },
  },
  {
    field: "id",
    renderHeader: (): any => {
      return (
        <strong>
          {getTraduction("order.dashboard.table.columns.id")}
        </strong>
      )
    },
    flex: 2,
  },
  {
    field: "grand_total",
    renderHeader: (): any => {
      return (
        <strong>
          {getTraduction("order.dashboard.table.columns.grand_total")}
        </strong>
      )
    },
    flex: 2,
  },
  {
    field: "items",
    renderHeader: (): any => {
      return (
        <strong>
          {getTraduction("order.dashboard.table.columns.items")}
        </strong>
      )
    },
    flex: 2,
    valueGetter: (params) => {
      return params.row.items.length;
    }
  },
  {
    field: "status",
    renderHeader: (): any => {
      return (
        <strong>
          {getTraduction("order.dashboard.table.columns.status")}
        </strong>
      )
    },
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
    renderHeader: (): any => {
      return (
        <strong>
          {getTraduction("order.modal.products.table.columns.name")}
        </strong>
      )
    },
    flex: 2,
    sortable: false,
  },
  {
    field: "product_id",
    renderHeader: (): any => {
      return (
        <strong>
          {getTraduction("order.modal.products.table.columns.id")}
        </strong>
      )
    },
    flex: 2,
    sortable: false,
  },
  {
    field: "quantity",
    renderHeader: (): any => {
      return (
        <strong>
          {getTraduction("order.modal.products.table.columns.quantity")}
        </strong>
      )
    },
    flex: 2,
    sortable: false,
  },
]; 

export const noResultsOverlay = () => {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      {getTraduction("order.dashboard.table.results-overlay")}
    </Stack>
  )
}