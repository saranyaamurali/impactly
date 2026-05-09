import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import PublicProjectListPage from './pages/PublicProjectListPage';
import PublicProjectDetailPage from './pages/PublicProjectDetailPage';
import CsrInformationPage from './pages/CsrInformationPage';
import BlogListPage from './pages/BlogListPage';
import BlogDetailPage from './pages/BlogDetailPage';
import EcosystemCompaniesPage from './pages/EcosystemCompaniesPage';
import EcosystemNgosPage from './pages/EcosystemNgosPage';
import CompanyInformationPage from './pages/CompanyInformationPage';
import NgoInformationPage from './pages/NgoInformationPage';

// Corporate Pages
import CorporateRegisterPage from './pages/CorporateRegisterPage';
import CorporateLoginPage from './pages/CorporateLoginPage';
import CorporateDashboardPage from './pages/CorporateDashboardPage';
import CorporateProfileEditPage from './pages/CorporateProfileEditPage';
import CorporateProjectSubmitPage from './pages/CorporateProjectSubmitPage';

// NGO Pages
import NgoLoginPage from './pages/NgoLoginPage';
import NgoRegisterPage from './pages/NgoRegisterPage';
import NgoDashboardPage from './pages/NgoDashboardPage';

// Matchmaking & Impact
import MatchmakingPage from './pages/MatchmakingPage';
import ImpactTrackingPage from './pages/ImpactTrackingPage';

// 404
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('impactly_token');
    const role = localStorage.getItem('userRole');

    if (token) {
      setIsLoggedIn(true);
      setUserRole(role || null);
    }

    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('impactly_token');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setUserRole(null);
  };

  if (loading) {
    return <div className="loading-app">Loading Impactly...</div>;
  }

  return (
    <MainLayout isLoggedIn={isLoggedIn} userRole={userRole} onLogout={handleLogout}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/public-projects" element={<PublicProjectListPage />} />
        <Route path="/project/:id" element={<PublicProjectDetailPage />} />
        <Route path="/csr/information" element={<CsrInformationPage />} />
        <Route path="/blogs" element={<BlogListPage />} />
        <Route path="/blog/:id" element={<BlogDetailPage />} />
        <Route path="/ecosystem/companies" element={<EcosystemCompaniesPage />} />
        <Route path="/ecosystem/ngos" element={<EcosystemNgosPage />} />
        <Route path="/company/:id" element={<CompanyInformationPage />} />
        <Route path="/ngo/:id" element={<NgoInformationPage />} />

        {/* Corporate Routes */}
        <Route path="/corporate/register" element={<CorporateRegisterPage />} />
        <Route path="/corporate/login" element={<CorporateLoginPage />} />
        <Route
          path="/corporate/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole} requiredRole="corporate">
              <CorporateDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/corporate/profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole} requiredRole="corporate">
              <CorporateProfileEditPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/corporate/project/submit"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole} requiredRole="corporate">
              <CorporateProjectSubmitPage />
            </ProtectedRoute>
          }
        />

        {/* NGO Routes */}
        <Route path="/ngo/register" element={<NgoRegisterPage />} />
        <Route path="/ngo/login" element={<NgoLoginPage />} />
        <Route
          path="/ngo/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole} requiredRole="ngo">
              <NgoDashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Matchmaking & Impact */}
        <Route path="/matchmaking" element={<MatchmakingPage />} />
        <Route
          path="/impact-tracking"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole} requiredRole={['ngo', 'corporate']}>
              <ImpactTrackingPage />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;