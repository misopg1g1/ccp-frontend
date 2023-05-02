import { get } from "./request";

export function getAllCategories(token: string) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return get("/api/categories", {}, headers);
}

