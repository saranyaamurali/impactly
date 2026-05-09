import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import PublicProjectListPage from "./pages/PublicProjectListPage";
import PublicProjectDetailPage from "./pages/PublicProjectDetailPage";
import BlogListPage from "./pages/BlogListPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import EcosystemCompaniesPage from "./pages/EcosystemCompaniesPage";
import EcosystemNgosPage from "./pages/EcosystemNgosPage";
import CompanyInformationPage from "./pages/CompanyInformationPage";
import NgoInformationPage from "./pages/NgoInformationPage";
import CorporateDashboardPage from "./pages/CorporateDashboardPage";
import CorporateLoginPage from "./pages/CorporateLoginPage";
import CorporateRegisterPage from "./pages/CorporateRegisterPage";
import CorporateProfileEditPage from "./pages/CorporateProfileEditPage";
import CorporateProjectSubmitPage from "./pages/CorporateProjectSubmitPage";
import NotFoundPage from "./pages/NotFoundPage";
import { initializeAuthToken } from "./services/api";

function App() {
	useEffect(() => {
		initializeAuthToken();
	}, []);

	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path="/" element={<HomePage />} />
				<Route path="/csr-projects" element={<PublicProjectListPage />} />
				<Route path="/csr-projects/information" element={<Navigate to="/csr-projects" replace />} />
				<Route path="/csr-projects/:id" element={<PublicProjectDetailPage />} />
				<Route path="/blog" element={<BlogListPage />} />
				<Route path="/blog/:id" element={<BlogDetailPage />} />
				<Route path="/ecosystem/companies" element={<EcosystemCompaniesPage />} />
				<Route path="/ecosystem/companies-information" element={<CompanyInformationPage />} />
				<Route path="/ecosystem/ngos" element={<EcosystemNgosPage />} />
				<Route path="/ecosystem/ngos-information" element={<NgoInformationPage />} />
				<Route path="/corporate" element={<Navigate to="/corporate/login" replace />} />
				<Route path="/corporate/register" element={<CorporateRegisterPage />} />
				<Route path="/corporate/login" element={<CorporateLoginPage />} />
				<Route path="/corporate/dashboard" element={<CorporateDashboardPage />} />

				<Route element={<ProtectedRoute />}>
					<Route path="/corporate/profile" element={<CorporateProfileEditPage />} />
					<Route path="/corporate/projects/new" element={<CorporateProjectSubmitPage />} />
				</Route>

				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Routes>
	);
}

export default App;
