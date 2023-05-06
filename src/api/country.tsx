import { get } from "./request";

export function getAllCountries() {
  return get("/api/countries", {});
}

export function getCitiesByCountry(country: string) {
  return get(`/api/countries/${country}/cities`, {});
}
