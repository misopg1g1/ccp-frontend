import {
  GridColDef,
} from "@mui/x-data-grid";
import Stack from '@mui/material/Stack';
import { IconButton } from "@mui/material";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useTranslation } from "react-i18next";

export type Product = {
  id: string;
  name: string;
  sku: string;
  temperature_control: number;
  expiration_date: Date;
  fragility_conditions: string;
  description: string;
  status: boolean;
  price: number;
  img_url: string;
  suppliers: string;
  categories: {
    id: string;
    name: string;
    description: string;
    status: boolean;
  }[];
};

const getTraduction = (key: string) => {
  const [t] = useTranslation("global");
  return t(key)
}

export const columns: GridColDef[] = [
  {
    field: "img_url",
    renderHeader: (): any => {
      return (
        <strong>
          {getTraduction("product.dashboard.table.columns.img")}
        </strong>
      )
    },
    width: 100,
    renderCell: (params) => (
      <img
        src={params.value as string}
        alt="product"
        style={{ width: "50px", height: "50px" }}
      />
    ),
    sortable: false,
    disableColumnMenu: true,
  },
  { 
    field: "name",
    renderHeader: (): any => {
      return (
        <strong>
          {getTraduction("product.dashboard.table.columns.name")}
        </strong>
      )
    },
    flex: 2
  },
  {
    field: "sku",
    renderHeader: (): any => {
      return (
        <strong>
          {getTraduction("product.dashboard.table.columns.sku")}
        </strong>
      )
    },
    flex: 2
  },
  {
    field: "categories",
    renderHeader: (): any => {
      return (
        <strong>
          {getTraduction("product.dashboard.table.columns.category")}
        </strong>
      )
    },
    flex: 2,
    valueGetter: (params) => {
      const names = (params.value as Product["categories"]).map(
        (category) => category.name
      );
      let resultConcat = "";
      names.forEach(
        (name) => (resultConcat = resultConcat.concat(` ${name} `))
      );
      return resultConcat;
    },
  },
  {
    field: "stock",
    renderHeader: (): any => {
      return (
        <strong>
          {getTraduction("product.dashboard.table.columns.stock")}
        </strong>
      )
    },
    flex: 1,
    valueGetter: (params) => {
      return params.value ? params.value : 0;
    },
  },
  {
    field: "status",
    renderHeader: (): any => {
      return (
        <strong>
          {getTraduction("product.dashboard.table.columns.status")}
        </strong>
      )
    },
    flex: 1,
    valueGetter: (params) => (params.value ? "Activo" : "Inactivo"),
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
      Aún no se han creado productos!
    </Stack>
  );
}