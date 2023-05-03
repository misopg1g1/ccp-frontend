import {
  GridColDef,
} from "@mui/x-data-grid";
import Stack from '@mui/material/Stack';
import { IconButton } from "@mui/material";
import { BsThreeDotsVertical } from "react-icons/bs";

export type IdentificationType = {
  number: string,
  type: string,
}

export type Customer = {
  registered_name: string;
  first_name: string;
  last_name: string;
  identification_type: IdentificationType;
  identification: string;
  phone: string;
  email: string;
  country: string;
  city: string;
  zone: string;
  seller: string;
  address: string;
  postal_code?: string;
};

export type FieldsRequired = {
  registered_name: boolean,
  first_name: boolean;
  last_name: boolean;
  identification_type: boolean;
  identification: boolean;
  phone: boolean;
  email: boolean
  country: boolean;
  city: boolean;
  zone: boolean;
  seller: boolean;
  address: boolean;
}

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