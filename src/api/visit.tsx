import { get } from "./request";

export function getAllVisits(token: string) {
  const headers = {
    Authorizarion:  `Bearer ${token}`,
  };
  return get("/api/visits", {}, headers);
};