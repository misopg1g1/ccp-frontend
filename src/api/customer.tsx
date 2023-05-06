import { get, post } from "./request";

export function getCustomers(token: string) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return get("/api/customers", {}, headers);
}

export function createCustomer(body: any, token: string) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return post("/api/customers", {}, body, headers);
}
