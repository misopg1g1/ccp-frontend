import { get } from "./request";

export function getAllOrders(token: string) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return get("/api/orders", {}, headers);
};