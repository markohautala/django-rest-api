import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";  // Adjust to your backend URL
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
