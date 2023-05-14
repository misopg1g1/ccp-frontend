import { get } from "./request";

export function getAllVisits(token: string) {
  const headers = {
    Authorization:  `Bearer ${token}`,
  };
  return get("/api/visits", {}, headers);
}