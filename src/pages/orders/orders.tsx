import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Order, defaultOrder } from "./order"
import { GlobalState } from "../../utils/types";
import { getAllOrders } from "../../actions/order";

export default function Orders() {
  const [sortModel, setSortModel] = React.useState<any>([]);
  const [openModalDetailOrder, setOpenModalDetailOrder] = React.useState<boolean>(false);
  const [orderSelected, setOrderSelected] = React.useState<Order>(defaultOrder);
  const token = useSelector<GlobalState>(
    (state) => state.login.token
  ) as string; 
  const orders = useSelector<GlobalState>(
    (state) => state.order.orders || []
  ) as { [index: number]: Order }

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllOrders(token));
  }, []);
};
