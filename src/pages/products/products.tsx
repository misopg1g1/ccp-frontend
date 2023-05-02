import * as React from "react";
import Header from "../../components/header/header.component";
import { Widget } from "../../components/widget/widget.component";
import { AiOutlinePlusCircle } from "react-icons/ai";
import "./products.scss";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../../utils/types";
import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
  GridCallbackDetails,
} from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getAllProducts } from "../../actions/product";
import CreateProductModal from "../../components/product/createProductModal";
import AddInventoryModal from "../../components/inventory/addInventoryModal";
import DetailProductModal from "../../components/product/detailProductModal";
import { getAllCategories } from "../../actions/category";

const columns: GridColDef[] = [
  {
    field: "img_url",
    headerName: "Imagen",
    flex: 2,
    renderCell: (params) => (
      <img
        src={params.value as string}
        alt="product"
        style={{ width: "50px", height: "50px" }}
      />
    ),
  },
  { field: "name", headerName: "Nombre", flex: 2 },
  { field: "sku", headerName: "SKU", flex: 2 },
  {
    field: "categories",
    headerName: "Categoría",
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
    field: "status",
    headerName: "Estado",
    flex: 2,
    valueGetter: (params) => (params.value ? "Activo" : "Inactivo"),
  },
  {
    field: "actions",
    headerName: "",
    sortable: false,
    renderCell: () => (
      <IconButton>
        <BsThreeDotsVertical />
      </IconButton>
    ),
  },
];

export default function Products() {
  const [sortModel, setSortModel] = React.useState<any>([]);
  const [selectedRows, setSelectedRows] = React.useState<GridRowSelectionModel>(
    []
  );
  const [openModalCreateProduct, setOpenModalCreateProduct] =
    React.useState<boolean>(false);
  const [openModalAddInventory, setOpenModalAddInventory] =
    React.useState<boolean>(false);
  const [openModalDetailProduct, setOpenModalDetailProduct] =
    React.useState<boolean>(false);
  const [productSelected, setProductSelected] = React.useState<
    Product | undefined
  >(undefined);
  const token = useSelector<GlobalState>(
    (state) => state.login.token
  ) as string;
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = React.useState(8);

  const products = useSelector<GlobalState>(
    (state) => state.product.products || {}
  ) as { [index: number]: Product };

  React.useEffect(() => {
    dispatch(getAllProducts(token));
    dispatch(getAllCategories(token));
  }, []);

  const handleSelectionChange = (
    rowSelectionModel: GridRowSelectionModel,
    details: GridCallbackDetails<any>
  ) => {
    const productId = rowSelectionModel[0];
    if (productId) {
      handleClickAddInventory(productId);
    }
  };

  const handledEdit = () => {
    if (!productSelected) {
      return;
    }
    handleClickDetail();
  };

  const handleClickNewProduct = (event: any) => {
    event.preventDefault();
    setOpenModalCreateProduct(!openModalCreateProduct);
  };

  const handleCloseModalCreateProduct = (
    event: React.MouseEvent<HTMLLIElement>
  ) => {
    event.preventDefault();
    setOpenModalCreateProduct(!openModalCreateProduct);
  };

  const handleClickAddInventory = (productId: any) => {
    const productsArray = Object.values(products) as Product[];
    setProductSelected(
      productsArray.find((product: Product) => product.id === productId)
    );
    setOpenModalAddInventory(!openModalAddInventory);
  };

  const handleCloseModalAddInventory = (
    event: React.MouseEvent<HTMLLIElement>
  ) => {
    event.preventDefault();
    setOpenModalAddInventory(!openModalAddInventory);
  };

  const handleClickDetail = () => {
    setOpenModalDetailProduct(!openModalDetailProduct);
  };

  const handleCloseModalDetailProduct = (
    event: React.MouseEvent<HTMLLIElement>
  ) => {
    event.preventDefault();
    setOpenModalDetailProduct(!openModalDetailProduct);
  };

  return (
    <div className="product-main-container">
      <Header></Header>
      <div className="widget-container">
        <Widget
          icon={<AiOutlinePlusCircle />}
          description="Total de Productos"
          quantity={Object.values(products).length.toString()}
          iconAction={handleClickNewProduct}
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
      <div className="table-header">
        <h2>Todos los Productos</h2>
        <div className="icon-container">
          <IconButton onClick={handledEdit}>
            <BiEdit />
          </IconButton>
          <IconButton>
            <RiDeleteBin6Line />
          </IconButton>
        </div>
      </div>
      <div className="table-container">
        <DataGrid
          rows={Object.values(products) as Product[]}
          columns={columns}
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
          checkboxSelection
          onRowSelectionModelChange={handleSelectionChange}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 25]}
        />
      </div>
      <CreateProductModal
        isOpen={openModalCreateProduct}
        handleCloseModal={handleCloseModalCreateProduct}
      />
      <AddInventoryModal
        isOpen={openModalAddInventory}
        handleCloseModal={handleCloseModalAddInventory}
        productData={productSelected}
      />
      <DetailProductModal
        isOpen={openModalDetailProduct}
        handleCloseModal={handleCloseModalDetailProduct}
        productData={productSelected}
      />
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
  categories: {
    id: string;
    name: string;
    description: string;
    status: boolean;
  }[];
};
