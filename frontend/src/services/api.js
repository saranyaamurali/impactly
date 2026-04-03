import axios from "axios";

const resolveApiBaseUrl = () => {
  if (process.env.REACT_APP_API_BASE_URL) {
    return process.env.REACT_APP_API_BASE_URL;
  }

  if (typeof window !== "undefined") {
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (isLocalhost) {
      return "http://localhost:5000/api";
    }
  }

  return "/api";
};

const http = axios.create({
  baseURL: resolveApiBaseUrl(),
  timeout: 10000,
});

export const fetchPublicProjects = async (params = {}) => {
  const { data } = await http.get("/csr-project/public", { params });
  return data;
};

export const fetchPublicProjectById = async (id) => {
  const { data } = await http.get(`/csr-project/public/${id}`);
  return data;
};

export const fetchBlogs = async () => {
  const { data } = await http.get("/blog");
  return data;
};

export const fetchExternalCsrBlogs = async () => {
  const { data } = await http.get("/blog/external");
  return data;
};

export const fetchBlogById = async (id) => {
  const { data } = await http.get(`/blog/${id}`);
  return data;
};

export const fetchCompanies = async (params = {}) => {
  const { data } = await http.get("/ecosystem/companies", { params });
  return data;
};

export const fetchNgos = async (params = {}) => {
  const { data } = await http.get("/ecosystem/ngos", { params });
  return data;
};

export const fetchCsrInformationProjects = async (params = {}) => {
  const { data } = await http.get("/csr-project/information", { params });
  return data;
};

export const fetchNgoInformation = async (params = {}) => {
  const { data } = await http.get("/ecosystem/ngos-information", { params });
  return data;
};
