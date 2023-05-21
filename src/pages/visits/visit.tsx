import { IconButton, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Seller, defaultSeller } from "../../utils/types";
import { Customer, defaultCustomer } from "../customers/customer";
import { useTranslation } from "react-i18next";

export type Visit = {
  id?: string;
  visit_date: string;
  image_url: string;
  description: string;
  order_id: string;
  customer: Customer;
  seller: Seller;
};

export const defaultVisit: Visit = {
  visit_date: "",
  image_url: "",
  description: "",
  order_id: "",
  customer: defaultCustomer,
  seller: defaultSeller,
};

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
          {getTraduction("visit.dashboard.table.columns.customer")}
        </strong>
      )
    },
    flex: 2,
    valueGetter: (params) => {
      return params.row.customer.registered_name;
    },
  },
  {
    field: "visit_date",
    renderHeader: (): any => {
      return (
        <strong>
          {getTraduction("visit.dashboard.table.columns.date")}
        </strong>
      )
    },
    flex: 2,
  },
  {
    field: "order_id",
    renderHeader: (): any => {
      return (
        <strong>
          {getTraduction("visit.dashboard.table.columns.order_id")}
        </strong>
      )
    },
    flex: 2,
  },
  {
    field: "customer.address.zone",
    renderHeader: (): any => {
      return (
        <strong>
          {getTraduction("visit.dashboard.table.columns.zone")}
        </strong>
      )
    },
    flex: 2,
    valueGetter: (params) => {
      return params.row.customer.address.zone;
    },
  },
  {
    field: "seller",
    renderHeader: (): any => {
      return (
        <strong>
          {getTraduction("visit.dashboard.table.columns.seller")}
        </strong>
      )
    },
    flex: 2,
    valueGetter: (params) => {
      return `${params.row.seller.first_name} ${params.row.seller.last_name}`;
    },
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
        {getTraduction("visit.dashboard.table.results-overlay")}
      </Stack>
  );
}