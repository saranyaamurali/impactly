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

const AUTH_TOKEN_KEY = "impactly_token";

export const initializeAuthToken = () => {
  if (typeof window === "undefined") {
    return;
  }

  const token = window.localStorage.getItem(AUTH_TOKEN_KEY);
  if (token) {
    http.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

export const setAuthToken = (token) => {
  if (typeof window === "undefined") {
    return;
  }

  if (token) {
    window.localStorage.setItem(AUTH_TOKEN_KEY, token);
    http.defaults.headers.common.Authorization = `Bearer ${token}`;
    return;
  }

  window.localStorage.removeItem(AUTH_TOKEN_KEY);
  delete http.defaults.headers.common.Authorization;
};

export const getAuthToken = () => {
  if (typeof window === "undefined") {
    return "";
  }

  return window.localStorage.getItem(AUTH_TOKEN_KEY) || "";
};

export const registerCorporate = async (payload) => {
  const { data } = await http.post("/auth/register", payload);
  return data;
};

export const loginCorporate = async (payload) => {
  const { data } = await http.post("/auth/login", payload);
  return data;
};

export const fetchCorporateMe = async () => {
  const { data } = await http.get("/corporate/me");
  return data;
};

export const updateCorporateMe = async (payload) => {
  const { data } = await http.put("/corporate/me", payload);
  return data;
};

export const createCsrProject = async (payload) => {
  const { data } = await http.post("/csr-project", payload);
  return data;
};

export const fetchMyCsrProjects = async () => {
  const { data } = await http.get("/csr-project/my-projects");
  return data;
};

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

export const fetchCompanyInformation = async (params = {}) => {
  const { data } = await http.get("/ecosystem/companies-information", { params });
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
