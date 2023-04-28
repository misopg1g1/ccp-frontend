import React from "react";
import { GlobalState, Roles } from "../../utils/types";
import { useSelector } from "react-redux";

interface ReactWrapperProps {
  children: JSX.Element;
  allowedRoles: Roles[];
}
export const RoleWrapper = (props: ReactWrapperProps) => {
  const currentRole = useSelector<GlobalState>(
    (state) => state.login.userData.role
  ) as Roles;
  if (props.allowedRoles.includes(currentRole)) {
    return <div>{props.children}</div>;
  } else return <></>;
};
