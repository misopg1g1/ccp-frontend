import {
  GET_COUNTRIES_REQUEST,
  GET_CITIES_REQUEST,
  CLEAN_CITIES,
} from '../constants/actionTypes';

export const getAllCountries = () => ({type: GET_COUNTRIES_REQUEST});
export const getCitiesByCountry = (country: string) => ({type: GET_CITIES_REQUEST, country});
export const cleanCities = () => ({type: CLEAN_CITIES});