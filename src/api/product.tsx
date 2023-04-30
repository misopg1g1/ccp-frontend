import { get } from "./request";

export function getAllProducts(token: string) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return get("/api/products", {}, headers);
}
