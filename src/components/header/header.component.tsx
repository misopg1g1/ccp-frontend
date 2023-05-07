import React from "react";
import { GlobalState, UserData } from "../../utils/types";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "dayjs/locale/es";
import './header.scss'

dayjs.locale("es");

export default function Header() {
  const userState = useSelector<GlobalState>(
    (state) => state.login.userData
  ) as UserData;
  const date = dayjs().format("MMMM DD, YYYY")
  const formatedDate = date.charAt(0).toUpperCase() + date.slice(1)
  return (
    <div className="header-container">
      <h1 className="welcome-text">Bienvenido {userState.user}</h1>
      <h1 className="date-text">{formatedDate}</h1>
    </div>
  );
}
