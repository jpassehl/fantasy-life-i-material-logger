import axios, { CanceledError } from "axios";
import { BASE_URL } from "../constants";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export { CanceledError };
