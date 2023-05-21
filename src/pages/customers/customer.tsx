import {
  GridColDef,
} from "@mui/x-data-grid";
import Stack from '@mui/material/Stack';
import { IconButton } from "@mui/material";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Zone } from "../../utils/types";
import { useTranslation } from "react-i18next";

export type IdentificationType = {
  number: string,
  type: string,
};

export type Address = {
  address: string,
	postal_code?: string,
	city: string,
	country: string,
  zone: Zone | string,
};

export type Customer = {
  registered_name: string;
  first_name: string;
  last_name: string;
  identification: IdentificationType;
  seller_id: string;
  seller_name?: string
  address: Address;
  phone: string,
	email: string,
};

const defaultIdentificationType: IdentificationType = {
  number: '',
  type: 'default',
}

const defaultAddres: Address = {
  country: 'default',
  city: 'default',
  zone: 'default',
  address: '',
  postal_code: '',
}

export const defaultCustomer: Customer = {
  registered_name: '',
  first_name: '',
  last_name: '',
  identification: defaultIdentificationType,
  seller_id: 'default',
  address: defaultAddres,
  phone: '',
	email: '',
}

export type FieldsRequired = {
  registered_name: boolean,
  first_name: boolean;
  last_name: boolean;
  identification_type: boolean;
  identification_number: boolean;
  phone: boolean;
  email: boolean;
  seller_id: boolean;
  address_country: boolean;
  address_city: boolean;
  address_zone: boolean;
  address_address: boolean;
}

export const defaultFieldsRequired: FieldsRequired = {
    registered_name: true,
    first_name: true,
    last_name: true,
    identification_type: true,
    identification_number: true,
    phone: true,
    email: true,
    seller_id: true,
    address_country: true,
    address_city: true,
    address_zone: true,
    address_address: true,
};

const getTraduction = (key: string) => {
  const [t] = useTranslation("global");
  return t(key)
}

export const columns: GridColDef[] = [
  {
    field: "registered_name",
    renderHeader: (): any => {
      return (
        <strong>
          {getTraduction("customer.dashboard.table.columns.name")}
        </strong>
      )
    },
    flex: 2,
  },
  {
    field: "identification",
    renderHeader: (): any => {
      return (
        <strong>
          {getTraduction("customer.dashboard.table.columns.identification")}
        </strong>
      )
    },
    flex: 2,
    valueGetter: (params) => {
      return (params.value as Customer["identification"]).number;
    },
  },
  {
    field: "address.city",
    renderHeader: (): any => {
      return (
        <strong>
          {getTraduction("customer.dashboard.table.columns.city")}
        </strong>
      )
    },
    flex: 2,
    valueGetter: (params) => {
      return `${params.row.address.city}`;
    },
  },
  {
    field: "address.zone",
    renderHeader: (): any => {
      return (
        <strong>
          {getTraduction("customer.dashboard.table.columns.zone")}
        </strong>
      )
    },
    flex: 2,
    valueGetter: (params) => {
      return `${params.row.address.zone}`;
    }
  },
  {
    field: "seller_name",
    renderHeader: (): any => {
      return (
        <strong>
          {getTraduction("customer.dashboard.table.columns.seller")}
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
    )
  }
];

export const noResultsOverlay = () => {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      {getTraduction("customer.dashboard.table.results-overlay")}
    </Stack>
  );
}