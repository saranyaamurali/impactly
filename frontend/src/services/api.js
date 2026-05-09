import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const TIMEOUT = process.env.REACT_APP_API_TIMEOUT || 10000;

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('impactly_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthRequest = error.config?.url?.includes('/auth/login') || error.config?.url?.includes('/auth/register');
    
    if (error.response?.status === 401 && !isAuthRequest) {
      // Unauthorized - clear token and redirect
      const role = localStorage.getItem('userRole');
      localStorage.removeItem('impactly_token');
      localStorage.removeItem('userRole');
      window.location.href = role === 'corporate' ? '/corporate/login' : '/ngo/login';
    }
    return Promise.reject(error);
  }
);

// Authentication APIs
export const authAPI = {
  registerNgo: (data) => api.post('/auth/register-ngo', data),
  loginNgo: (data) => api.post('/auth/login-ngo', data),
  registerCorporate: (data) => api.post('/auth/register', data),
  loginCorporate: (data) => api.post('/auth/login', data),
  verifyToken: () => api.post('/auth/verify-token'),
  changePassword: (data) => api.post('/auth/change-password', data),
  resetPassword: (data) => api.post('/auth/reset-password', data),
};

// NGO APIs
export const ngoAPI = {
  getProfile: () => api.get('/ngo/profile'),
  updateProfile: (data) => api.put('/ngo/profile', data),
  getPublicProfile: (ngoId) => api.get(`/ngo/public/${ngoId}`),
  searchNgos: (params) => api.get('/ngo/search', { params }),
  getStats: (ngoId) => api.get(`/ngo/${ngoId}/stats`),
  getPartnerships: (ngoId, params) => api.get(`/ngo/${ngoId}/partnerships`, { params }),
  sendProposal: (data) => api.post('/ngo/partnerships/propose', data),
};

// Matchmaking APIs
export const matchmakingAPI = {
  getNgoMatches: (ngoId, params) => api.get(`/matchmaking/ngo/${ngoId}/matches`, { params }),
  getCorporateMatches: (corporateId, params) => api.get(`/matchmaking/corporate/${corporateId}/matches`, { params }),
  getMatchDetails: (ngoId, projectId) => api.get(`/matchmaking/match/${ngoId}/${projectId}`),
  getRecommendations: (params) => api.get('/matchmaking/recommendations', { params }),
};

// CSR Project APIs
export const csrProjectAPI = {
  getPublicProjects: (params) => api.get('/csr-project/public', { params }),
  getProjectDetail: (projectId) => api.get(`/csr-project/${projectId}`),
  createProject: (data) => api.post('/csr-project', data),
  updateProject: (projectId, data) => api.put(`/csr-project/${projectId}`, data),
  deleteProject: (projectId) => api.delete(`/csr-project/${projectId}`),
  getMyProjects: () => api.get('/csr-project/my-projects'),
};

// Impact APIs
export const impactAPI = {
  addUpdate: (projectId, data) => api.post(`/ngo/${projectId}/impact`, data),
  getUpdates: (projectId, params) => api.get(`/ngo/${projectId}/impact`, { params }),
  updateImpact: (impactId, data) => api.put(`/impact/${impactId}`, data),
  deleteImpact: (impactId) => api.delete(`/impact/${impactId}`),
};

// Corporate APIs
export const corporateAPI = {
  getProfile: () => api.get('/corporate/me'),
  updateProfile: (data) => api.put('/corporate/me', data),
  getPublicProfile: (corporateId) => api.get(`/corporate/public/${corporateId}`),
  searchCompanies: (params) => api.get('/corporate/search', { params }),
};

// Ecosystem APIs
export const ecosystemAPI = {
  getNgos: (params) => api.get('/ecosystem/ngos', { params }),
  getCompanies: (params) => api.get('/ecosystem/companies', { params }),
  getStats: () => api.get('/ecosystem/stats'),
};

// Blog APIs
export const blogAPI = {
  getArticles: (params) => api.get('/blog/articles', { params }),
  getArticleDetail: (articleId) => api.get(`/blog/articles/${articleId}`),
  createArticle: (data) => api.post('/blog/articles', data),
  updateArticle: (articleId, data) => api.put(`/blog/articles/${articleId}`, data),
  deleteArticle: (articleId) => api.delete(`/blog/articles/${articleId}`),
};

// Partnership APIs
export const partnershipAPI = {
  getPartnershipDetail: (partnershipId) => api.get(`/partnership/${partnershipId}`),
  updatePartnershipStatus: (partnershipId, status) => 
    api.put(`/partnership/${partnershipId}/status`, { status }),
  sendMessage: (partnershipId, message) => 
    api.post(`/partnership/${partnershipId}/message`, { message }),
  addReview: (partnershipId, data) => 
    api.post(`/partnership/${partnershipId}/review`, data),
};

// ========== Helper Functions for Token Management ==========
export const getAuthToken = () => localStorage.getItem('impactly_token');
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('impactly_token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('impactly_token');
    delete api.defaults.headers.common['Authorization'];
  }
};

// ========== Backward Compatibility Functions ==========
// Auth functions
export const loginCorporate = (data) => authAPI.loginCorporate(data);
export const registerCorporate = (data) => authAPI.registerCorporate(data);

// Corporate functions
export const fetchCorporateMe = () => corporateAPI.getProfile();
export const updateCorporateMe = (data) => corporateAPI.updateProfile(data);

// CSR Project functions
export const fetchMyCsrProjects = () => csrProjectAPI.getMyProjects();
export const createCsrProject = (data) => csrProjectAPI.createProject(data);
export const fetchPublicProjects = (params) => csrProjectAPI.getPublicProjects(params);
export const fetchPublicProjectById = (projectId) => csrProjectAPI.getProjectDetail(projectId);
export const fetchCsrInformationProjects = (params) => csrProjectAPI.getPublicProjects(params);

// Blog functions
export const fetchBlogs = (params) => blogAPI.getArticles(params);
export const fetchBlogById = (articleId) => blogAPI.getArticleDetail(articleId);
export const fetchExternalCsrBlogs = (params) => blogAPI.getArticles(params);

// Ecosystem functions
export const fetchCompanies = (params) => ecosystemAPI.getCompanies(params);
export const fetchNgos = (params) => ecosystemAPI.getNgos(params);
export const fetchCompanyInformation = (params) => ecosystemAPI.getCompanies(params);
export const fetchNgoInformation = (params) => ecosystemAPI.getNgos(params);

export default api;