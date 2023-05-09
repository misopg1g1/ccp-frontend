import { IconButton, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Seller, defaultSeller } from "../../utils/types";

export type Visit = {
  id?: string;
  visit_date: string;
  image_url: string;
  description: string;
  order_id: string;
  customer_id: string;
  zone: string;
  seller: Seller;
};

export const defaultVisit: Visit = {
  visit_date: "",
  image_url: "",
  description: "",
  order_id: "",
  customer_id: "",
  zone: "",
  seller: defaultSeller,
};

export const columns: GridColDef[] = [
  {
    field: "customer_id",
    headerName: "Cliente",
    flex: 2
  },
  {
    field: "visit_date",
    headerName: "Fecha",
    flex: 2,
  },
  {
    field: "order_id",
    headerName: "Order ID",
    flex: 2,
  },
  {
    field: "zone",
    headerName: "Zona",
    flex: 2,
  },
  {
    field: "seller",
    headerName: "Vendedor",
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
        Aún no se han generado visitas!
      </Stack>
  );
}