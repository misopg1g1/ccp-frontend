import { get } from "./request";

export function getCustomers(token: string) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return get("/api/customers", {}, headers);
}