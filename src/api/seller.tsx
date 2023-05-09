import { get } from "./request";

export function getAllSellers(token: string) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return get("/api/sellers", {}, headers);
}