import axios from "axios";

// axios.defaults.baseURL = "https://housegram-rest-api-de7c6ab4d6fb.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();