import { Customer } from "../pages/customers/customer";

export interface UserData {
  created_at: string;
  enabled: boolean;
  id: number;
  role: Roles;
  updated_at: string;
  user: string;
  verified: boolean;
};

export interface GlobalState {
  login: {
    userData: UserData;
    token: string;
  };
  product: {
    products: Product[];
  };
  customer: {
    customers: Customer[];
  };
};

export interface Category {
  description: string;
  id: string;
  name: string;
  products: Product[];
}

export enum Roles {
  ADMIN = "ADMIN",
  SELLER = "SELLER",
  TRANSPORTER = "TRANSPORTER",
  MARKETING = "MARKETING",
  CLIENT = "CLIENT",
};

export enum ProductType {
  PERISHABLE = "PERISHABLE",
  NONPERISHABLE = "NONPERISHABLE",
};

export enum Zone {
  ZONA_CENTRO = "ZONA CENTRO",
  ZONA_ESTE = "ZONA ESTE",
  ZONA_OESTE = "ZONA OESTE",
  ZONA_NORTE = "ZONA NORTE",
  ZONA_SUR = "ZONA SUR",
}

export enum DocumentType {
  PASAPORTE = "PASAPORTE",
  NIT = "NIT",
  DNI = "DNI",
  RUT = "RUT",
  CEDULA_DE_EXTRANJERIA = "CEDULA DE EXTRANJERIA",
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  array: number[];
  type: ProductType[];
  temperature_control: number;
  expiration_date: Date;
  fragility_conditions: string;
  description: string;
  status: boolean;
  price: number;
  img_url: string;
  suppliers: string;
  category: Record<string, any>;
};

export interface ProductCreate {
  name: string;
  description: string;
  type: string;
  categories: any;
  price: number;
  expiration_date?: string;
  dimensions?: string;
  temperature_control?: number;
  fragility_conditions?: string;
  status?: boolean;
  img_base64_data?: string | ArrayBuffer | null;
  suppliers?: [];
}

export interface Seller {
  id: string;
  name: string;
}
