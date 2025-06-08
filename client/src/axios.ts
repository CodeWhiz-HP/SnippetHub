import axios from "axios";

const baseurl = process.env.REACT_APP_API_URL;

const API = axios.create({
  baseURL: `${baseurl}`,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;