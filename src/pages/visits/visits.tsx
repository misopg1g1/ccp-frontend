import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../../utils/types";
import { Visit, defaultVisit, columns, noResultsOverlay } from "./visit";
import { getAllVisits } from "../../actions/visit";
import Header from "../../components/header/header.component";
import { Widget } from "../../components/widget/widget.component";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IconButton } from "@mui/material";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  DataGrid,
  GridEventListener,
} from "@mui/x-data-grid";
import DetailVisitModal from "../../components/visit/detailVisitModal"

export default function Visits() {
  const [sortModel, setSortModel] = React.useState<any>([]);
  const [openModalDetailVisit, setOpenModalDetailVisit] = React.useState<boolean>(false);
  const [visitSelected, setVisitSelected] = React.useState<Visit>(defaultVisit);
  const token = useSelector<GlobalState>(
    (state) => state.login.token,
  ) as string;
  const visits = useSelector<GlobalState>(
    (state) => state.visit.visits || {}
  ) as { [index: number]: Visit}

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllVisits(token));
  }, []);

  const handleRowClick: GridEventListener<'rowClick'> = 
  (params) => {
    setVisitSelected(params.row);
    setOpenModalDetailVisit(!openModalDetailVisit);
  };

  const handleCloseModalDetailVisit = (
    event: React.MouseEvent<HTMLLIElement>
  ) => {
    event.preventDefault();
    setOpenModalDetailVisit(!openModalDetailVisit);
  };

  const sellersCount = (): string => {
    const sellers: string[] = [];
    if (visits) {
      Object.values(visits).forEach((visit) => {
        if (!sellers.includes(visit.seller.id)) {
          sellers.push(visit.seller.id);
        }
      });
    }
    return String(sellers.length);
  };

  return (
    <div className="dashboard-main-container">
      <Header></Header>
      <div className="widget-container">
        <Widget
          icon={<AiOutlinePlusCircle />}
          description="Total de visitas"
          quantity={Object.values(visits).length.toString()}
          iconAction={(event) => console.log("onClick from Add Visit")}
          background
        />
        <Widget 
          icon={<AiOutlinePlusCircle />}
          description="Vendedores"
          quantity={sellersCount()}
          iconAction={(event) => console.log("onClick from Add Seller")}
        />
      </div>
      <div className="table-header">
        <h2>Todas las visitas</h2>
        <div className="icon-container">
          <IconButton>
            <BiEdit />
          </IconButton>
          <IconButton>
            <RiDeleteBin6Line />
          </IconButton>
        </div>
      </div>
      <div className="table-container">
        <DataGrid
          rows={Object.values(visits) as Visit[]}
          columns={columns}
          slots={{noRowsOverlay: noResultsOverlay}}
          sortModel={sortModel}
          onSortModelChange={(model => setSortModel(model))}
          checkboxSelection
          disableRowSelectionOnClick
          onRowClick={handleRowClick}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 }},
          }}
          pageSizeOptions={[5, 10, 25]}
        />
      </div>
      <DetailVisitModal 
        isOpen={openModalDetailVisit}
        handleCloseModal={handleCloseModalDetailVisit}
        visit={visitSelected}
      />
    </div>
  );
};