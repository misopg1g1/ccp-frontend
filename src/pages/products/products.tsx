import * as React from "react";
import Header from "../../components/header/header.component";
import { Widget } from "../../components/widget/widget.component";
import { AiOutlinePlusCircle } from "react-icons/ai";
import "./products.scss";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState, Roles } from "../../utils/types";
import {
  DataGrid,
  GridRowSelectionModel,
  GridEventListener,
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
import { RoleWrapper } from "../../components/role-wrapper/role-wrapper.component";
import { useTranslation } from "react-i18next";

export default function Products() {
  const [t] = useTranslation("global");
  const [sortModel, setSortModel] = React.useState<any>([]);
  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>([]);
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
    checkedRow: GridRowSelectionModel
  ) => {
    if (checkedRow.length > 1) {
      const selectionSet = new Set(rowSelectionModel);
      const result = checkedRow.filter((s) => !selectionSet.has(s));
      setRowSelectionModel(result);
    } else {
      setRowSelectionModel(checkedRow);
    }
  };

  const handleClickDetail = () => {
    if (!rowSelectionModel) {
      return;
    }
    const productId = rowSelectionModel[0];
    if (productId) {
      setProductSelected(
        Object.values(products).find((product: Product) => product.id === productId),
      );
      setOpenModalAddInventory(!openModalAddInventory);
    }
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

  const handleCloseModalAddInventory = (
    event: React.MouseEvent<HTMLLIElement>
  ) => {
    event.preventDefault();
    setOpenModalAddInventory(!openModalAddInventory);
  };

  const handleCloseModalDetailProduct = (
    event: React.MouseEvent<HTMLLIElement>
  ) => {
    event.preventDefault();
    setOpenModalDetailProduct(!openModalDetailProduct);
  };

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    setProductSelected(params.row);
    setOpenModalDetailProduct(!openModalDetailProduct);
  };

  return (
    <div className="dashboard-main-container">
      <Header></Header>
      <div className="widget-container">
        <Widget
          icon={<AiOutlinePlusCircle />}
          description={t("product.dashboard.total_products")}
          quantity={Object.values(products).length.toString()}
          iconAction={handleClickNewProduct}
          background
        />
        <Widget
          icon={<AiOutlinePlusCircle />}
          description={t("product.dashboard.total_categories")}
          quantity="3"
          iconAction={() => console.log("clicked")}
        />
        <Widget
          icon={<AiOutlinePlusCircle />}
          description={t("product.dashboard.total_warehouses")}
          quantity="1"
          iconAction={() => console.log("clicked")}
        />
      </div>
      <div className="table-header">
        <h2>{t("product.dashboard.table.title")}</h2>
        <div className="icon-container">
          <IconButton onClick={handleClickDetail}>
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
          disableRowSelectionOnClick
          onRowClick={handleRowClick}
          rowSelectionModel={rowSelectionModel}
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
      <RoleWrapper allowedRoles={[Roles.ADMIN, Roles.SELLER, Roles.MARKETING]}>
        <DetailProductModal
          isOpen={openModalDetailProduct}
          handleCloseModal={handleCloseModalDetailProduct}
          productData={productSelected}
        />      
      </RoleWrapper>
    </div>
  );
}
