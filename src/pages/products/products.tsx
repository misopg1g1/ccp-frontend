import * as React from "react";
import Header from "../../components/header/header.component";
import { Widget } from "../../components/widget/widget.component";
import { AiOutlinePlusCircle } from "react-icons/ai";
import "./products.scss";
import { useSelector } from "react-redux";
import { GlobalState } from "../../utils/types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { BsThreeDotsVertical } from "react-icons/bs";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const columns: GridColDef[] = [
  {
    field: "img_url",
    headerName: "Imagen",
    width: 150,
    renderCell: (params) => (
      <img
        src={params.value as string}
        alt="product"
        style={{ width: "50px", height: "50px" }}
      />
    ),
  },
  { field: "name", headerName: "Nombre", width: 200 },
  { field: "sku", headerName: "SKU", width: 150 },
  {
    field: "category",
    headerName: "Categoría",
    width: 150,
    valueGetter: (params) => params.value.name,
  },
  {
    field: "status",
    headerName: "Estado",
    width: 150,
    valueGetter: (params) => (params.value ? "Activo" : "Inactivo"),
  },
  {
    field: "actions",
    headerName: "",
    sortable: false,
    width: 120,
    renderCell: () => (
      <IconButton>
        <BsThreeDotsVertical />
      </IconButton>
    ),
  },
];

export default function Products() {
  const [sortModel, setSortModel] = React.useState<any>([]);
  const productsMap = useSelector<GlobalState>(
    (state) => state.product.products
  ) as {}
  const products: Product[] = Object.values(productsMap)

  return (
    <div className="product-main-container">
      <Header></Header>
      <div className="widget-container">
        <Widget
          icon={<AiOutlinePlusCircle />}
          description="Total de Productos"
          quantity={Object.values(products).length.toString()}
          iconAction={(event) => console.log("clicked")}
          background
        />
        <Widget
          icon={<AiOutlinePlusCircle />}
          description="Categorias"
          quantity="3"
          iconAction={(event) => console.log("clicked")}
        />
        <Widget
          icon={<AiOutlinePlusCircle />}
          description="Bodegas"
          quantity="1"
          iconAction={(event) => console.log("clicked")}
        />
      </div>
      <div className="table-container">
        <DataGrid
          rows={products}
          columns={columns}
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
          checkboxSelection
        />
      </div>
    </div>
  );
}

type Product = {
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
};
