import {
  GridColDef,
} from "@mui/x-data-grid";
import Stack from '@mui/material/Stack';
import { IconButton } from "@mui/material";
import { BsThreeDotsVertical } from "react-icons/bs";

export type Customer = {
  name: string;
  identification: string;
  city: string;
  zone: string;
  seller: string;

};

export const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Nombre",
    flex: 2,
  },
  {
    field: "identification",
    headerName: "Identificación",
    flex: 2,
  },
  {
    field: "city",
    headerName: "Ciudad",
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
    )
  }
];

export const noResultsOverlay = () => {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      Aún no se han creado clientes!
    </Stack>
  );
}