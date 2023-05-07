import { IconButton, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { BsThreeDotsVertical } from "react-icons/bs";

export type Visit = {

};

export const defaultVisit: Visit = {

};

export const columns: GridColDef[] = [
  {
    field: "customer_name",
    headerName: "Cliente",
    flex: 2
  },
  {
    field: "date",
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