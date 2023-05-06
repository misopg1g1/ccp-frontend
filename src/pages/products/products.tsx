import * as React from "react";
import Header from "../../components/header/header.component";
import { Widget } from "../../components/widget/widget.component";
import { AiOutlinePlusCircle } from "react-icons/ai";
import "./products.scss";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../../utils/types";
import {
  DataGrid,
  GridRowSelectionModel,
  GridCallbackDetails,
} from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getAllProducts } from "../../actions/product";
import CreateProductModal from "../../components/product/createProductModal";
import AddInventoryModal from "../../components/inventory/addInventoryModal";
import DetailProductModal from "../../components/product/detailProductModal";
import { getAllCategories } from "../../actions/category";
import { Product, columns, noResultsOverlay } from "./product";

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
      const productsArray = Object.values(products) as Product[];
      setProductSelected(
        productsArray.find((product: Product) => product.id === productId)
      );
      handleClickDetail();
    }
  };

  const handledEdit = () => {
    if (!productSelected) {
      return;
    }
    handleClickAddInventory();
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

  const handleClickAddInventory = () => {
    setOpenModalAddInventory(!openModalAddInventory);
  };

  const handleCloseModalAddInventory = (
    event: React.MouseEvent<HTMLLIElement>
  ) => {
    event.preventDefault();
    setOpenModalAddInventory(!openModalAddInventory);
  };

  const handleClickDetail = () => {
    setOpenModalDetailProduct(!openModalAddInventory);
  };

  const handleCloseModalDetailProduct = (
    event: React.MouseEvent<HTMLLIElement>
  ) => {
    event.preventDefault();
    setOpenModalDetailProduct(!openModalDetailProduct);
  };

  return (
    <div className="dashboard-main-container">
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
          slots={{noRowsOverlay: noResultsOverlay}}
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
          checkboxSelection
          onRowClick={(event) => console.log("onRowClick")}
          onCellClick={(event) => console.log("onCellClick")}
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
