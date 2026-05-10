import axios from 'axios';

const API_URL = 'https://impactly-backend.onrender.com/api';
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
  loginAdmin: (data) => api.post('/auth/admin/login', data),
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
  uploadDocuments: (formData) => api.post('/ngo/documents/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

// Matchmaking APIs
export const matchmakingAPI = {
  getNgoMatches: (ngoId, params) => api.get(`/matchmaking/ngo/${ngoId}/matches`, { params }),
  getCorporateMatches: (corporateId, params) => api.get(`/matchmaking/corporate/${corporateId}/matches`, { params }),
  getMatchDetails: (ngoId, projectId) => api.get(`/matchmaking/match/${ngoId}/${projectId}`),
  getRecommendations: (params) => api.get('/matchmaking/recommendations', { params }),
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
  getStats: () => api.get('/corporate/stats'),
  getPublicProfile: (corporateId) => api.get(`/corporate/public/${corporateId}`),
  searchCompanies: (params) => api.get('/corporate/search', { params }),
};

// Ecosystem APIs
export const ecosystemAPI = {
  getNgos: (params) => api.get('/ecosystem/ngos', { params }),
  getCompanies: (params) => api.get('/ecosystem/companies', { params }),
  getStats: () => api.get('/ecosystem/stats'),
};



// CSR Article APIs
export const csrArticleAPI = {
  getArticles: (params) => api.get('/csr/articles', { params }),
  getArticleDetail: (articleId) => api.get(`/csr/articles/${articleId}`),
  createArticle: (data) => api.post('/csr/articles', data),
  updateArticle: (articleId, data) => api.put(`/csr/articles/${articleId}`, data),
  deleteArticle: (articleId) => api.delete(`/csr/articles/${articleId}`),
  trackArticleClick: (articleId) => api.post(`/csr/articles/${articleId}/click`),
};

// CSR Project APIs
export const csrProjectAPI = {
  createProject: (data) => api.post('/csr-project', data),
  getMyProjects: () => api.get('/csr-project/my-projects'),
  getPublicProjects: (params) => api.get('/csr-project/public', { params }),
  getPublicProjectDetail: (projectId) => api.get(`/csr-project/public/${projectId}`),
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

// Admin APIs
export const adminAPI = {
  getPendingProjects: () => api.get('/admin/projects/pending'),
  approveProject: (projectId) => api.post(`/admin/projects/${projectId}/approve`),
  rejectProject: (projectId, data) => api.post(`/admin/projects/${projectId}/reject`, data),
  getPendingPartnerships: () => api.get('/admin/partnerships/pending'),
  approvePartnership: (partnershipId) => api.post(`/admin/partnerships/${partnershipId}/approve`),
  rejectPartnership: (partnershipId, data) => api.post(`/admin/partnerships/${partnershipId}/reject`, data),
  getPendingNgos: () => api.get('/admin/ngos/pending'),
  verifyNgo: (ngoId) => api.post(`/admin/ngos/${ngoId}/verify`),
  rejectNgo: (ngoId) => api.post(`/admin/ngos/${ngoId}/reject`),
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
export const loginAdmin = (data) => authAPI.loginAdmin(data);

// Corporate functions
export const fetchCorporateMe = () => corporateAPI.getProfile();
export const updateCorporateMe = (data) => corporateAPI.updateProfile(data);



// Ecosystem functions
export const fetchCompanies = (params) => ecosystemAPI.getCompanies(params);
export const fetchNgos = (params) => ecosystemAPI.getNgos(params);
export const fetchCompanyInformation = (params) => ecosystemAPI.getCompanies(params);
export const fetchNgoInformation = (params) => ecosystemAPI.getNgos(params);

export default api;