import { get, post } from "./request";

export function getAllProducts(token: string) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return get("/api/products", {}, headers);
}

export function createProduct(body: any, token: string) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return post("/api/products", {}, body, headers);
}
