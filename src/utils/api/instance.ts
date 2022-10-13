import axios from "axios";

export const api = axios.create({
  baseURL: "http://82.179.17.25/api/v1/geo/",
});
